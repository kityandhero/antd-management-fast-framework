import { getDispatch } from 'easy-soft-dva';
import {
  checkObjectIsNullOrEmpty,
  isArray,
  isEmptyArray,
  mergeTextMessage,
  promptTextBuilder,
} from 'easy-soft-utility';

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

    const dispatch = getDispatch();

    return dispatch({
      type: 'menuControl/getActiveKey',
      payload: { flag, message },
    });
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

    const dispatch = getDispatch();

    dispatch({
      type: 'menuControl/setActiveKey',
      payload: { flag, name, message },
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

    const dispatch = getDispatch();

    dispatch({
      type: 'menuControl/removeMulti',
      payload: { flags, message },
    });
  },
};
