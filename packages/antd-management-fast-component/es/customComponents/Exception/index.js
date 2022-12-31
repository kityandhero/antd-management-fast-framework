import { _ as _extends } from '../../extends.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { createElement } from 'react';
import config from './typeConfig.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["className", "backText", "linkElement", "type", "title", "desc", "img", "actions", "redirect"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Exception = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Exception, _React$PureComponent);
  var _super = _createSuper(Exception);
  function Exception() {
    var _this;
    _classCallCheck(this, Exception);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {};
    return _this;
  }
  _createClass(Exception, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        className = _this$props.className,
        backText = _this$props.backText,
        _this$props$linkEleme = _this$props.linkElement,
        linkElement = _this$props$linkEleme === void 0 ? 'a' : _this$props$linkEleme,
        type = _this$props.type,
        title = _this$props.title,
        desc = _this$props.desc,
        img = _this$props.img,
        actions = _this$props.actions,
        redirect = _this$props.redirect,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var pageType = type in config ? type : '404';
      var clsString = classNames(styles.exception, className);
      return /*#__PURE__*/React.createElement("div", _extends({
        className: clsString
      }, rest), /*#__PURE__*/React.createElement("div", {
        className: styles.imgBlock
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.imgEle,
        style: {
          backgroundImage: "url(".concat(img || config[pageType].img, ")")
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: styles.content
      }, /*#__PURE__*/React.createElement("h1", null, title || config[pageType].title), /*#__PURE__*/React.createElement("div", {
        className: styles.desc
      }, desc || config[pageType].desc), /*#__PURE__*/React.createElement("div", {
        className: styles.actions
      }, actions || /*#__PURE__*/createElement(linkElement, {
        to: redirect,
        href: redirect
      }, /*#__PURE__*/React.createElement(Button, {
        type: "primary"
      }, backText)))));
    }
  }]);
  return Exception;
}(React.PureComponent);

export { Exception as default };
