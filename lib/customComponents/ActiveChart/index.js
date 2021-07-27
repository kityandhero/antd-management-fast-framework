"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Charts = require("../Charts");

var _NumberInfo = _interopRequireDefault(require("../NumberInfo"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function fixedZero(val) {
  return val * 1 < 10 ? "0".concat(val) : val;
}

function getActiveData() {
  var activeData = [];

  for (var i = 0; i < 24; i += 1) {
    activeData.push({
      x: "".concat(fixedZero(i), ":00"),
      y: Math.floor(Math.random() * 200) + i * 50
    });
  }

  return activeData;
}

var ActiveChart = /*#__PURE__*/function (_Component) {
  _inherits(ActiveChart, _Component);

  var _super = _createSuper(ActiveChart);

  function ActiveChart() {
    var _this;

    _classCallCheck(this, ActiveChart);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      activeData: getActiveData()
    };

    _this.loopData = function () {
      _this.requestRef = requestAnimationFrame(function () {
        _this.timer = setTimeout(function () {
          _this.setState({
            activeData: getActiveData()
          }, function () {
            _this.loopData();
          });
        }, 1000);
      });
    };

    return _this;
  }

  _createClass(ActiveChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loopData();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timer);
      cancelAnimationFrame(this.requestRef);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state$activeDat = this.state.activeData,
          activeData = _this$state$activeDat === void 0 ? [] : _this$state$activeDat;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].activeChart
      }, /*#__PURE__*/_react["default"].createElement(_NumberInfo["default"], {
        subTitle: "\u76EE\u6807\u8BC4\u4F30",
        total: "\u6709\u671B\u8FBE\u5230\u9884\u671F"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          marginTop: 32
        }
      }, /*#__PURE__*/_react["default"].createElement(_Charts.MiniArea, {
        animate: false,
        line: true,
        borderWidth: 2,
        height: 84,
        scale: {
          y: {
            tickCount: 3
          }
        },
        yAxis: {
          tickLine: false,
          label: false,
          title: false,
          line: false
        },
        data: activeData
      })), activeData && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].activeChartGrid
      }, /*#__PURE__*/_react["default"].createElement("p", null, _toConsumableArray(activeData).sort()[activeData.length - 1].y + 200, " \u4EBF\u5143"), /*#__PURE__*/_react["default"].createElement("p", null, _toConsumableArray(activeData).sort()[Math.floor(activeData.length / 2)].y, " \u4EBF\u5143")), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].dashedLine
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].line
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].dashedLine
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].line
      }))), activeData && /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].activeChartLegend
      }, /*#__PURE__*/_react["default"].createElement("span", null, "00:00"), /*#__PURE__*/_react["default"].createElement("span", null, activeData[Math.floor(activeData.length / 2)].x), /*#__PURE__*/_react["default"].createElement("span", null, activeData[activeData.length - 1].x)));
    }
  }]);

  return ActiveChart;
}(_react.Component);

exports["default"] = ActiveChart;