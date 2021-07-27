"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["theme", "title", "subTitle", "total", "subTotal", "status", "suffix", "gap"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NumberInfo = function NumberInfo(_ref) {
  var theme = _ref.theme,
      title = _ref.title,
      subTitle = _ref.subTitle,
      total = _ref.total,
      subTotal = _ref.subTotal,
      status = _ref.status,
      suffix = _ref.suffix,
      gap = _ref.gap,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: (0, _classnames["default"])(_index["default"].numberInfo, _defineProperty({}, _index["default"]["numberInfo".concat(theme)], theme))
  }, rest), title && /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].numberInfoTitle,
    title: typeof title === 'string' ? title : ''
  }, title), subTitle && /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].numberInfoSubTitle,
    title: typeof subTitle === 'string' ? subTitle : ''
  }, subTitle), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].numberInfoValue,
    style: gap ? {
      marginTop: gap
    } : null
  }, /*#__PURE__*/_react["default"].createElement("span", null, total, suffix && /*#__PURE__*/_react["default"].createElement("em", {
    className: _index["default"].suffix
  }, suffix)), (status || subTotal) && /*#__PURE__*/_react["default"].createElement("span", {
    className: _index["default"].subTotal
  }, subTotal, status === 'up' && /*#__PURE__*/_react["default"].createElement(_icons.CaretUpFilled, null), status === 'down' && /*#__PURE__*/_react["default"].createElement(_icons.CaretDownOutlined, null))));
};

var _default = NumberInfo;
exports["default"] = _default;