import {
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common';

import { initData } from '../services/flowEditor';

export default {
  namespace: 'flowEditor',

  state: {
    ...tacitlyState,
  },

  effects: {
    *init({ payload, alias }, { call, put }) {
      const response = yield call(initData, payload);

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
