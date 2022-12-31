import { Chart, Tooltip, Interval } from 'bizcharts';
import { s as styles } from '../../../index.js';

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
  return /*#__PURE__*/React.createElement("div", {
    className: styles.miniChart
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.chartContent
  }, /*#__PURE__*/React.createElement(Chart, {
    animate: animate,
    scale: scale,
    autoFit: autoFit,
    data: data,
    pure: pure
  }, /*#__PURE__*/React.createElement(Tooltip, {
    showTitle: false,
    showCrosshairs: false
  }), /*#__PURE__*/React.createElement(Interval, {
    position: "x*y",
    color: color,
    tooltip: tooltip
  }))));
};

export { MiniBar as default };
