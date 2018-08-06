# component-poi-fe-imgviewer

[![NPM version][npm-image]][npm-url]
> react component-poi-fe-imgviewer.

## Introduction


## Installation

```bash
npm install component-poi-fe-imgviewer --save
```

## Usage

```javascript
import React, { Component } from 'react';
import PhotoViewer from '@dp/component-poi-fe-imgviewer'
import '@dp/component-poi-fe-imgviewer/lib/index.css';

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
| cwidth  | number  |  300px  | photos parent container width | false |
| cheight  | number  |  400px  | photos parent container height | false |
| activeIndex  | number  |  0 | active image index | false |

## License

MIT
