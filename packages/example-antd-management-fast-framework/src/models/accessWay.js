import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
} from 'antd-management-fast-common/es/utils/requestAssistor';

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
    *pageList({ payload, alias }, { call, put }) {
      const response = yield call(pageListData, payload);

      const dataAdjust = pretreatmentRemotePageListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *get({ payload, alias }, { call, put }) {
      const response = yield call(getData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *setOffline({ payload, alias }, { call, put }) {
      const response = yield call(setOfflineData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *setOnline({ payload, alias }, { call, put }) {
      const response = yield call(setOnlineData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *refreshCache({ payload, alias }, { call, put }) {
      const response = yield call(refreshCacheData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
  },

  reducers: {
    ...reducerCollection,
  },
};
