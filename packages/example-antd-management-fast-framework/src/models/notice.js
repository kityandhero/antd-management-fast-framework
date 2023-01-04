import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import {
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from 'antd-management-fast-common/es/utils/requestAssistor';

import {
  changeNoticeReadData,
  clearNoticeData,
  singleListData,
} from '../services/notice';

export default {
  namespace: 'notice',

  state: {
    ...tacitlyState,
  },

  effects: {
    *singleList({ payload, alias }, { call, put }) {
      const response = yield call(singleListData, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *changeNoticeRead({ payload, alias }, { call, put }) {
      const response = yield call(changeNoticeReadData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *clearNotice({ payload, alias }, { call, put }) {
      const response = yield call(clearNoticeData, payload);

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
