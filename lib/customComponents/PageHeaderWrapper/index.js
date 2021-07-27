"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _umi = require("umi");

var _tools = require("@/utils/tools");

var _PageHeader = _interopRequireDefault(require("@/components/PageHeader"));

var _MenuContext = _interopRequireDefault(require("@/layouts/MenuContext"));

var _GridContent = _interopRequireDefault(require("./GridContent"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["children", "contentWidth", "wrapperClassName", "top"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PageHeaderWrapper = function PageHeaderWrapper(_ref) {
  var children = _ref.children,
      contentWidth = _ref.contentWidth,
      wrapperClassName = _ref.wrapperClassName,
      top = _ref.top,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '-24px -24px 0'
    },
    className: wrapperClassName
  }, top, /*#__PURE__*/_react.default.createElement(_MenuContext.default.Consumer, null, function (value) {
    return /*#__PURE__*/_react.default.createElement(_PageHeader.default, _extends({
      wide: contentWidth === 'Fixed',
      home: (0, _tools.formatMessage)({
        id: 'menu.home'
      })
    }, value, {
      key: "pageheader"
    }, restProps, {
      linkElement: _umi.Link,
      itemRender: function itemRender(item) {
        if (item.locale) {
          return (0, _tools.formatMessage)({
            id: item.locale
          });
        }

        return item.title;
      }
    }));
  }), children ? /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.content
  }, /*#__PURE__*/_react.default.createElement(_GridContent.default, null, children)) : null);
};

var _default = (0, _umi.connect)(function (_ref2) {
  var setting = _ref2.setting;
  return {
    contentWidth: setting.contentWidth
  };
})(PageHeaderWrapper);

exports.default = _default;