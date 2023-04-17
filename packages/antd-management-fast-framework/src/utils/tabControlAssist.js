import { getDispatch } from 'easy-soft-dva';
import {
  checkObjectIsNullOrEmpty,
  isArray,
  isEmptyArray,
  mergeTextMessage,
  promptTextBuilder,
} from 'easy-soft-utility';

/**
 * tab control assist
 */
export const tabControlAssist = {
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

    const dispatch = getDispatch();

    dispatch({
      type: 'tabControl/setActiveKey',
      payload: { flag, name, message },
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

    const dispatch = getDispatch();

    dispatch({
      type: 'tabControl/removeMulti',
      payload: { flags, message },
    });
  },
};
