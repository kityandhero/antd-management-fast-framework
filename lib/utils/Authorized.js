"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.reloadAuthorized = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _Authorized() {
  const data = _interopRequireDefault(require("@/components/Authorized"));

  _Authorized = function _Authorized() {
    return data;
  };

  return data;
}

var _authority = require("./authority");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-cycle

/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
let Authorized = (0, _Authorized().default)((0, _authority.getAuthority)()); // Reload the rights component

const reloadAuthorized = () => {
  Authorized = (0, _Authorized().default)((0, _authority.getAuthority)());
};
/**
 * hard code
 * block need it。
 */


exports.reloadAuthorized = reloadAuthorized;
window.reloadAuthorized = reloadAuthorized;
var _default = Authorized;
exports.default = _default;