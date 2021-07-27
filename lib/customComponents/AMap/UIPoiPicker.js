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

class UIPoiPicker extends _react().PureComponent {
  constructor(props) {
    super(props);
    /* eslint-disable no-underscore-dangle */

    this.loadUI = () => {
      window.AMapUI.loadUI(['misc/PoiPicker'], PoiPicker => {
        /* eslint-disable no-new */
        new PoiPicker({
          input: 'pickerInput'
        }).on('poiPicked', poiResult => {
          // 用户选中的poi点信息
          // console.dir(poiResult);
          this.map.setCenter(poiResult.item.location);
          this.map.setZoom(15);
        });
      });
    };

    this.map = props.__map__;
    this.loadUI();
  }

  render() {
    return null;
  }

}

var _default = UIPoiPicker;
exports.default = _default;