"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/result/style");

var _result = _interopRequireDefault(require("antd/es/result"));

var _react = _interopRequireDefault(require("react"));

var _CheckPermissions = _interopRequireDefault(require("./CheckPermissions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Authorized = function Authorized(_ref) {
  var children = _ref.children,
      authority = _ref.authority,
      _ref$noMatch = _ref.noMatch,
      noMatch = _ref$noMatch === void 0 ? /*#__PURE__*/_react["default"].createElement(_result["default"], {
    status: "403",
    title: "403",
    subTitle: "Sorry, you are not authorized to access this page."
  }) : _ref$noMatch;
  var childrenRender = typeof children === 'undefined' ? null : children;
  var dom = (0, _CheckPermissions["default"])(authority, childrenRender, noMatch);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, dom);
};

var _default = Authorized;
exports["default"] = _default;