import {
  getTacitlyState,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  changeNoticeReadData,
  clearNoticeData,
  singleListData,
} from '../services/notice';

export function buildNoticeModel() {
  return {
    namespace: 'notice',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *singleList({ payload, alias }, { call, put }) {
        const response = yield call(singleListData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
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
          ...reducerDefaultParameters,
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
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
