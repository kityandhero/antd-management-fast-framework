import { getDispatch } from 'easy-soft-dva';

/**
 * remote loading control assist
 */
const remoteLoadingControlAssist = {
  /**
   * start remote loading
   */
  startRemoteLoading() {
    const dispatch = getDispatch();

    dispatch({ type: 'remoteLoadingControl/startRemoteLoading' });
  },
  /**
   * stop remote loading
   */
  stopRemoteLoading() {
    const dispatch = getDispatch();

    dispatch({ type: 'remoteLoadingControl/stopRemoteLoading' });
  },
};

export { remoteLoadingControlAssist };
