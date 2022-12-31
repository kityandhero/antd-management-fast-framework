import { toNumber as toNumberLodash, toString as toStringLodash } from 'lodash';

/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toString(value) {
  return toStringLodash(value);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  const value = toNumberLodash(v);

  return Number.isNaN(value) ? 0 : value;
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
