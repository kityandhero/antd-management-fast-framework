import { getCache, setCache, toBoolean } from 'easy-soft-utility';

const cacheKeyCollection = {
  applicationListDataRequestProcessing: 'applicationListDataRequestProcessing',
  metaDataRequestProcessing: 'metaDataRequestProcessing',
  currentOperatorRequestProcessing: 'currentOperatorRequestProcessing',
};

/**
 * scheduling control assist
 */
const schedulingControlAssist = {
  /**
   * Get meta data request is processing
   */
  getMetaDataRequestProcessing() {
    return getCache({
      key: cacheKeyCollection.metaDataRequestProcessing,
    });
  },
  /**
   * Set meta data request is processing
   */
  setMetaDataRequestProcessing(value) {
    setCache({
      key: cacheKeyCollection.metaDataRequestProcessing,
      value: toBoolean(value),
    });
  },
  /**
   * Get application list data request is processing
   */
  getApplicationListDataProcessing() {
    return getCache({
      key: cacheKeyCollection.applicationListDataRequestProcessing,
    });
  },
  /**
   * Set application list data request is processing
   */
  setApplicationListDataProcessing(value) {
    setCache({
      key: cacheKeyCollection.applicationListDataRequestProcessing,
      value: toBoolean(value),
    });
  },
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
};

export { schedulingControlAssist };
