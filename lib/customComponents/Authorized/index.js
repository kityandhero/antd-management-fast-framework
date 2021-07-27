"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Authorized = _interopRequireDefault(require("./Authorized"));

var _Secured = _interopRequireDefault(require("./Secured"));

var _CheckPermissions = _interopRequireDefault(require("./CheckPermissions"));

var _renderAuthorize = _interopRequireDefault(require("./renderAuthorize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Authorized["default"].Secured = _Secured["default"];
_Authorized["default"].check = _CheckPermissions["default"];
var RenderAuthorize = (0, _renderAuthorize["default"])(_Authorized["default"]);
var _default = RenderAuthorize;
exports["default"] = _default;