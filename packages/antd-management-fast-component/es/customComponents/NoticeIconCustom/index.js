import { _ as _extends } from '../../extends.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Tabs, Spin, Badge, Popover } from 'antd';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { BellOutlined } from '@ant-design/icons';
import NoticeList from './NoticeList.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../defineProperty.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TabPane = Tabs.TabPane;
var NoticeIcon = /*#__PURE__*/function (_PureComponent) {
  _inherits(NoticeIcon, _PureComponent);
  var _super = _createSuper(NoticeIcon);
  function NoticeIcon() {
    var _this;
    _classCallCheck(this, NoticeIcon);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.onItemClick = function (item, tabProps) {
      var onItemClick = _this.props.onItemClick;
      onItemClick(item, tabProps);
    };
    _this.onTabChange = function (tabType) {
      var onTabChange = _this.props.onTabChange;
      onTabChange(tabType);
    };
    return _this;
  }
  _createClass(NoticeIcon, [{
    key: "getNotificationBox",
    value: function getNotificationBox() {
      var _this2 = this;
      var _this$props = this.props,
        children = _this$props.children,
        loading = _this$props.loading,
        locale = _this$props.locale,
        _onClear = _this$props.onClear;
      if (!children) {
        return null;
      }
      var panes = React.Children.map(children, function (child) {
        var title = child.props.list && child.props.list.length > 0 ? "".concat(child.props.title, " (").concat(child.props.list.length, ")") : child.props.title;
        return /*#__PURE__*/React.createElement(TabPane, {
          tab: title,
          key: child.props.name
        }, /*#__PURE__*/React.createElement(NoticeList, _extends({}, child.props, {
          data: child.props.list,
          onClick: function onClick(item) {
            return _this2.onItemClick(item, child.props);
          },
          onClear: function onClear() {
            return _onClear(child.props.name);
          },
          title: child.props.title,
          locale: locale
        })));
      });
      return /*#__PURE__*/React.createElement(Spin, {
        spinning: loading
      }, /*#__PURE__*/React.createElement(Tabs, {
        className: styles.tabs,
        onChange: this.onTabChange
      }, panes));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        className = _this$props2.className,
        count = _this$props2.count,
        popupAlign = _this$props2.popupAlign,
        popupVisible = _this$props2.popupVisible,
        onPopupVisibleChange = _this$props2.onPopupVisibleChange,
        bell = _this$props2.bell;
      var noticeButtonClass = classNames(className, styles.noticeButton);
      var notificationBox = this.getNotificationBox();
      var NoticeBellIcon = bell || /*#__PURE__*/React.createElement(BellOutlined, {
        className: styles.icon
      });
      var trigger = /*#__PURE__*/React.createElement("span", {
        className: noticeButtonClass
      }, /*#__PURE__*/React.createElement(Badge, {
        count: count,
        style: {
          boxShadow: 'none'
        },
        className: styles.badge
      }, NoticeBellIcon));
      if (!notificationBox) {
        return trigger;
      }
      var popoverProps = {};
      if ('popupVisible' in this.props) {
        popoverProps.visible = popupVisible;
      }
      return /*#__PURE__*/React.createElement(Popover, _extends({
        placement: "bottomRight",
        content: notificationBox,
        popupClassName: styles.popover,
        trigger: "click",
        arrowPointAtCenter: true,
        popupAlign: popupAlign,
        onVisibleChange: onPopupVisibleChange
      }, popoverProps), trigger);
    }
  }]);
  return NoticeIcon;
}(PureComponent);
NoticeIcon.Tab = TabPane;
NoticeIcon.defaultProps = {
  onItemClick: function onItemClick() {},
  onPopupVisibleChange: function onPopupVisibleChange() {},
  onTabChange: function onTabChange() {},
  onClear: function onClear() {},
  loading: false,
  locale: {
    emptyText: 'No notifications',
    clear: 'Clear'
  },
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
};

export { NoticeIcon as default };
