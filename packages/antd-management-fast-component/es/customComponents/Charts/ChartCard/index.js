import { _ as _extends } from '../../../extends.js';
import { _ as _objectWithoutProperties } from '../../../objectWithoutProperties.js';
import { _ as _defineProperty } from '../../../defineProperty.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { a as _typeof } from '../../../toPropertyKey.js';
import { Card } from 'antd';
import classNames from 'classnames';
import React from 'react';
import '../../../_commonjsHelpers.js';

var styles = undefined;

var _excluded = ["loading"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
      totalDom = /*#__PURE__*/React.createElement("div", {
        className: styles.total
      }, total());
      break;
    default:
      totalDom = /*#__PURE__*/React.createElement("div", {
        className: styles.total
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
      return /*#__PURE__*/React.createElement("div", {
        className: styles.chartCard
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames(styles.chartTop, _defineProperty({}, styles.chartTopMargin, !children && !footer))
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.avatar
      }, avatar), /*#__PURE__*/React.createElement("div", {
        className: styles.metaWrap
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.meta
      }, /*#__PURE__*/React.createElement("span", {
        className: styles.title
      }, title), /*#__PURE__*/React.createElement("span", {
        className: styles.action
      }, action)), renderTotal(total))), children && /*#__PURE__*/React.createElement("div", {
        className: styles.content,
        style: {
          height: contentHeight || 'auto'
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.contentFixed
      }, children)), footer && /*#__PURE__*/React.createElement("div", {
        className: classNames(styles.footer, _defineProperty({}, styles.footerMargin, !children))
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
        rest = _objectWithoutProperties(_this$props2, _excluded);
      return /*#__PURE__*/React.createElement(Card, _extends({
        loading: loading,
        bodyStyle: {
          padding: '20px 24px 8px 24px'
        }
      }, rest), this.renderContent());
    }
  }]);
  return ChartCard;
}(React.Component);

export { ChartCard as default };
