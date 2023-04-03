import { getDispatch } from 'easy-soft-dva';

/**
 * progress bar control assist
 */
const progressBarControlAssist = {
  /**
   * start progress bar
   */
  start() {
    const dispatch = getDispatch();

    dispatch({ type: 'progressBarControl/start' });
  },
  /**
   * stop progress bar
   */
  stop() {
    const dispatch = getDispatch();

    dispatch({ type: 'progressBarControl/stop' });
  },
};

export { progressBarControlAssist };
