"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bizcharts = require("bizcharts");

var _dataSet = _interopRequireDefault(require("@antv/data-set"));

var _react = _interopRequireDefault(require("react"));

var _autoHeight = _interopRequireDefault(require("../autoHeight"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var TimelineChart = function TimelineChart(props) {
  var title = props.title,
      _props$height = props.height,
      height = _props$height === void 0 ? 400 : _props$height,
      _props$padding = props.padding,
      padding = _props$padding === void 0 ? [60, 20, 40, 40] : _props$padding,
      _props$titleMap = props.titleMap,
      titleMap = _props$titleMap === void 0 ? {
    y1: 'y1',
    y2: 'y2'
  } : _props$titleMap,
      _props$borderWidth = props.borderWidth,
      borderWidth = _props$borderWidth === void 0 ? 2 : _props$borderWidth,
      sourceData = props.data;
  var data = Array.isArray(sourceData) ? sourceData : [{
    x: 0,
    y1: 0,
    y2: 0
  }];
  data.sort(function (a, b) {
    return a.x - b.x;
  });
  var max;

  if (data[0] && data[0].y1 && data[0].y2) {
    max = Math.max(_toConsumableArray(data).sort(function (a, b) {
      return b.y1 - a.y1;
    })[0].y1, _toConsumableArray(data).sort(function (a, b) {
      return b.y2 - a.y2;
    })[0].y2);
  }

  var ds = new _dataSet["default"]({
    state: {
      start: data[0].x,
      end: data[data.length - 1].x
    }
  });
  var dv = ds.createView();
  dv.source(data).transform({
    type: 'filter',
    callback: function callback(obj) {
      var date = obj.x;
      return date <= ds.state.end && date >= ds.state.start;
    }
  }).transform({
    type: 'map',
    callback: function callback(row) {
      var newRow = _objectSpread({}, row);

      newRow[titleMap.y1] = row.y1;
      newRow[titleMap.y2] = row.y2;
      return newRow;
    }
  }).transform({
    type: 'fold',
    fields: [titleMap.y1, titleMap.y2],
    // 展开字段集
    key: 'key',
    // key字段
    value: 'value' // value字段

  });
  var timeScale = {
    type: 'time',
    tickInterval: 60 * 60 * 1000,
    mask: 'HH:mm',
    range: [0, 1]
  };
  var cols = {
    x: timeScale,
    value: {
      max: max,
      min: 0
    }
  };

  var SliderGen = function SliderGen() {
    return /*#__PURE__*/_react["default"].createElement(_bizcharts.Slider, {
      padding: [0, padding[1] + 20, 0, padding[3]],
      width: "auto",
      height: 26,
      xAxis: "x",
      yAxis: "y1",
      scales: {
        x: timeScale
      },
      data: data,
      start: ds.state.start,
      end: ds.state.end,
      backgroundChart: {
        type: 'line'
      },
      onChange: function onChange(_ref) {
        var startValue = _ref.startValue,
            endValue = _ref.endValue;
        ds.setState('start', startValue);
        ds.setState('end', endValue);
      }
    });
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].timelineChart,
    style: {
      height: height + 30
    }
  }, /*#__PURE__*/_react["default"].createElement("div", null, title && /*#__PURE__*/_react["default"].createElement("h4", null, title), /*#__PURE__*/_react["default"].createElement(_bizcharts.Chart, {
    height: height,
    padding: padding,
    data: dv,
    scale: cols,
    forceFit: true
  }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Axis, {
    name: "x"
  }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Tooltip, null), /*#__PURE__*/_react["default"].createElement(_bizcharts.Legend, {
    name: "key",
    position: "top"
  }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Geom, {
    type: "line",
    position: "x*value",
    size: borderWidth,
    color: "key"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginRight: -20
    }
  }, /*#__PURE__*/_react["default"].createElement(SliderGen, null))));
};

var _default = (0, _autoHeight["default"])()(TimelineChart);

exports["default"] = _default;