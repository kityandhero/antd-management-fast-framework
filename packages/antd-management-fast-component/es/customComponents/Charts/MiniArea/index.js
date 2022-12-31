import { _ as _extends } from '../../../extends.js';
import { _ as _objectSpread } from '../../../objectSpread2.js';
import { Chart, Axis, Tooltip, Line, Area } from 'bizcharts';
import { s as styles } from '../../../index.js';
import '../../../_commonjsHelpers.js';
import '../../../defineProperty.js';
import '../../../toPropertyKey.js';

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
  return /*#__PURE__*/React.createElement("div", {
    className: styles.miniChart
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chartContent
  }, /*#__PURE__*/React.createElement(Chart, {
    animate: animate,
    scale: scaleProps,
    autoFit: autoFit,
    data: data,
    pure: pure
  }, /*#__PURE__*/React.createElement(Axis, _extends({
    key: "axis-x",
    name: "x",
    label: null,
    line: null,
    tickLine: null,
    grid: null
  }, xAxis)), /*#__PURE__*/React.createElement(Axis, _extends({
    key: "axis-y",
    name: "y",
    label: null,
    line: null,
    tickLine: null,
    grid: null
  }, yAxis)), /*#__PURE__*/React.createElement(Tooltip, {
    showTitle: false,
    showCrosshairs: false
  }), line ? /*#__PURE__*/React.createElement(Line, {
    position: "x*y",
    tooltip: tooltip,
    color: borderColor,
    shape: "smooth",
    style: {
      fillOpacity: 1
    }
  }) : /*#__PURE__*/React.createElement(Area, {
    position: "x*y",
    color: color,
    tooltip: tooltip,
    shape: "smooth",
    style: {
      fillOpacity: 1
    }
  }))));
};

export { MiniArea as default };
