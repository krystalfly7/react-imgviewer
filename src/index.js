import React, { Component } from 'react';
import './index.less';
import { actionList, ActionType, compareArray } from './constant.js'

export default class PhotoViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zoomSpeed: .05,
      width: 0,
      left: 0,
      top: 0,
      height: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
      activeIndex: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const activeIndex = this.getActiveIndex(nextProps);
    this.handleChangeImg(activeIndex);
  }

  componentDidMount () {
    this.bindEvent();
    const [width, height] = this.getImgWidthHeight();
    this.setState({
      width,
      height,
      activeIndex: this.getActiveIndex(this.props)
    });
  }

  getActiveIndex = (data) => {
    const nPhotos = data.photos || []; //nextProps
    const cPhotos = this.props.photos || []; //this.props
    let activeIndex = data.activeIndex || 0;
    //if photos has not changed, and don't have props.activeIndex, use current state activeIndex
    if(!(/^\d+$/.test(data.activeIndex)) && compareArray(nPhotos, cPhotos)) {
      activeIndex = this.state.activeIndex;
    }
    //if exceed photos.length use 0;
    return activeIndex >= nPhotos.length ? 0 : activeIndex;
  }

  componentWillUnmount() {
    this.bindEvent(true);
  }

  bindEvent = (remove) => {
    let funcName = 'addEventListener';
    if (remove) {
      funcName = 'removeEventListener';
    }

    let mouseScrollArea: Document | HTMLElement = document;
    mouseScrollArea = this.imgViewer;
    mouseScrollArea[funcName]('mousewheel', this.handleMouseScroll, false);
    mouseScrollArea[funcName]('click', this.handleMouseUp, false);
    mouseScrollArea[funcName]('mousemove', this.handleMouseMove, false);
    mouseScrollArea[funcName]('mousedown', this.handleMouseDown, false);
    mouseScrollArea[funcName]('mouseleave', this.handleMouseLeave, false);
    window[funcName]('resize', this.handleResize, false);
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      isMouseDown: true,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  }

  handleMouseMove = (e) => {
    let dx = 0;
    let dy = 0;
    if (this.state.isMouseDown) {
        if (this.state.mouseX !== null && this.state.mouseY !== null) {
          dx = e.clientX - this.state.mouseX;
          dy = e.clientY - this.state.mouseY;
        }
        const [width, height] = this.getImgWidthHeight();
        const isRotate = Math.abs((this.state.rotate / 90) % 2) === 1; //rotate change move left and top
        let lx = Math.abs((this.state.scaleX - 1) * this.state.width / 2);
        let ly = Math.abs((this.state.scaleY - 1) * this.state.height / 2);
        if(isRotate) {
          lx = Math.abs((width - this.state.scaleY * this.state.height) / 2);
          ly = Math.abs((this.state.scaleX * this.state.width - height) / 2);
        }
        let mTop = this.state.top + dy;
        let mLeft = this.state.left + dx;
        if (!(-ly < mTop && mTop < ly)) {
            mTop = mTop < 0 ? -ly : ly;
        }
        if (!(-lx < mLeft && mLeft < lx)) {
            mLeft = mLeft < 0 ? -lx : lx;
        }
        this.setState({
            mouseX: e.clientX,
            mouseY: e.clientY,
            top: mTop,
            left: mLeft,
        });
    } else {
        this.setState({
            mouseX: e.clientX,
            mouseY: e.clientY
      });
    }
  }

  handleMouseUp = (e) => {
    this.setState({
      isMouseDown: false,
      mouseX: e.clientX,
      mouseY: e.clientY,
    });
  }

  handleMouseScroll = (e) => {
    e.preventDefault();
    let direct: 0 | 1 | -1 = 0;
    if (e.wheelDelta) {
      direct = e.wheelDelta > 0 ? 1 : -1;
    }else if (e.detail) {
      direct = e.detail > 0 ? -1 : 1;
    }
    if (direct !== 0) {
      let x = e.clientX;
      let y = e.clientY;
      if (this.imgViewer) {
        const containerRect = this.imgViewer.getBoundingClientRect();
        x -= containerRect.left;
        y -= containerRect.top;
      }
      this.handleZoom(x, y, direct, this.state.zoomSpeed);
    }
  }

  handleMouseLeave = () => {
    this.setState({
        mouseX: null,
        mouseY: null,
        isMouseDown: false
    });
  }

  handleResize = () => {
    const [width, height] = this.getImgWidthHeight();
    this.setState({
      width,
      height,
      left: 0,
      top: 0,
      rotate: 0,
      scaleX: 1,
      scaleY: 1,
    });
  }

  getImageCenterXY = () => {
    return {
      x: this.state.left + this.state.width / 2,
      y: this.state.top + this.state.height / 2,
    };
  }

  getImgWidthHeight() {
    const width = this.imgViewer.getBoundingClientRect().width;
    const height = this.imgViewer.getBoundingClientRect().height;
    return [width, height];
  }

  handleZoom = (targetX, targetY, direct, scale) => {
    let imgCenterXY = this.getImageCenterXY();
    let diffX = targetX - imgCenterXY.x;
    let diffY = targetY - imgCenterXY.y;
    // when image width is 0, set original width
    let top = 0;
    let left = 0;
    let width = 0;
    let height = 0;
    let scaleX = 0;
    let scaleY = 0;
    if (this.state.width === 0) {
      const [imgWidth, imgHeight] = this.getImgWidthHeight();
      // left = (this.imgViewer.getBoundingClientRect().width - imgWidth) / 2;
      // top = (this.imgViewer.getBoundingClientRect().height - imgHeight) / 2;
      width = this.state.width + imgWidth;
      height = this.state.height + imgHeight;
      scaleX = scaleY = 1;
    } else {
      let directX = this.state.scaleX > 0 ? 1 : -1;
      let directY = this.state.scaleY > 0 ? 1 : -1;
      scaleX = this.state.scaleX + scale * direct * directX;
      scaleY = this.state.scaleY + scale * direct * directY;
      if (Math.abs(scaleX) < 0.1 || Math.abs(scaleY) < 0.1) {
        return;
      }
      top = this.state.top + -direct * diffY / this.state.scaleX * scale * directX;
      left = this.state.left + -direct * diffX / this.state.scaleY * scale * directY;
      width = this.state.width;
      height = this.state.height;
    }
    this.setState({
      width: width,
      scaleX: scaleX < 0.7 ? 0.7 : scaleX,
      scaleY: scaleY < 0.7 ? 0.7 : scaleY,
      height: height,
      top: top,
      left: left,
      loading: false,
    });
  }

  handleRotate = (isRight) => {
    this.setState({
      rotate: this.state.rotate + 90 * (isRight ? 1 : -1),
    });
  }

  handleChangeImg = (activeIndex) => {
    //activeIndex change do onChange
    //if have onChange and current activeIndex don't equal state.activeIndex, do onChange
    this.props.onActiveChange && activeIndex !== this.state.activeIndex && this.props.onActiveChange(activeIndex);
    //change activeIndex and resize image
    this.setState({ activeIndex });
    this.handleResize();
  }

  doAction = (type) => {
    if(!this.props.photos || this.props.photos.length === 0)
    return
    switch (type) {
      case ActionType.zoomIn:
        let imgCenterXY = this.getImageCenterXY();
        this.handleZoom(imgCenterXY.x, imgCenterXY.y, 1, this.state.zoomSpeed);
        break;
      case ActionType.zoomOut:
        let imgCenterXY2 = this.getImageCenterXY();
        this.handleZoom(imgCenterXY2.x, imgCenterXY2.y, -1, this.state.zoomSpeed);
        break;
      case ActionType.rotateLeft:
        this.handleRotate();
        break;
      case ActionType.rotateRight:
        this.handleRotate(true);
        break;
      case ActionType.prev:
        this.handleChangeImg(this.state.activeIndex - 1);
        break;
      case ActionType.next:
        this.handleChangeImg(this.state.activeIndex + 1);
        break;
      case ActionType.reset:
        this.handleResize();
        break;
      default:
        break;
    }
  }

  render() {
    const photos = this.props.photos || [];
    const { activeIndex } = this.state;
    let containerStyle = {
      width: this.props.cwidth ? `${this.props.cwidth}px` : '',
      height: this.props.cheight ? `${this.props.cheight}px` : '',
    };
    let imgStyle = {
      width: this.state.width ? `${this.state.width}px` : '100%',
      height: this.state.height ? `${this.state.height}px` : '100%',
      transform: `translateX(${this.state.left ? this.state.left + 'px' : '0px'}) translateY(${this.state.top}px) rotate(${this.state.rotate}deg) scaleX(${this.state.scaleX}) scaleY(${this.state.scaleY})`,
    };

    return (
        <div className="component-poi-fe-imgviewer" style={containerStyle} >
          <div className="current-img" ref={(imgViewer) => {
              this.imgViewer = imgViewer}}>
            <ul className="viewer-toolbar">
              {
                actionList && actionList.map((item, index) => {
                  return <li key={index} onClick={() => this.doAction(item.action)}><i className={`viewer-icon viewer-icon-${item.type}`}></i></li>
                })
              }
            </ul>
            {
              activeIndex > 0 ?
              <div onClick={() => this.doAction(3)} className="pre-icon"><i></i></div> : null
            }
            {
              activeIndex < photos.length - 1 ?
              <div onClick={() => this.doAction(4)} className="next-icon"><i></i></div> : null
            }
            {
              photos && photos.length ?
              <img className="big-img" src={ photos[activeIndex || 0].url} style={imgStyle} /> : null
            }
          </div>
          <div className="bottom-content">
            <div className="bottom-imglist">
              {
                photos && photos.map((item, i) => {
                  return <img key={item.url}
                  className={(activeIndex || 0 ) === i ? 'bottom-imglist-current' : ''}
                  src={item.url}
                  onClick={() => this.handleChangeImg(i)} />
                })
              }
            </div>
          </div>
        </div>
    )
  }
}
