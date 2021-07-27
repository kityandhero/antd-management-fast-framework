"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bizcharts = require("bizcharts");

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("../index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Bar = /*#__PURE__*/function (_Component) {
  _inherits(Bar, _Component);

  var _super = _createSuper(Bar);

  function Bar() {
    var _this;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      autoHideXLabels: false
    };
    return _this;
  }

  _createClass(Bar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          _this$props$autoFit = _this$props.autoFit,
          autoFit = _this$props$autoFit === void 0 ? true : _this$props$autoFit,
          data = _this$props.data,
          _this$props$color = _this$props.color,
          color = _this$props$color === void 0 ? 'rgba(24, 144, 255, 0.85)' : _this$props$color,
          _this$props$animate = _this$props.animate,
          animate = _this$props$animate === void 0 ? true : _this$props$animate;
      var autoHideXLabels = this.state.autoHideXLabels;
      var scale = {
        x: {
          type: 'cat'
        },
        y: {
          min: 0,
          alias: title
        }
      };
      var tooltip = ['x*y', function (x, y) {
        return {
          name: x,
          value: y
        };
      }];
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].chart,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Chart, {
        animate: animate,
        scale: scale,
        autoFit: autoFit,
        data: data
      }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Axis, {
        name: "x",
        title: false,
        label: autoHideXLabels ? undefined : {},
        tickLine: autoHideXLabels ? undefined : {}
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Axis, {
        title: true,
        name: "y",
        min: 0
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Tooltip, {
        showTitle: false,
        showCrosshairs: false
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Interval, {
        position: "x*y",
        color: color,
        tooltip: tooltip
      }))));
    }
  }]);

  return Bar;
}(_react.Component);

var _default = Bar;
exports["default"] = _default;