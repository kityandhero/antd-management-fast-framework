"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Bar", {
  enumerable: true,
  get: function get() {
    return _Bar.default;
  }
});
Object.defineProperty(exports, "ChartCard", {
  enumerable: true,
  get: function get() {
    return _ChartCard.default;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _Field.default;
  }
});
Object.defineProperty(exports, "Gauge", {
  enumerable: true,
  get: function get() {
    return _Gauge.default;
  }
});
Object.defineProperty(exports, "MiniArea", {
  enumerable: true,
  get: function get() {
    return _MiniArea.default;
  }
});
Object.defineProperty(exports, "MiniBar", {
  enumerable: true,
  get: function get() {
    return _MiniBar.default;
  }
});
Object.defineProperty(exports, "MiniProgress", {
  enumerable: true,
  get: function get() {
    return _MiniProgress.default;
  }
});
Object.defineProperty(exports, "Pie", {
  enumerable: true,
  get: function get() {
    return _Pie.default;
  }
});
Object.defineProperty(exports, "TagCloud", {
  enumerable: true,
  get: function get() {
    return _TagCloud.default;
  }
});
Object.defineProperty(exports, "TimelineChart", {
  enumerable: true,
  get: function get() {
    return _TimelineChart.default;
  }
});
Object.defineProperty(exports, "WaterWave", {
  enumerable: true,
  get: function get() {
    return _WaterWave.default;
  }
});
exports.yuan = exports.default = void 0;

var _numeral = _interopRequireDefault(require("numeral"));

var _Bar = _interopRequireDefault(require("./Bar"));

var _ChartCard = _interopRequireDefault(require("./ChartCard"));

var _Field = _interopRequireDefault(require("./Field"));

var _Gauge = _interopRequireDefault(require("./Gauge"));

var _MiniArea = _interopRequireDefault(require("./MiniArea"));

var _MiniBar = _interopRequireDefault(require("./MiniBar"));

var _MiniProgress = _interopRequireDefault(require("./MiniProgress"));

var _Pie = _interopRequireDefault(require("./Pie"));

var _TagCloud = _interopRequireDefault(require("./TagCloud"));

var _TimelineChart = _interopRequireDefault(require("./TimelineChart"));

var _WaterWave = _interopRequireDefault(require("./WaterWave"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yuan = function yuan(val) {
  return "\xA5 ".concat((0, _numeral.default)(val).format('0,0'));
};

exports.yuan = yuan;
var Charts = {
  yuan: yuan,
  Bar: _Bar.default,
  Pie: _Pie.default,
  Gauge: _Gauge.default,
  MiniBar: _MiniBar.default,
  MiniArea: _MiniArea.default,
  MiniProgress: _MiniProgress.default,
  ChartCard: _ChartCard.default,
  Field: _Field.default,
  WaterWave: _WaterWave.default,
  TagCloud: _TagCloud.default,
  TimelineChart: _TimelineChart.default
};
exports.default = Charts;