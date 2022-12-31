import { Guide, registerShape, Chart, Coordinate, Axis, Geom } from 'bizcharts';
import AutoHeightComponent from '../autoHeight.js';
import '../../../getPrototypeOf.js';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';
import 'react';

var Arc = Guide.Arc,
  Html = Guide.Html,
  Line = Guide.Line;
var defaultFormatter = function defaultFormatter(val) {
  switch (val) {
    case '2':
      return '差';
    case '4':
      return '中';
    case '6':
      return '良';
    case '8':
      return '优';
    default:
      return '';
  }
};
if (registerShape) {
  registerShape('point', 'pointer', {
    draw: function draw(cfg, group) {
      var point = cfg.points[0];
      point = this.parsePoint(point);
      var center = this.parsePoint({
        x: 0,
        y: 0
      });
      group.addShape('line', {
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: point.x,
          y2: point.y,
          stroke: cfg.color,
          lineWidth: 2,
          lineCap: 'round'
        }
      });
      return group.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 6,
          stroke: cfg.color,
          lineWidth: 3,
          fill: '#fff'
        }
      });
    }
  });
}
var Gauge = function Gauge(props) {
  var title = props.title,
    percent = props.percent,
    _props$forceFit = props.forceFit,
    forceFit = _props$forceFit === void 0 ? true : _props$forceFit,
    _props$formatter = props.formatter,
    formatter = _props$formatter === void 0 ? defaultFormatter : _props$formatter,
    _props$color = props.color,
    color = _props$color === void 0 ? '#2F9CFF' : _props$color,
    _props$bgColor = props.bgColor,
    bgColor = _props$bgColor === void 0 ? '#F0F2F5' : _props$bgColor;
  var cols = {
    value: {
      type: 'linear',
      min: 0,
      max: 10,
      tickCount: 6,
      nice: true
    }
  };
  var data = [{
    value: percent / 10
  }];
  var renderHtml = function renderHtml() {
    return "\n    <div style=\"width: 300px;text-align: center;font-size: 12px!important;\">\n      <div style=\"font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;\">".concat(title, "</div>\n      <div style=\"font-size: 24px;color: rgba(0,0,0,0.85);margin: 0;\">\n        ").concat((data[0].value * 10).toFixed(2), "%\n      </div>\n    </div>");
  };
  var textStyle = {
    fontSize: 12,
    fill: 'rgba(0, 0, 0, 0.65)',
    textAlign: 'center'
  };
  return /*#__PURE__*/React.createElement(AutoHeightComponent, null, /*#__PURE__*/React.createElement(Chart, {
    style: {
      height: "100%"
    },
    data: data,
    scale: cols,
    padding: [-16, 0, 16, 0],
    forceFit: forceFit
  }, /*#__PURE__*/React.createElement(Coordinate, {
    type: "polar",
    startAngle: -1.25 * Math.PI,
    endAngle: 0.25 * Math.PI,
    radius: 0.8
  }), /*#__PURE__*/React.createElement(Axis, {
    name: "1",
    line: undefined
  }), /*#__PURE__*/React.createElement(Axis, {
    line: undefined,
    tickLine: undefined,
    subTickLine: undefined,
    name: "value",
    zIndex: 2,
    label: {
      offset: -12,
      formatter: formatter,
      textStyle: textStyle
    }
  }), /*#__PURE__*/React.createElement(Guide, null, /*#__PURE__*/React.createElement(Line, {
    start: [3, 0.905],
    end: [3, 0.85],
    lineStyle: {
      stroke: color,
      lineDash: undefined,
      lineWidth: 2
    }
  }), /*#__PURE__*/React.createElement(Line, {
    start: [5, 0.905],
    end: [5, 0.85],
    lineStyle: {
      stroke: color,
      lineDash: undefined,
      lineWidth: 3
    }
  }), /*#__PURE__*/React.createElement(Line, {
    start: [7, 0.905],
    end: [7, 0.85],
    lineStyle: {
      stroke: color,
      lineDash: undefined,
      lineWidth: 3
    }
  }), /*#__PURE__*/React.createElement(Arc, {
    start: [0, 0.965],
    end: [10, 0.965],
    style: {
      stroke: bgColor,
      lineWidth: 10
    }
  }), /*#__PURE__*/React.createElement(Arc, {
    start: [0, 0.965],
    end: [data[0].value, 0.965],
    style: {
      stroke: color,
      lineWidth: 10
    }
  }), /*#__PURE__*/React.createElement(Html, {
    position: ['50%', '95%'],
    html: renderHtml()
  })), /*#__PURE__*/React.createElement(Geom, {
    line: false,
    type: "point",
    position: "value*1",
    shape: "pointer",
    color: color,
    active: false
  })));
};

export { Gauge as default };
