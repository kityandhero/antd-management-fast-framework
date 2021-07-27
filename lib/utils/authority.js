"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthority = getAuthority;
exports.getAllAuthority = getAllAuthority;
exports.checkIsSuper = checkIsSuper;
exports.checkHasAuthority = checkHasAuthority;
exports.setAuthority = setAuthority;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _accessWayCollection() {
  const data = _interopRequireDefault(require("@/customConfig/accessWayCollection"));

  _accessWayCollection = function _accessWayCollection() {
    return data;
  };

  return data;
}

var _tools = require("./tools");

var _Authorized = require("./Authorized");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line import/no-cycle
// use localStorage to store the authority info, which might be sent from server in actual project.
function getAuthority(str) {
  // return getStringFromLocalStorage('antd-pro-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? (0, _tools.getStringFromLocalStorage)('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority || ['admin'];
}

function getAllAuthorityCore() {
  // return getStringFromLocalStorage('antd-pro-authority') || ['admin', 'user'];
  const authorityString = (0, _tools.getStringFromLocalStorage)('antd-pro-authority'); // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  return (0, _tools.isArray)(authority) ? authority : [];
}

function getAllAuthority() {
  return getAllAuthorityCore();
}

function checkIsSuper() {
  const list = getAllAuthorityCore();

  const superAuth = _accessWayCollection().default.super;

  const isSuper = (list || []).find(o => o === superAuth) || '';

  if (isSuper === superAuth) {
    return true;
  }

  return false;
}

function checkHasAuthority(auth) {
  const list = getAllAuthorityCore();

  const superAuth = _accessWayCollection().default.super;

  const isSuper = (list || []).find(o => o === superAuth);

  if (isSuper === superAuth) {
    return true;
  }

  const v = (list || []).find(o => o === auth);
  return v !== undefined;
}

function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  (0, _tools.saveJsonToLocalStorage)('antd-pro-authority', proAuthority); // auto reload

  (0, _Authorized.reloadAuthorized)();
}