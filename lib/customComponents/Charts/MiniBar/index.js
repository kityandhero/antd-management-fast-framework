"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bizcharts = require("bizcharts");

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MiniBar = function MiniBar(props) {
  var _props$autoFit = props.autoFit,
      autoFit = _props$autoFit === void 0 ? true : _props$autoFit,
      _props$color = props.color,
      color = _props$color === void 0 ? '#1890FF' : _props$color,
      _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      _props$animate = props.animate,
      animate = _props$animate === void 0 ? true : _props$animate,
      _props$pure = props.pure,
      pure = _props$pure === void 0 ? true : _props$pure;
  var scale = {
    x: {
      type: 'cat'
    },
    y: {
      min: 0
    }
  };
  var tooltip = ['x*y', function (x, y) {
    return {
      name: x,
      value: y
    };
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].miniChart
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].chartContent
  }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Chart, {
    animate: animate,
    scale: scale,
    autoFit: autoFit,
    data: data,
    pure: pure
  }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Tooltip, {
    showTitle: false,
    showCrosshairs: false
  }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Interval, {
    position: "x*y",
    color: color,
    tooltip: tooltip
  }))));
};

var _default = MiniBar;
exports["default"] = _default;