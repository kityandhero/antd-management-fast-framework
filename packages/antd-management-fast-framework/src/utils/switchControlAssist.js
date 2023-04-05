import { getDispatch } from 'easy-soft-dva';
import {
  checkObjectIsNullOrEmpty,
  isArray,
  isEmptyArray,
  mergeTextMessage,
  promptTextBuilder,
} from 'easy-soft-utility';

/**
 * switch control assist
 */
export const switchControlAssist = {
  /**
   * open switch
   * @param {string} flag switch flag
   */
  open(flag) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::open',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/open',
      payload: { flag },
    });
  },
  /**
   * close switch
   * @param {string} flag switch flag
   */
  close(flag) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::close',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/close',
      payload: { flag },
    });
  },
  /**
   * remove switch
   * @param {string} flag switch flag
   */
  remove(flag) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::remove',
          promptTextBuilder.buildMustString({}),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/remove',
      payload: { flag },
    });
  },
  /**
   * open multi switch
   * @param {Array} flags switch flag
   */
  openMulti(flags) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::openMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/openMulti',
      payload: { flags },
    });
  },
  /**
   * close multi switch
   * @param {Array} flags switch flag
   */
  closeMulti(flags) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::closeMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/closeMulti',
      payload: { flags },
    });
  },
  /**
   * remove multi switch
   * @param {Array} flags switch flag
   */
  removeMulti(flags) {
    if (!isArray(flags) || isEmptyArray(flags)) {
      throw new Error(
        mergeTextMessage(
          'switchControlAssist::removeMulti',
          promptTextBuilder.buildMustArray({}),
          'must be string array, disallow empty array',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'switchControl/removeMulti',
      payload: { flags },
    });
  },
};
