"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireWildcard(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class UIPositionPicker extends _react().PureComponent {
  constructor(props) {
    super(props);
    /* eslint-disable no-underscore-dangle */

    this.loadUI = () => {
      const callback = this.props.callback;
      window.AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
        /* eslint-disable no-new */
        new PositionPicker({
          mode: 'dragMap',
          map: this.map,
          iconStyle: {
            // 自定义外观
            url: 'http://qn.9gms.net/c3b22e42-1122-42b8-91cc-56cb86240d7a.png',
            // 图片地址
            size: [12, 20],
            // 要显示的点大小，将缩放图片
            ancher: [0, 0] // 锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置

          }
        }).on('success', positionResult => {
          if (typeof callback === 'function') {
            callback(positionResult);
          }
        }).start();
      });
    };

    this.map = props.__map__;
    this.loadUI();
  }

  render() {
    return null;
  }

}

var _default = UIPositionPicker;
exports.default = _default;