import { isObject as isObject$1, isString as isString$1, isFunction as isFunction$1, isBoolean as isBoolean$1, isUndefined as isUndefined$1, isNull as isNull$1, isDate as isDate$1 } from 'lodash';

var reg =
// eslint-disable-next-line no-useless-escape
/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
var isUrl = function isUrl(path) {
  return reg.test(path);
};
function isObject(o) {
  return isObject$1(o);
}

/**
 * check value is string
 */
function isString(value) {
  return isString$1(value);
}
function isFunction(value) {
  return isFunction$1(value);
}
function isBoolean(value) {
  return isBoolean$1(value);
}

/**
 * check value is undefined
 */
function isUndefined(value) {
  return isUndefined$1(value);
}

/**
 * check value is null
 */
function isNull(value) {
  return isNull$1(value);
}

/**
 * check value is date
 */
function isDate(value) {
  return isDate$1(value);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
function isNumber(v) {
  var str = "".concat(typeof v === 'undefined' ? null : v);
  if (str === '') {
    return false;
  }
  var regular = /^[0-9]*$/;
  var re = new RegExp(regular);
  return re.test(str);
}
function isArray(value) {
  return Array.isArray(value);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { empty, isArray, isBoolean, isDate, isFunction, isNull, isNumber, isObject, isString, isUndefined, isUrl };
