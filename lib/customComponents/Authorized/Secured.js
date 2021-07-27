"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isComponentClass = void 0;

var _react = _interopRequireDefault(require("react"));

var _CheckPermissions = _interopRequireDefault(require("./CheckPermissions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-cycle

/**
 * 默认不能访问任何页面
 * default is "NULL"
 */
var Exception403 = function Exception403() {
  return 403;
};

var isComponentClass = function isComponentClass(component) {
  if (!component) return false;
  var proto = Object.getPrototypeOf(component);
  if (proto === _react["default"].Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
}; // Determine whether the incoming component has been instantiated
// AuthorizedRoute is already instantiated
// Authorized  render is already instantiated, children is no instantiated
// Secured is not instantiated


exports.isComponentClass = isComponentClass;

var checkIsInstantiation = function checkIsInstantiation(target) {
  if (isComponentClass(target)) {
    var Target = target;
    return function (props) {
      return /*#__PURE__*/_react["default"].createElement(Target, props);
    };
  }

  if ( /*#__PURE__*/_react["default"].isValidElement(target)) {
    return function (props) {
      return /*#__PURE__*/_react["default"].cloneElement(target, props);
    };
  }

  return function () {
    return target;
  };
};
/**
 * 用于判断是否拥有权限访问此 view 权限
 * authority 支持传入 string, () => boolean | Promise
 * e.g. 'user' 只有 user 用户能访问
 * e.g. 'user,admin' user 和 admin 都能访问
 * e.g. ()=>boolean 返回true能访问,返回false不能访问
 * e.g. Promise  then 能访问   catch不能访问
 * e.g. authority support incoming string, () => boolean | Promise
 * e.g. 'user' only user user can access
 * e.g. 'user, admin' user and admin can access
 * e.g. () => boolean true to be able to visit, return false can not be accessed
 * e.g. Promise then can not access the visit to catch
 * @param {string | function | Promise} authority
 * @param {ReactNode} error 非必需参数
 */


var authorize = function authorize(authority, error) {
  /**
   * conversion into a class
   * 防止传入字符串时找不到staticContext造成报错
   * String parameters can cause staticContext not found error
   */
  var classError = false;

  if (error) {
    classError = function classError() {
      return error;
    };
  }

  if (!authority) {
    throw new Error('authority is required');
  }

  return function decideAuthority(target) {
    var component = (0, _CheckPermissions["default"])(authority, target, classError || Exception403);
    return checkIsInstantiation(component);
  };
};

var _default = authorize;
exports["default"] = _default;