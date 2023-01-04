import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-common/es/utils/requestAssistor';

import { getData } from '@/services/currentSystem';

export default {
  namespace: 'currentSystem',

  state: {
    ...tacitlyState,
  },

  effects: {
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
  },

  reducers: {
    ...reducerCollection,
  },
};
