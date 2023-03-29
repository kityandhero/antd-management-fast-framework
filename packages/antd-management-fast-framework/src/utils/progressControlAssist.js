import { getDispatch } from 'easy-soft-dva';

/**
 * progress control assist
 */
const progressControlAssist = {
  /**
   * start progressing
   */
  startProgressing() {
    const dispatch = getDispatch();

    dispatch({ type: 'progressControl/startProgressing' });
  },
  /**
   * stop progressing
   */
  stopProgressing() {
    const dispatch = getDispatch();

    dispatch({ type: 'progressControl/stopProgressing' });
  },
};

export { progressControlAssist };
