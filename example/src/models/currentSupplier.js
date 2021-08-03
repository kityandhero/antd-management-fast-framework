import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist,
} from 'antd-management-fast-framework/lib/utils/tools';

import { getData } from '../services/currentSupplier';

export default {
  namespace: 'currentSupplier',

  state: {},

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
