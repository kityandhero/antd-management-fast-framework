"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.CURRENT = void 0;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable eslint-comments/disable-enable-pair */

/* eslint-disable import/no-mutable-exports */
var CURRENT = 'NULL';
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */

exports.CURRENT = CURRENT;

var renderAuthorize = function renderAuthorize(Authorized) {
  return function (currentAuthority) {
    if (currentAuthority) {
      if (typeof currentAuthority === 'function') {
        exports.CURRENT = CURRENT = currentAuthority();
      }

      if (Object.prototype.toString.call(currentAuthority) === '[object String]' || Array.isArray(currentAuthority)) {
        exports.CURRENT = CURRENT = currentAuthority;
      }
    } else {
      exports.CURRENT = CURRENT = 'NULL';
    }

    return Authorized;
  };
};

var _default = function _default(Authorized) {
  return renderAuthorize(Authorized);
};

exports["default"] = _default;