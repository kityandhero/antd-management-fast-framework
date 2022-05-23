import { isString as isStringLodash } from 'lodash';

/**
 * check value is string
 */
export function isString(value) {
  return isStringLodash(value);
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
