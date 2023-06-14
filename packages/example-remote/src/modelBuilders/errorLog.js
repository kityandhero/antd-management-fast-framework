import {
  getTacitlyState,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  deleteData,
  deleteMultiData,
  getData,
  pageListData,
} from '../services/errorLog';

export function buildModel() {
  return {
    namespace: 'errorLog',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList({ payload, alias }, { call, put }) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *get({ payload, alias }, { call, put }) {
        const response = yield call(getData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *delete({ payload, alias }, { call, put }) {
        const response = yield call(deleteData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *deleteMulti({ payload, alias }, { call, put }) {
        const response = yield call(deleteMultiData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
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
