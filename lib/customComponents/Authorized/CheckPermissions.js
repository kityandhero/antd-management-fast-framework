"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.checkPermissions = void 0;

var _react = _interopRequireDefault(require("react"));

var _tools = require("@/utils/tools");

var _renderAuthorize = require("./renderAuthorize");

var _PromiseRender = _interopRequireDefault(require("./PromiseRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 | Permission judgment } authority
 * @param { 你的权限 | Your permission description } currentAuthority
 * @param { 通过的组件 | Passing components } target
 * @param { 未通过的组件 | no pass components } Exception
 */
var checkPermissions = function checkPermissions(authority, currentAuthority, target, Exception) {
  // 没有判定权限.默认查看所有
  // Retirement authority, return target;
  if (!authority) {
    return target;
  } // 数组处理


  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(function (item) {
        return authority.includes(item);
      })) {
        return target;
      }
    } else if (authority.includes(currentAuthority)) {
      return target;
    }

    return Exception;
  } // string 处理


  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(function (item) {
        return authority === item;
      })) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }

    return Exception;
  } // Promise 处理


  if (authority instanceof Promise) {
    return /*#__PURE__*/_react["default"].createElement(_PromiseRender["default"], {
      ok: target,
      error: Exception,
      promise: authority
    });
  } // Function 处理


  if (typeof authority === 'function') {
    try {
      var bool = authority(currentAuthority); // 函数执行后返回值是 Promise

      if (bool instanceof Promise) {
        return /*#__PURE__*/_react["default"].createElement(_PromiseRender["default"], {
          ok: target,
          error: Exception,
          promise: bool
        });
      }

      if (bool) {
        return target;
      }

      return Exception;
    } catch (error) {
      (0, _tools.recordObject)(error);
      throw error;
    }
  }

  throw new Error('unsupported parameters');
};

exports.checkPermissions = checkPermissions;

function check(authority, target, Exception) {
  return checkPermissions(authority, _renderAuthorize.CURRENT, target, Exception);
}

var _default = check;
exports["default"] = _default;