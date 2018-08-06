import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './app.less';
//for lib test
// import PhotoViewer from '../lib/index.js';
// import '../lib/index.css'
//for src test
import PhotoViewer from '../src/index.js';

let photos =  [
  { url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' },
  { url: 'https://images.unsplash.com/photo-1470777639313-60af88918203?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159'},
  { url: 'https://images.unsplash.com/photo-1453550486481-aa4175b013ea?dpr=2&auto=format&w=1024&h=1024' },
  { url: 'https://images.unsplash.com/photo-1471127432458-65206be149c9?dpr=2&auto=format&w=1024&h=1024' },
  { url: 'https://images.unsplash.com/photo-1471101173712-b9884175254e?dpr=2&auto=format&w=1024&h=1024' },
  { url: 'https://images.unsplash.com/photo-1455717974081-0436a066bb96?dpr=2&auto=format&crop=faces&fit=crop&w=240&h=159' }
];

export default class App extends Component {
  render() {
    return (
      <div className="app-test">
        <PhotoViewer photos={photos} activeIndex={2} cwidth={500} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
