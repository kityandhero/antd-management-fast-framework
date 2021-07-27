"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlobalFooter = function GlobalFooter(_ref) {
  var className = _ref.className,
      links = _ref.links,
      copyright = _ref.copyright;
  var clsString = (0, _classnames.default)(_index.default.globalFooter, className);
  return /*#__PURE__*/_react.default.createElement("footer", {
    className: clsString
  }, links && /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.links
  }, links.map(function (link) {
    return /*#__PURE__*/_react.default.createElement("a", {
      key: link.key,
      title: link.key,
      target: link.blankTarget ? '_blank' : '_self',
      href: link.href
    }, link.title);
  })), copyright && /*#__PURE__*/_react.default.createElement("div", {
    className: _index.default.copyright
  }, copyright));
};

var _default = GlobalFooter;
exports.default = _default;