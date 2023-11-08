import { getDispatch } from 'easy-soft-dva';
import {
  checkObjectIsNullOrEmpty,
  deleteCache,
  getCache,
  isArray,
  isEmptyArray,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  promptTextBuilder,
  setCache,
} from 'easy-soft-utility';

// 缓存和dva同时使用, 缓存用于主控交互控制, dva用于被动交互触发

function buildCacheKey(flag) {
  return `menu-active-key-${flag}`;
}

/**
 * menu control assist
 */
export const menuControlAssist = {
  /**
   * get menu active key
   * @param {string} flag menu flag
   */
  getActiveKey(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'menuControlAssist::getActiveKey',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const value = getCache({
      key: buildCacheKey(flag),
    });

    logTrace(
      mergeArrowText(...message, 'menuControlAssist::getActiveKey'),
      `tab flag "${flag}" value is "${value ?? ''}"`,
    );

    return value ?? '';

    // const dispatch = getDispatch();

    // return dispatch({
    //   type: 'menuControl/getActiveKey',
    //   payload: { flag, message },
    // });
  },
  /**
   * set menu active key
   * @param {string} flag menu flag
   */
  setActiveKey(flag, name, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'menuControlAssist::setActiveKey',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    setCache({
      key: buildCacheKey(flag),
      value: name,
    });

    const dispatch = getDispatch();

    dispatch({
      type: 'menuControl/setActiveKey',
      payload: {
        flag,
        name: checkObjectIsNullOrEmpty(name) ? '' : name,
        message,
      },
    });
  },
  /**
   * remove menu
   * @param {string} flag menu flag
   */
  remove(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'menuControlAssist::remove',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    deleteCache({
      key: buildCacheKey(flag),
    });

    const dispatch = getDispatch();

    dispatch({
      type: 'menuControl/remove',
      payload: { flag, message },
    });
  },
  /**
   * remove multi menu
   * @param {Array} flags menu flag
   */
  removeMulti(flags, ...message) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'menuControlAssist::removeMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    if (isArray(flags) && !isEmptyArray(flags)) {
      for (const flag of flags) {
        if (checkObjectIsNullOrEmpty(flag)) {
          continue;
        }

        deleteCache({
          key: buildCacheKey(flag),
        });
      }
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'menuControl/removeMulti',
      payload: { flags, message },
    });
  },
};
