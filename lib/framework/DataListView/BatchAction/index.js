"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/menu/style");

var _menu = _interopRequireDefault(require("antd/es/menu"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _context = require("antd/lib/config-provider/context");

var _IconInfo = _interopRequireDefault(require("../../../customComponents/IconInfo"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 默认的 index 列容器，提供一个好看的 index
 * @param param0
 */
var DropdownButton = function DropdownButton(_ref) {
  var children = _ref.children,
      _ref$menus = _ref.menus,
      menus = _ref$menus === void 0 ? [] : _ref$menus,
      onSelect = _ref.onSelect,
      style = _ref.style,
      disabled = _ref.disabled;
  return /*#__PURE__*/_react.default.createElement(_context.ConfigConsumer, null, function () {
    var menu = /*#__PURE__*/_react.default.createElement(_menu.default, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
        key: item.key,
        disabled: (item.disabled || null) == null ? false : item.disabled
      }, /*#__PURE__*/_react.default.createElement(_IconInfo.default, {
        icon: item.icon,
        text: item.name
      }));
    }));

    return /*#__PURE__*/_react.default.createElement(_dropdown.default, {
      overlay: menu,
      className: _index.default.batchAction,
      disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(_button.default, {
      style: style
    }, children, " ", /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)));
  });
};

var BatchAction = function BatchAction(_ref2) {
  var style = _ref2.style,
      onSelect = _ref2.onSelect,
      _ref2$menus = _ref2.menus,
      menus = _ref2$menus === void 0 ? [] : _ref2$menus,
      disabled = _ref2.disabled;
  return /*#__PURE__*/_react.default.createElement(_context.ConfigConsumer, null, function () {
    var menu = /*#__PURE__*/_react.default.createElement(_menu.default, {
      onClick: function onClick(params) {
        return onSelect && onSelect(params.key);
      }
    }, menus.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(_menu.default.Item, {
        key: item.key
      }, item.name);
    }));

    return /*#__PURE__*/_react.default.createElement(_dropdown.default, {
      overlay: menu,
      className: _index.default.batchAction,
      disabled: disabled
    }, /*#__PURE__*/_react.default.createElement("a", {
      style: style
    }, /*#__PURE__*/_react.default.createElement(_icons.EllipsisOutlined, null)));
  });
};

BatchAction.Button = DropdownButton;
var _default = BatchAction;
exports.default = _default;