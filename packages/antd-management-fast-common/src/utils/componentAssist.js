import React from 'react';

import {
  checkInCollection,
  isArray,
  isEqual,
  isFunction,
  isObject,
} from 'easy-soft-utility';

/**
 * filter and update model.
 * @function
 * @param {string} properties the target will update.
 * @param {Array} [ignoreCompareKeyCollection = []] ignore compare key collection.
 */
export function filterUpdateModel(properties, ignoreCompareKeyCollection = []) {
  const result = { ...properties };

  delete result.loading;

  delete result.children;

  for (const o of Object.entries(result)) {
    const [k, v] = o;

    if (isFunction(v) || checkInCollection(ignoreCompareKeyCollection, k)) {
      delete result[k];

      continue;
    }

    if (React.isValidElement(v)) {
      continue;
    }

    if (isArray(v)) {
      result[k] = v.map((one) => {
        return filterUpdateModel(one, []);
      });
    } else {
      if (isObject(v)) {
        result[k] = filterUpdateModel(v, []);
      }
    }
  }

  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false.
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 * @function
 * @param {Object} a compare data.
 * @param {Object} b other compare data.
 */
export function shallowUpdateEqual(a, b) {
  return isEqual(a, b);
}
