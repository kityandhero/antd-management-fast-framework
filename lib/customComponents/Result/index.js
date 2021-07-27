"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Result;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["className", "type", "title", "description", "extra", "actions"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Result(_ref) {
  var className = _ref.className,
      type = _ref.type,
      title = _ref.title,
      description = _ref.description,
      extra = _ref.extra,
      actions = _ref.actions,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var iconMap = {
    error: /*#__PURE__*/_react["default"].createElement(_icons.ClockCircleFilled, {
      className: _index["default"].error
    }),
    success: /*#__PURE__*/_react["default"].createElement(_icons.CheckCircleFilled, {
      className: _index["default"].success
    })
  };
  var clsString = (0, _classnames["default"])(_index["default"].result, className);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: clsString
  }, restProps), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].icon
  }, iconMap[type]), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].title
  }, title), description && /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].description
  }, description), extra && /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].extra
  }, extra), actions && /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].actions
  }, actions));
}