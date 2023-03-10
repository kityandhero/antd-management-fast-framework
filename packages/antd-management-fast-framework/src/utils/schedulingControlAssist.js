import { getDispatch } from 'easy-soft-dva';

/**
 * scheduling control assist
 */
const schedulingControlAssist = {
  /**
   * start remote loading
   */
  startRemoteLoading() {
    const dispatch = getDispatch();

    dispatch({ type: 'schedulingControl/startRemoteLoading' });
  },
  /**
   * stop remote loading
   */
  stopRemoteLoading() {
    const dispatch = getDispatch();

    dispatch({ type: 'schedulingControl/stopRemoteLoading' });
  },
};

export { schedulingControlAssist };
