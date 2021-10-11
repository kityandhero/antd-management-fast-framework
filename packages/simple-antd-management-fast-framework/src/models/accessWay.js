import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist,
} from 'antd-management-fast-framework/es/utils/requestAssistor';

import {
  pageListData,
  getData,
  setOfflineData,
  setOnlineData,
  refreshCacheData,
} from '../services/accessWay';

export default {
  namespace: 'accessWay',

  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);

      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOffline({ payload }, { call, put }) {
      const response = yield call(setOfflineData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOnline({ payload }, { call, put }) {
      const response = yield call(setOnlineData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *refreshCache({ payload }, { call, put }) {
      const response = yield call(refreshCacheData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
