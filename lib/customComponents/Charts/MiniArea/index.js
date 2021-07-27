"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bizcharts = require("bizcharts");

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MiniArea = function MiniArea(props) {
  var _props$data = props.data,
      data = _props$data === void 0 ? [] : _props$data,
      _props$autoFit = props.autoFit,
      autoFit = _props$autoFit === void 0 ? true : _props$autoFit,
      _props$color = props.color,
      color = _props$color === void 0 ? 'rgba(24, 144, 255, 0.2)' : _props$color,
      _props$borderColor = props.borderColor,
      borderColor = _props$borderColor === void 0 ? '#1089ff' : _props$borderColor,
      _props$scale = props.scale,
      scale = _props$scale === void 0 ? {
    x: {},
    y: {}
  } : _props$scale,
      line = props.line,
      xAxis = props.xAxis,
      yAxis = props.yAxis,
      _props$animate = props.animate,
      animate = _props$animate === void 0 ? true : _props$animate,
      _props$pure = props.pure,
      pure = _props$pure === void 0 ? true : _props$pure;
  var scaleProps = {
    x: _objectSpread({
      type: 'cat',
      range: [0, 1]
    }, scale.x),
    y: _objectSpread({
      min: 0
    }, scale.y)
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
    scale: scaleProps,
    autoFit: autoFit,
    data: data,
    pure: pure
  }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Axis, _extends({
    key: "axis-x",
    name: "x",
    label: null,
    line: null,
    tickLine: null,
    grid: null
  }, xAxis)), /*#__PURE__*/_react["default"].createElement(_bizcharts.Axis, _extends({
    key: "axis-y",
    name: "y",
    label: null,
    line: null,
    tickLine: null,
    grid: null
  }, yAxis)), /*#__PURE__*/_react["default"].createElement(_bizcharts.Tooltip, {
    showTitle: false,
    showCrosshairs: false
  }), line ? /*#__PURE__*/_react["default"].createElement(_bizcharts.Line, {
    position: "x*y",
    tooltip: tooltip,
    color: borderColor,
    shape: "smooth",
    style: {
      fillOpacity: 1
    }
  }) : /*#__PURE__*/_react["default"].createElement(_bizcharts.Area, {
    position: "x*y",
    color: color,
    tooltip: tooltip,
    shape: "smooth",
    style: {
      fillOpacity: 1
    }
  }))));
};

var _default = MiniArea;
exports["default"] = _default;