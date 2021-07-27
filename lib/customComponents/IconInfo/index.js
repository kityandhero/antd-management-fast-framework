"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

var _react = _interopRequireWildcard(require("react"));

var _tools = require("@/utils/tools");

var _Ellipsis = _interopRequireDefault(require("@/customComponents/Ellipsis"));

var _index = _interopRequireDefault(require("./index.less"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var defaultValue = {
  direction: 'horizontal',
  responsive: false,
  tooltip: false,
  ellipsis: true,
  icon: null,
  iconPosition: 'left',
  iconTooltip: '',
  textPrefix: null,
  canCopy: false,
  text: ''
};

var IconInfo = /*#__PURE__*/function (_PureComponent) {
  _inherits(IconInfo, _PureComponent);

  var _super = _createSuper(IconInfo);

  function IconInfo() {
    var _this;

    _classCallCheck(this, IconInfo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.copyText = function () {
      var _this$props = _this.props,
          canCopy = _this$props.canCopy,
          text = _this$props.text;

      if (canCopy && !(0, _tools.stringIsNullOrWhiteSpace)(text)) {
        (0, _tools.copyToClipboard)(text);
      }
    };

    return _this;
  }

  _createClass(IconInfo, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _defaultValue = _objectSpread(_objectSpread({}, defaultValue), this.props || {}),
          directionValue = _defaultValue.direction,
          responsiveValue = _defaultValue.responsive,
          tooltipValue = _defaultValue.tooltip,
          ellipsisValue = _defaultValue.ellipsis,
          text = _defaultValue.text,
          textPrefix = _defaultValue.textPrefix,
          icon = _defaultValue.icon,
          iconPosition = _defaultValue.iconPosition,
          iconTooltip = _defaultValue.iconTooltip,
          onClick = _defaultValue.onClick,
          canCopy = _defaultValue.canCopy;

      var responsive = responsiveValue || false;
      var tooltip = tooltipValue || false;
      var ellipsis = ellipsisValue || false;
      var iconItem = (icon || null) == null ? null : /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].iconBox
      }, icon);
      var direction = directionValue || 'horizontal';

      if (direction !== 'horizontal' && direction !== 'vertical') {
        direction = 'horizontal';
      }

      if (direction === 'horizontal') {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].containor,
          onClick: onClick
        }, responsive ? (iconItem || null) == null ? /*#__PURE__*/_react["default"].createElement(_row["default"], {
          gutter: 8
        }, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          style: canCopy ? {
            cursor: 'pointer'
          } : {},
          onClick: function onClick() {
            _this2.copyText();
          }
        }, ellipsis ? /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
          tooltip: tooltip,
          lines: 1
        }, (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? null : "".concat(textPrefix, "\uFF1A"), " ", text) : (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? text : "".concat(textPrefix, "\uFF1A").concat(text))) : /*#__PURE__*/_react["default"].createElement(_row["default"], {
          gutter: 8
        }, iconPosition === 'left' ? /*#__PURE__*/_react["default"].createElement(_col["default"], {
          xl: 4,
          lg: 6,
          md: 8,
          sm: 24,
          xs: 24
        }, (0, _tools.stringIsNullOrWhiteSpace)(iconTooltip) ? iconItem : /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: iconTooltip
        }, iconItem)) : null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          xl: 20,
          lg: 18,
          md: 16,
          sm: 24,
          xs: 24,
          style: canCopy ? {
            cursor: 'pointer'
          } : {},
          onClick: function onClick() {
            _this2.copyText();
          }
        }, ellipsis ? /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
          tooltip: tooltip,
          lines: 1
        }, (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? null : "".concat(textPrefix, "\uFF1A"), " ", text) : (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? text : "".concat(textPrefix, "\uFF1A").concat(text)), iconPosition !== 'left' ? /*#__PURE__*/_react["default"].createElement(_col["default"], {
          xl: 4,
          lg: 6,
          md: 8,
          sm: 24,
          xs: 24
        }, (0, _tools.stringIsNullOrWhiteSpace)(iconTooltip) ? iconItem : /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: iconTooltip
        }, iconItem)) : null) : (iconItem || null) == null ? /*#__PURE__*/_react["default"].createElement(_row["default"], {
          gutter: 8
        }, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          style: canCopy ? {
            cursor: 'pointer'
          } : {},
          onClick: function onClick() {
            _this2.copyText();
          }
        }, ellipsis ? /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
          tooltip: tooltip,
          lines: 1
        }, (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? null : "".concat(textPrefix, "\uFF1A"), " ", text) : (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? text : "".concat(textPrefix, "\uFF1A").concat(text))) : /*#__PURE__*/_react["default"].createElement(_row["default"], {
          gutter: 8
        }, iconPosition === 'left' ? /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }, (0, _tools.stringIsNullOrWhiteSpace)(iconTooltip) ? iconItem : /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: iconTooltip
        }, iconItem)) : null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          style: canCopy ? {
            cursor: 'pointer'
          } : {},
          onClick: function onClick() {
            _this2.copyText();
          }
        }, ellipsis ? /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
          tooltip: tooltip,
          lines: 1
        }, (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? null : "".concat(textPrefix, "\uFF1A"), " ", text) : (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? text : "".concat(textPrefix, "\uFF1A").concat(text)), iconPosition !== 'left' ? /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }, (0, _tools.stringIsNullOrWhiteSpace)(iconTooltip) ? iconItem : /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: iconTooltip
        }, iconItem)) : null)));
      }

      if (direction === 'vertical') {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].containor,
          onClick: onClick
        }, /*#__PURE__*/_react["default"].createElement(_row["default"], {
          justify: "center"
        }, (iconItem || null) == null ? null : /*#__PURE__*/_react["default"].createElement(_col["default"], {
          span: 24
        }, /*#__PURE__*/_react["default"].createElement(_row["default"], null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }), /*#__PURE__*/_react["default"].createElement(_col["default"], {
          style: canCopy ? {
            cursor: 'pointer'
          } : {},
          onClick: function onClick() {
            _this2.copyText();
          }
        }, (0, _tools.stringIsNullOrWhiteSpace)(iconTooltip) ? iconItem : /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: iconTooltip
        }, iconItem)), /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
          span: 24
        }, /*#__PURE__*/_react["default"].createElement(_row["default"], null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }), /*#__PURE__*/_react["default"].createElement(_col["default"], {
          style: canCopy ? {
            cursor: 'pointer'
          } : {},
          onClick: function onClick() {
            _this2.copyText();
          }
        }, ellipsis ? /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
          tooltip: tooltip,
          lines: 1
        }, (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? null : "".concat(textPrefix, "\uFF1A"), " ", text) : (0, _tools.stringIsNullOrWhiteSpace)(textPrefix) ? text : "".concat(textPrefix, "\uFF1A").concat(text)), /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }))))));
      }

      return null;
    }
  }]);

  return IconInfo;
}(_react.PureComponent);

IconInfo.defaultProps = defaultValue;
var _default = IconInfo;
exports["default"] = _default;