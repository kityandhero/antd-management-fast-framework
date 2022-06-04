import {
  replace as replaceLodash,
  trim as trimLodash,
  upperFirst as upperFirstLodash,
} from 'lodash';
import { isArray } from './typeCheck';

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
}

export function trim(source) {
  return trimLodash(source);
}

export function upperFirst(source) {
  return upperFirstLodash(source);
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}

export function isBrowser() {
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
}

/**
 * 检测目标是否在数组址之中
 */
export function inCollection(collection, value) {
  let result = false;

  if (!isArray(collection)) {
    return result;
  }

  collection.some((o) => {
    if (o === value) {
      result = true;

      return true;
    }

    return false;
  });

  return result;
}

/**
 * base64解码
 */
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');

  commonContent = Buffer.from(commonContent, 'base64').toString();

  return commonContent;
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');

  return base64Content;
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
