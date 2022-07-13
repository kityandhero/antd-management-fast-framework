import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'antd-management-fast-framework/es/utils/dva';

import { initData } from '../services/flowEditor';

export default {
  namespace: 'flowEditor',

  state: {
    ...tacitlyState,
  },

  effects: {
    *init({ payload }, { call, put }) {
      const response = yield call(initData, payload);

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
