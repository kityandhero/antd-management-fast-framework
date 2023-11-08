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
  return `tab-active-key-${flag}`;
}

/**
 * tab control assist
 */
export const tabControlAssist = {
  /**
   * get tab active key
   * @param {string} flag tab flag
   */
  getActiveKey(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'tabControlAssist::getActiveKey',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const value = getCache({
      key: buildCacheKey(flag),
    });

    logTrace(
      mergeArrowText(...message, 'tabControlAssist::getActiveKey'),
      `tab flag "${flag}" value is "${value ?? ''}"`,
    );

    return value ?? '';

    // const dispatch = getDispatch();

    // return dispatch({
    //   type: 'tabControl/getActiveKey',
    //   payload: { flag, message },
    // });
  },
  /**
   * set tab active key
   * @param {string} flag tab flag
   */
  setActiveKey(flag, name, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'tabControlAssist::setActiveKey',
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
      type: 'tabControl/setActiveKey',
      payload: {
        flag,
        name: checkObjectIsNullOrEmpty(name) ? '' : name,
        message,
      },
    });
  },
  /**
   * remove tab
   * @param {string} flag tab flag
   */
  remove(flag, ...message) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'tabControlAssist::remove',
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
      type: 'tabControl/remove',
      payload: { flag, message },
    });
  },
  /**
   * remove multi tab
   * @param {Array} flags tab flag
   */
  removeMulti(flags, ...message) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'tabControlAssist::removeMulti',
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
      type: 'tabControl/removeMulti',
      payload: { flags, message },
    });
  },
};
