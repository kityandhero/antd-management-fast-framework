"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/card/style");

var _card = _interopRequireDefault(require("antd/es/card"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["loading", "contentHeight", "title", "avatar", "action", "total", "footer", "children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var renderTotal = function renderTotal(total) {
  if (!total && total !== 0) {
    return null;
  }

  var totalDom;

  switch (_typeof(total)) {
    case 'undefined':
      totalDom = null;
      break;

    case 'function':
      totalDom = /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.total
      }, total());
      break;

    default:
      totalDom = /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.total
      }, total);
  }

  return totalDom;
};

var ChartCard = /*#__PURE__*/function (_React$Component) {
  _inherits(ChartCard, _React$Component);

  var _super = _createSuper(ChartCard);

  function ChartCard() {
    var _this;

    _classCallCheck(this, ChartCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.renderContent = function () {
      var _this$props = _this.props,
          contentHeight = _this$props.contentHeight,
          title = _this$props.title,
          avatar = _this$props.avatar,
          action = _this$props.action,
          total = _this$props.total,
          footer = _this$props.footer,
          children = _this$props.children,
          loading = _this$props.loading;

      if (loading) {
        return false;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.chartCard
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(_index.default.chartTop, _defineProperty({}, _index.default.chartTopMargin, !children && !footer))
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.avatar
      }, avatar), /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.metaWrap
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.meta
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: _index.default.title
      }, title), /*#__PURE__*/_react.default.createElement("span", {
        className: _index.default.action
      }, action)), renderTotal(total))), children && /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.content,
        style: {
          height: contentHeight || 'auto'
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.contentFixed
      }, children)), footer && /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(_index.default.footer, _defineProperty({}, _index.default.footerMargin, !children))
      }, footer));
    };

    return _this;
  }

  _createClass(ChartCard, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          _this$props2$loading = _this$props2.loading,
          loading = _this$props2$loading === void 0 ? false : _this$props2$loading,
          contentHeight = _this$props2.contentHeight,
          title = _this$props2.title,
          avatar = _this$props2.avatar,
          action = _this$props2.action,
          total = _this$props2.total,
          footer = _this$props2.footer,
          children = _this$props2.children,
          rest = _objectWithoutProperties(_this$props2, _excluded);

      return /*#__PURE__*/_react.default.createElement(_card.default, _extends({
        loading: loading,
        bodyStyle: {
          padding: '20px 24px 8px 24px'
        }
      }, rest), this.renderContent());
    }
  }]);

  return ChartCard;
}(_react.default.Component);

var _default = ChartCard;
exports.default = _default;