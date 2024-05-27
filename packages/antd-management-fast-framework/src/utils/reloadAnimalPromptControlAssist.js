import { getDispatch } from 'easy-soft-dva';
import { isArray, isString } from 'easy-soft-utility';

/**
 * reload animal prompt control assist
 */
export const reloadAnimalPromptControlAssist = {
  /**
   * check
   * @param {Object} reloadAnimalPromptControl model
   * @param {string} flag switch flag
   */
  check(reloadAnimalPromptControl, flag) {
    if (isArray(flag)) {
      let result = false;

      for (const o of flag) {
        if (!isString(o)) {
          continue;
        }

        result = !!reloadAnimalPromptControl[o];

        if (result) {
          break;
        }
      }

      return result;
    } else {
      if (!isString(flag)) {
        return false;
      }

      return !!reloadAnimalPromptControl[flag];
    }
  },
  /**
   * show
   * @param {Array} message switch flag
   */
  show(flag, ...message) {
    const dispatch = getDispatch();

    dispatch({
      type: 'reloadAnimalPromptControl/show',
      payload: { flag, message: message || [] },
    });
  },
  /**
   * hide
   * @param {Array} message switch flag
   */
  hide(flag, delay = 0, ...message) {
    const dispatch = getDispatch();

    if (delay <= 0) {
      dispatch({
        type: 'reloadAnimalPromptControl/hide',
        payload: { message: message || [] },
      });
    } else {
      setTimeout(() => {
        dispatch({
          type: 'reloadAnimalPromptControl/hide',
          payload: { flag, message: message || [] },
        });
      }, delay);
    }
  },
};
