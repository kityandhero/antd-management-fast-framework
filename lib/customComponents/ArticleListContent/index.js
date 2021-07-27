"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("@/utils/constants");

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ArticleListContent = function ArticleListContent(_ref) {
  var _ref$data = _ref.data,
      content = _ref$data.content,
      updatedAt = _ref$data.updatedAt,
      avatar = _ref$data.avatar,
      owner = _ref$data.owner,
      href = _ref$data.href;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].listContent
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].description
  }, content), /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].extra
  }, /*#__PURE__*/_react["default"].createElement(_avatar["default"], {
    src: avatar,
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement("a", {
    href: href
  }, owner), " \u53D1\u5E03\u5728 ", /*#__PURE__*/_react["default"].createElement("a", {
    href: href
  }, href), /*#__PURE__*/_react["default"].createElement("em", null, (0, _moment["default"])(updatedAt).format(_constants.datetimeFormat.yearMonthDayHourMinute))));
};

var _default = ArticleListContent;
exports["default"] = _default;