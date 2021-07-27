"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MiniProgress = function MiniProgress(_ref) {
  var targetLabel = _ref.targetLabel,
      target = _ref.target,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'rgb(19, 194, 194)' : _ref$color,
      strokeWidth = _ref.strokeWidth,
      percent = _ref.percent;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].miniProgress
  }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    title: targetLabel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].target,
    style: {
      left: target ? "".concat(target, "%") : undefined
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      backgroundColor: color || undefined
    }
  }), /*#__PURE__*/_react["default"].createElement("span", {
    style: {
      backgroundColor: color || undefined
    }
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].progressWrap
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].progress,
    style: {
      backgroundColor: color || undefined,
      width: percent ? "".concat(percent, "%") : undefined,
      height: strokeWidth || undefined
    }
  })));
};

var _default = MiniProgress;
exports["default"] = _default;