import { getDispatch } from 'easy-soft-dva';
import { getCache, setCache, toBoolean } from 'easy-soft-utility';

const cacheKeyCollection = {
  currentOperatorRequestProcessing: 'currentOperatorRequestProcessing',
};

/**
 * scheduling control assist
 */
const schedulingControlAssist = {
  /**
   * Get current operator request is processing
   */
  getCurrentOperatorRequestProcessing() {
    return getCache({
      key: cacheKeyCollection.currentOperatorRequestProcessing,
    });
  },
  /**
   * Set current operator request is processing
   */
  setCurrentOperatorRequestProcessing(value) {
    setCache({
      key: cacheKeyCollection.currentOperatorRequestProcessing,
      value: toBoolean(value),
    });
  },
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
