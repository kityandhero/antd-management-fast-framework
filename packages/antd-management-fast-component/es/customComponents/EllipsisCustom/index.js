import { _ as _extends } from '../../extends.js';
import { _ as _defineProperty } from '../../defineProperty.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { Component } from 'react';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["text", "length", "tooltip", "fullWidthRecognition"],
  _excluded2 = ["children", "lines", "length", "className", "tooltip", "fullWidthRecognition", "removeChildren", "extraContent"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
var EllipsisText = function EllipsisText(_ref) {
  var text = _ref.text,
    length = _ref.length,
    tooltip = _ref.tooltip,
    fullWidthRecognition = _ref.fullWidthRecognition,
    other = _objectWithoutProperties(_ref, _excluded);
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  var textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  if (textLength <= length || length < 0) {
    return /*#__PURE__*/React.createElement("span", other, text);
  }
  var tail = '...';
  var displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }
  if (tooltip) {
    return /*#__PURE__*/React.createElement(Tooltip, {
      overlayStyle: TooltipOverlayStyle,
      title: text
    }, /*#__PURE__*/React.createElement("span", null, displayText, tail));
  }
  return /*#__PURE__*/React.createElement("span", other, displayText, tail);
};
var EllipsisCustom = /*#__PURE__*/function (_Component) {
  _inherits(EllipsisCustom, _Component);
  var _super = _createSuper(EllipsisCustom);
  function EllipsisCustom() {
    var _this;
    _classCallCheck(this, EllipsisCustom);
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
        }

        // bisection
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
  _createClass(EllipsisCustom, [{
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
        removeChildren = _this$props.removeChildren,
        extraContent = _this$props.extraContent,
        restProps = _objectWithoutProperties(_this$props, _excluded2);
      var cls = classNames(styles.ellipsis, className, (_classNames = {}, _defineProperty(_classNames, styles.lines, lines && !isSupportLineClamp), _defineProperty(_classNames, styles.lineClamp, lines && isSupportLineClamp), _classNames));
      if (!lines && !length) {
        return /*#__PURE__*/React.createElement("span", _extends({
          className: cls
        }, restProps), children);
      }

      // length
      if (!lines) {
        return /*#__PURE__*/React.createElement(EllipsisText, _extends({
          className: cls,
          length: length,
          text: children || '',
          tooltip: tooltip,
          fullWidthRecognition: fullWidthRecognition
        }, restProps));
      }
      var id = "antd-pro-ellipsis-".concat("".concat(new Date().getTime()).concat(Math.floor(Math.random() * 100)));

      // support document.body.style.webkitLineClamp
      if (isSupportLineClamp) {
        var style = "#".concat(id, "{-webkit-line-clamp:").concat(lines, ";-webkit-box-orient: vertical;}");
        var node = /*#__PURE__*/React.createElement("div", _extends({
          id: id,
          className: cls
        }, restProps), /*#__PURE__*/React.createElement("style", null, style), removeChildren ? null : children, extraContent);
        return tooltip ? /*#__PURE__*/React.createElement(Tooltip, _extends({}, tooltip, {
          overlayStyle: TooltipOverlayStyle,
          title: children
        }), node) : node;
      }
      var childNode = /*#__PURE__*/React.createElement("span", {
        ref: this.handleNode
      }, targetCount > 0 && text.substring(0, targetCount), targetCount > 0 && targetCount < text.length && '...');
      return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
        ref: this.handleRoot,
        className: cls
      }), /*#__PURE__*/React.createElement("div", {
        ref: this.handleContent
      }, tooltip ? /*#__PURE__*/React.createElement(Tooltip, _extends({}, tooltip, {
        overlayStyle: TooltipOverlayStyle,
        title: text
      }), childNode) : /*#__PURE__*/React.createElement("div", null, childNode), /*#__PURE__*/React.createElement("div", {
        className: styles.shadow,
        ref: this.handleShadowChildren
      }, children), /*#__PURE__*/React.createElement("div", {
        className: styles.shadow,
        ref: this.handleShadow
      }, /*#__PURE__*/React.createElement("span", null, text))));
    }
  }]);
  return EllipsisCustom;
}(Component);

export { cutStrByFullLength, EllipsisCustom as default, getStrFullLength };
