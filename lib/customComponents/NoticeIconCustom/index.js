"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/popover/style");

var _popover = _interopRequireDefault(require("antd/es/popover"));

require("antd/es/badge/style");

var _badge = _interopRequireDefault(require("antd/es/badge"));

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/tabs/style");

var _tabs = _interopRequireDefault(require("antd/es/tabs"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _NoticeList = _interopRequireDefault(require("./NoticeList"));

var _index = _interopRequireDefault(require("./index.less"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var TabPane = _tabs.default.TabPane;

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

      var panes = _react.default.Children.map(children, function (child) {
        var title = child.props.list && child.props.list.length > 0 ? "".concat(child.props.title, " (").concat(child.props.list.length, ")") : child.props.title;
        return /*#__PURE__*/_react.default.createElement(TabPane, {
          tab: title,
          key: child.props.name
        }, /*#__PURE__*/_react.default.createElement(_NoticeList.default, _extends({}, child.props, {
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

      return /*#__PURE__*/_react.default.createElement(_spin.default, {
        spinning: loading
      }, /*#__PURE__*/_react.default.createElement(_tabs.default, {
        className: _index.default.tabs,
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
      var noticeButtonClass = (0, _classnames.default)(className, _index.default.noticeButton);
      var notificationBox = this.getNotificationBox();

      var NoticeBellIcon = bell || /*#__PURE__*/_react.default.createElement(_icons.BellOutlined, {
        className: _index.default.icon
      });

      var trigger = /*#__PURE__*/_react.default.createElement("span", {
        className: noticeButtonClass
      }, /*#__PURE__*/_react.default.createElement(_badge.default, {
        count: count,
        style: {
          boxShadow: 'none'
        },
        className: _index.default.badge
      }, NoticeBellIcon));

      if (!notificationBox) {
        return trigger;
      }

      var popoverProps = {};

      if ('popupVisible' in this.props) {
        popoverProps.visible = popupVisible;
      }

      return /*#__PURE__*/_react.default.createElement(_popover.default, _extends({
        placement: "bottomRight",
        content: notificationBox,
        popupClassName: _index.default.popover,
        trigger: "click",
        arrowPointAtCenter: true,
        popupAlign: popupAlign,
        onVisibleChange: onPopupVisibleChange
      }, popoverProps), trigger);
    }
  }]);

  return NoticeIcon;
}(_react.PureComponent);

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
var _default = NoticeIcon;
exports.default = _default;