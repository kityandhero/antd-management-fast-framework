"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["title", "children", "last", "block", "grid"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StandardFormRow = function StandardFormRow(_ref) {
  var _classNames;

  var title = _ref.title,
      children = _ref.children,
      last = _ref.last,
      block = _ref.block,
      grid = _ref.grid,
      rest = _objectWithoutProperties(_ref, _excluded);

  var cls = (0, _classnames.default)(_index.default.standardFormRow, (_classNames = {}, _defineProperty(_classNames, _index.default.standardFormRowBlock, block), _defineProperty(_classNames, _index.default.standardFormRowLast, last), _defineProperty(_classNames, _index.default.standardFormRowGrid, grid), _classNames));
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: cls
  }, rest), title && /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.label
  }, /*#__PURE__*/_react.default.createElement("span", null, title)), /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.content
  }, children));
};

var _default = StandardFormRow;
exports.default = _default;