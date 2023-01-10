import {
  toLower as toLowerLodash,
  toNumber as toNumberLodash,
  toString as toStringLodash,
  toUpper as toUpperLodash,
} from 'lodash';

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

export function toUpper(value) {
  return toUpperLodash(value);
}

export function toLower(value) {
  return toLowerLodash(value);
}

export function toBoolean(value) {
  return !!value;
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
