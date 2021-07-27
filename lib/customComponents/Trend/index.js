"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["colorful", "reverseColor", "flag", "icon", "children", "className"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Trend = function Trend(_ref) {
  var _classNames;

  var _ref$colorful = _ref.colorful,
      colorful = _ref$colorful === void 0 ? true : _ref$colorful,
      _ref$reverseColor = _ref.reverseColor,
      reverseColor = _ref$reverseColor === void 0 ? false : _ref$reverseColor,
      flag = _ref.flag,
      icon = _ref.icon,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, _excluded);

  var classString = (0, _classnames.default)(_index.default.trendItem, (_classNames = {}, _defineProperty(_classNames, _index.default.trendItemGrey, !colorful), _defineProperty(_classNames, _index.default.reverseColor, reverseColor && colorful), _classNames), className);
  return /*#__PURE__*/_react.default.createElement("div", _extends({}, rest, {
    className: classString,
    title: typeof children === 'string' ? children : ''
  }), /*#__PURE__*/_react.default.createElement("span", null, children), flag && /*#__PURE__*/_react.default.createElement("span", {
    className: _index.default[flag]
  }, icon));
};

var _default = Trend;
exports.default = _default;