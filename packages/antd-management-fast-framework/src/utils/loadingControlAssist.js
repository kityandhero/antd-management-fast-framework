import { getDispatch } from 'easy-soft-dva';
import {
  checkObjectIsNullOrEmpty,
  mergeTextMessage,
  promptTextBuilder,
} from 'easy-soft-utility';

import { listViewLoadingFlag } from '../customConfig';

/**
 * remote loading control assist
 */
export const loadingControlAssist = {
  /**
   * start remote loading
   * @param {string} flag loading flag
   */
  startLoading(flag) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'loadingControlAssist::startLoading',
          promptTextBuilder.buildMustString(),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'loadingControl/startLoading',
      payload: { flag },
    });
  },
  /**
   * stop remote loading
   * @param {string} flag loading flag
   */
  stopLoading(flag) {
    if (checkObjectIsNullOrEmpty(flag)) {
      throw new Error(
        mergeTextMessage(
          'loadingControlAssist::stopLoading',
          promptTextBuilder.buildMustString(),
          'disallow empty string',
        ),
      );
    }

    const dispatch = getDispatch();

    dispatch({
      type: 'loadingControl/stopLoading',
      payload: { flag },
    });
  },
};

/**
 * remote loading control assist
 */
export const listViewControlAssist = {
  /**
   * start remote loading
   * @param {string} flag loading flag
   */
  startLoading() {
    loadingControlAssist.startLoading(listViewLoadingFlag);
  },
  /**
   * stop remote loading
   * @param {string} flag loading flag
   */
  stopLoading() {
    loadingControlAssist.stopLoading(listViewLoadingFlag);
  },
};
