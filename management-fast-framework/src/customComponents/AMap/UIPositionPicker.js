import { PureComponent } from 'react';

class UIPositionPicker extends PureComponent {
  constructor(props) {
    super(props);

    /* eslint-disable no-underscore-dangle */
    this.map = props.__map__;

    this.loadUI();
  }

  loadUI = () => {
    const { callback } = this.props;

    window.AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
      /* eslint-disable no-new */
      new PositionPicker({
        mode: 'dragMap',
        map: this.map,
        iconStyle: {
          // 自定义外观
          url: 'http://qn.9gms.net/c3b22e42-1122-42b8-91cc-56cb86240d7a.png', // 图片地址
          size: [12, 20], // 要显示的点大小，将缩放图片
          ancher: [0, 0], // 锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
        },
      })
        .on('success', (positionResult) => {
          if (typeof callback === 'function') {
            callback(positionResult);
          }
        })
        .start();
    });
  };

  render() {
    return null;
  }
}

export default UIPositionPicker;
