import { replace as replaceLodash, trim as trimLodash } from 'lodash';
import { isArray } from './typeCheck';

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
}

export function trim(source) {
  return trimLodash(source);
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
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
