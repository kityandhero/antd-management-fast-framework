import { toString as toString$1, toNumber as toNumber$1 } from 'lodash';

/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */
function toString(value) {
  return toString$1(value);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
function toNumber(v) {
  var value = toNumber$1(v);
  return Number.isNaN(value) ? 0 : value;
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

export { empty, toNumber, toString };
