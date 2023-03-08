import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { initData } from '../services/flowEditor';

export default {
  namespace: 'flowEditor',

  state: {
    ...getTacitlyState(),
  },

  effects: {
    *init({ payload, alias }, { call, put }) {
      const response = yield call(initData, payload);

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
