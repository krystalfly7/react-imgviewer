# react-imgviewer

[![NPM version][npm-image]][npm-url]
> react react-imgviewer.

## Introduction


## Installation

```bash
npm install react-imgviewer --save
```

## Usage

```javascript
import React, { Component } from 'react';
import PhotoViewer from 'react-imgviewer'
import 'react-imgviewer/lib/index.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
      imagesList: [{
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
    };
  }

  render() {
    return (
      <div>
          <PhotoViewer
              photos={imagesList}
              activeIndex={this.state.activeIndex}
              cwidth={300}
             />
        </div>
    );
  }
}
```
### Props

| props       | type         | default | description                 | required |
|-------------|--------------|---------|-----------------------------|----------|
| photos  | array  |  -  | image list | true |
| cwidth  | number  |  300  | photos parent container width | false |
| cheight  | number  |  400  | photos parent container height | false |
| activeIndex  | number  |  0 | active image index | false |
| onActiveChange  | func  |   | callback when active image index change | false |
## License

MIT
