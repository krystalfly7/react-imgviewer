import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './app.less';
//for lib test
import PhotoViewer from '../lib/index.js';
import '../lib/index.css'
//for src test
// import PhotoViewer from '../src/index.js';

let labels = [
  { photos: [
    { url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' }
  ], name: '大厦' },
  { photos: [
    { url: 'https://images.unsplash.com/photo-1470777639313-60af88918203?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159'},
    { url: 'https://images.unsplash.com/photo-1453550486481-aa4175b013ea?dpr=2&auto=format&w=1024&h=1024' },
  ], name: '门脸' },
  { photos: [
    { url: 'https://images.unsplash.com/photo-1453550486481-aa4175b013ea?dpr=2&auto=format&w=1024&h=1024' },
    { url: 'https://images.unsplash.com/photo-1470777639313-60af88918203?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159'},
    { url: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&w=1024&h=1024' },
    { url: 'https://images.unsplash.com/photo-1471101173712-b9884175254e?dpr=2&auto=format&w=1024&h=1024' },
    { url: 'https://images.unsplash.com/photo-1455717974081-0436a066bb96?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' },
  ], name: '招牌' }
];
//or use class cover height and width
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeLabelIndex: 0
    }
  }

  handleChange = (activeLabelIndex) => {
    this.setState({ activeLabelIndex });
  }

  render() {
    const { activeLabelIndex } = this.state;
    return (
      <div className="app-test">
        <PhotoViewer photos={labels[activeLabelIndex].photos} activeIndex={1} cwidth={400} cheight={400}/>
        <div className="lables-container">
          {
            labels && labels.map((item, index) => {
              return <div
                className={index === activeLabelIndex ? 'lables-container-item active' : 'lables-container-item'}
                key={index}
                onClick={() => this.handleChange(index)}
                >
              {`${item.name} (${item.photos.length})`}
              </div>
            })
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
