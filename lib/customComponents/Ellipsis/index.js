"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cutStrByFullLength = exports.getStrFullLength = void 0;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["text", "length", "tooltip", "fullWidthRecognition"],
    _excluded2 = ["children", "lines", "length", "className", "tooltip", "fullWidthRecognition"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint react/no-did-mount-set-state: 0 */

/* eslint no-param-reassign: 0 */
var isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;
var TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word'
};

var getStrFullLength = function getStrFullLength() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);

    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }

    return pre + 2;
  }, 0);
};

exports.getStrFullLength = getStrFullLength;

var cutStrByFullLength = function cutStrByFullLength() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var maxLength = arguments.length > 1 ? arguments[1] : undefined;
  var showLength = 0;
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);

    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }

    if (showLength <= maxLength) {
      return pre + cur;
    }

    return pre;
  }, '');
};

exports.cutStrByFullLength = cutStrByFullLength;

var getTooltip = function getTooltip(_ref) {
  var tooltip = _ref.tooltip,
      overlayStyle = _ref.overlayStyle,
      title = _ref.title,
      children = _ref.children;

  if (tooltip) {
    var props = tooltip === true ? {
      overlayStyle: overlayStyle,
      title: title
    } : _objectSpread(_objectSpread({}, tooltip), {}, {
      overlayStyle: overlayStyle,
      title: title
    });
    return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], props, children);
  }

  return children;
};

var EllipsisText = function EllipsisText(_ref2) {
  var text = _ref2.text,
      length = _ref2.length,
      tooltip = _ref2.tooltip,
      fullWidthRecognition = _ref2.fullWidthRecognition,
      other = _objectWithoutProperties(_ref2, _excluded);

  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }

  var textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;

  if (textLength <= length || length < 0) {
    return /*#__PURE__*/_react["default"].createElement("span", other, text);
  }

  var tail = '...';
  var displayText;

  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  var spanAttrs = tooltip ? {} : _objectSpread({}, other);
  return getTooltip({
    tooltip: tooltip,
    overlayStyle: TooltipOverlayStyle,
    title: text,
    children: /*#__PURE__*/_react["default"].createElement("span", spanAttrs, displayText, tail)
  });
};

var Ellipsis = /*#__PURE__*/function (_Component) {
  _inherits(Ellipsis, _Component);

  var _super = _createSuper(Ellipsis);

  function Ellipsis() {
    var _this;

    _classCallCheck(this, Ellipsis);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      text: '',
      targetCount: 0
    };

    _this.computeLine = function () {
      var lines = _this.props.lines;

      if (lines && !isSupportLineClamp) {
        var text = _this.shadowChildren.innerText || _this.shadowChildren.textContent;
        var lineHeight = parseInt(getComputedStyle(_this.root).lineHeight, 10);
        var targetHeight = lines * lineHeight;
        _this.content.style.height = "".concat(targetHeight, "px");
        var totalHeight = _this.shadowChildren.offsetHeight;
        var shadowNode = _this.shadow.firstChild;

        if (totalHeight <= targetHeight) {
          _this.setState({
            text: text,
            targetCount: text.length
          });

          return;
        } // bisection


        var len = text.length;
        var mid = Math.ceil(len / 2);

        var count = _this.bisection(targetHeight, mid, 0, len, text, shadowNode);

        _this.setState({
          text: text,
          targetCount: count
        });
      }
    };

    _this.bisection = function (th, m, b, e, text, shadowNode) {
      var suffix = '...';
      var mid = m;
      var end = e;
      var begin = b;
      shadowNode.innerHTML = text.substring(0, mid) + suffix;
      var sh = shadowNode.offsetHeight;

      if (sh <= th) {
        shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
        sh = shadowNode.offsetHeight;

        if (sh > th || mid === begin) {
          return mid;
        }

        begin = mid;

        if (end - begin === 1) {
          mid = 1 + begin;
        } else {
          mid = Math.floor((end - begin) / 2) + begin;
        }

        return _this.bisection(th, mid, begin, end, text, shadowNode);
      }

      if (mid - 1 < 0) {
        return mid;
      }

      shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
      sh = shadowNode.offsetHeight;

      if (sh <= th) {
        return mid - 1;
      }

      end = mid;
      mid = Math.floor((end - begin) / 2) + begin;
      return _this.bisection(th, mid, begin, end, text, shadowNode);
    };

    _this.handleRoot = function (n) {
      _this.root = n;
    };

    _this.handleContent = function (n) {
      _this.content = n;
    };

    _this.handleNode = function (n) {
      _this.node = n;
    };

    _this.handleShadow = function (n) {
      _this.shadow = n;
    };

    _this.handleShadowChildren = function (n) {
      _this.shadowChildren = n;
    };

    return _this;
  }

  _createClass(Ellipsis, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.node) {
        this.computeLine();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(perProps) {
      var lines = this.props.lines;

      if (lines !== perProps.lines) {
        this.computeLine();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _this$state = this.state,
          text = _this$state.text,
          targetCount = _this$state.targetCount;

      var _this$props = this.props,
          children = _this$props.children,
          lines = _this$props.lines,
          length = _this$props.length,
          className = _this$props.className,
          tooltip = _this$props.tooltip,
          fullWidthRecognition = _this$props.fullWidthRecognition,
          restProps = _objectWithoutProperties(_this$props, _excluded2);

      var cls = (0, _classnames["default"])(_index["default"].ellipsis, className, (_classNames = {}, _defineProperty(_classNames, _index["default"].lines, lines && !isSupportLineClamp), _defineProperty(_classNames, _index["default"].lineClamp, lines && isSupportLineClamp), _classNames));

      if (!lines && !length) {
        return /*#__PURE__*/_react["default"].createElement("span", _extends({
          className: cls
        }, restProps), children);
      } // length


      if (!lines) {
        return /*#__PURE__*/_react["default"].createElement(EllipsisText, _extends({
          className: cls,
          length: length,
          text: children || '',
          tooltip: tooltip,
          fullWidthRecognition: fullWidthRecognition
        }, restProps));
      }

      var id = "antd-pro-ellipsis-".concat("".concat(new Date().getTime()).concat(Math.floor(Math.random() * 100))); // support document.body.style.webkitLineClamp

      if (isSupportLineClamp) {
        var style = "#".concat(id, "{-webkit-line-clamp:").concat(lines, ";-webkit-box-orient: vertical;}");

        var node = /*#__PURE__*/_react["default"].createElement("div", _extends({
          id: id,
          className: cls
        }, restProps), /*#__PURE__*/_react["default"].createElement("style", null, style), children);

        return getTooltip({
          tooltip: tooltip,
          overlayStyle: TooltipOverlayStyle,
          title: children,
          children: node
        });
      }

      var childNode = /*#__PURE__*/_react["default"].createElement("span", {
        ref: this.handleNode
      }, targetCount > 0 && text.substring(0, targetCount), targetCount > 0 && targetCount < text.length && '...');

      return /*#__PURE__*/_react["default"].createElement("div", _extends({}, restProps, {
        ref: this.handleRoot,
        className: cls
      }), /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.handleContent
      }, getTooltip({
        tooltip: tooltip,
        overlayStyle: TooltipOverlayStyle,
        title: text,
        children: childNode
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].shadow,
        ref: this.handleShadowChildren
      }, children), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].shadow,
        ref: this.handleShadow
      }, /*#__PURE__*/_react["default"].createElement("span", null, text))));
    }
  }]);

  return Ellipsis;
}(_react.Component);

exports["default"] = Ellipsis;