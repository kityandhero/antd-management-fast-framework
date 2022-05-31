import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'antd-management-fast-framework/es/utils/dva';

import { getData } from '@/services/currentSystem';

export default {
  namespace: 'currentSystem',

  state: {
    ...tacitlyState,
  },

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

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
