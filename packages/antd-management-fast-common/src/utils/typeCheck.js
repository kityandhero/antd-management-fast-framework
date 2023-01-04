import {
  isBoolean as isBooleanLodash,
  isDate as isDateLodash,
  isEqual as isEqualLodash,
  isFunction as isFunctionLodash,
  isNull as isNullLodash,
  isObject as isObjectLodash,
  isString as isStringLodash,
  isUndefined as isUndefinedLodash,
} from 'lodash';

const reg =
  // eslint-disable-next-line no-useless-escape
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path) => reg.test(path);

export function isObject(o) {
  return isObjectLodash(o);
}

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等.
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性, 不包括继承的和可枚举的属性.  不支持函数和DOM节点比较.
 */
export function isEqual(value, other) {
  return isEqualLodash(value, other);
}

/**
 * check value is string
 */
export function isString(value) {
  return isStringLodash(value);
}

export function isFunction(value) {
  return isFunctionLodash(value);
}

export function isBoolean(value) {
  return isBooleanLodash(value);
}

/**
 * check value is undefined
 */
export function isUndefined(value) {
  return isUndefinedLodash(value);
}

/**
 * check value is null
 */
export function isNull(value) {
  return isNullLodash(value);
}

/**
 * check value is date
 */
export function isDate(value) {
  return isDateLodash(value);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^[0-9]*$/;
  const re = new RegExp(regular);
  return re.test(str);
}

export function isArray(value) {
  return Array.isArray(value);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
