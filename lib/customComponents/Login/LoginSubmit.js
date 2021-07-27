"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/button/style");

function _button() {
  var data = _interopRequireDefault(require("antd/es/button"));

  _button = function _button() {
    return data;
  };

  return data;
}

require("antd/es/form/style");

function _form() {
  var data = _interopRequireDefault(require("antd/es/form"));

  _form = function _form() {
    return data;
  };

  return data;
}

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _classnames() {
  var data = _interopRequireDefault(require("classnames"));

  _classnames = function _classnames() {
    return data;
  };

  return data;
}

function _antd() {
  var data = require("antd");

  _antd = function _antd() {
    return data;
  };

  return data;
}

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FormItem = _form()["default"].Item;

var LoginSubmit = function LoginSubmit(_ref) {
  var className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  var clsString = (0, _classnames()["default"])(_index["default"].submit, className);
  return /*#__PURE__*/_react()["default"].createElement(FormItem, null, /*#__PURE__*/_react()["default"].createElement(_button()["default"], _extends({
    size: "large",
    className: clsString,
    type: "primary",
    htmlType: "submit"
  }, rest)));
};

var _default = LoginSubmit;
exports["default"] = _default;