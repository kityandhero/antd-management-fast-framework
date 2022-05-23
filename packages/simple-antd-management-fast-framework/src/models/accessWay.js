import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'antd-management-fast-framework/es/utils/dva';
import {
  getData,
  pageListData,
  refreshCacheData,
  setOfflineData,
  setOnlineData,
} from '../services/accessWay';

export default {
  namespace: 'accessWay',

  state: {
    ...tacitlyState,
  },

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);

      yield put({
        type: reducerCommonNameCollection.handlePageListData,
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *setOffline({ payload }, { call, put }) {
      const response = yield call(setOfflineData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *setOnline({ payload }, { call, put }) {
      const response = yield call(setOnlineData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *refreshCache({ payload }, { call, put }) {
      const response = yield call(refreshCacheData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
