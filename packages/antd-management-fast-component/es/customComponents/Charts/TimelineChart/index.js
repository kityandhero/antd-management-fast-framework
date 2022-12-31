import { _ as _objectSpread } from '../../../objectSpread2.js';
import { _ as _toConsumableArray } from '../../../toConsumableArray.js';
import { Chart, Axis, Tooltip, Legend, Geom, Slider } from 'bizcharts';
import DataSet from '@antv/data-set';
import AutoHeightComponent from '../autoHeight.js';
import '../../../_commonjsHelpers.js';
import '../../../defineProperty.js';
import '../../../toPropertyKey.js';
import '../../../unsupportedIterableToArray.js';
import '../../../getPrototypeOf.js';
import 'react';

var styles = undefined;

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
  var ds = new DataSet({
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
    return /*#__PURE__*/React.createElement(Slider, {
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
  return /*#__PURE__*/React.createElement(AutoHeightComponent, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.timelineChart,
    style: {
      height: height + 30
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h4", null, title), /*#__PURE__*/React.createElement(Chart, {
    height: height,
    padding: padding,
    data: dv,
    scale: cols,
    forceFit: true
  }, /*#__PURE__*/React.createElement(Axis, {
    name: "x"
  }), /*#__PURE__*/React.createElement(Tooltip, null), /*#__PURE__*/React.createElement(Legend, {
    name: "key",
    position: "top"
  }), /*#__PURE__*/React.createElement(Geom, {
    type: "line",
    position: "x*value",
    size: borderWidth,
    color: "key"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginRight: -20
    }
  }, /*#__PURE__*/React.createElement(SliderGen, null))))));
};

export { TimelineChart as default };
