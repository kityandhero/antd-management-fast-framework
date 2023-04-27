import { getDispatch } from 'easy-soft-dva';

/**
 * reload animal prompt control assist
 */
export const reloadAnimalPromptControlAssist = {
  /**
   * check
   * @param {object} reloadAnimalPromptControl model
   */
  check(reloadAnimalPromptControl) {
    const { visible } = reloadAnimalPromptControl;

    return !!visible;
  },
  /**
   * show
   * @param {Array} message switch flag
   */
  show(...message) {
    const dispatch = getDispatch();

    dispatch({
      type: 'reloadAnimalPromptControl/show',
      payload: { message: message || [] },
    });
  },
  /**
   * hide
   * @param {Array} message switch flag
   */
  hide(delay = 0, ...message) {
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
          payload: { message: message || [] },
        });
      }, delay);
    }
  },
};
