import { replace as replaceLodash, trim as trimLodash } from 'lodash';

export function isArray(value) {
  return Array.isArray(value);
}

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
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
