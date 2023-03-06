import React from 'react';

import {
  checkInCollection,
  isArray,
  isEqual,
  isFunction,
  isObject,
} from 'easy-soft-utility';

export function filterUpdateModel(properties, ignoreCompareKeyCollection = []) {
  const result = { ...properties };

  delete result.loading;

  for (const o of Object.entries(result)) {
    const [k, v] = o;

    if (
      isFunction(v) ||
      // React.isValidElement(v) ||
      checkInCollection(ignoreCompareKeyCollection, k) ||
      (isObject(v) && !!v.fromRemote)
    ) {
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
 */
export function shallowUpdateEqual(a, b) {
  return isEqual(a, b);
}