import {
  handleCommonDataAssist,
  handleListDataAssist,
  handlePageListDataAssist,
} from 'antd-management-fast-framework/es/utils/requestAssistor';

import { singleListData, changeNoticeReadData, clearNoticeData } from '@/services/notice';

export default {
  namespace: 'notice',

  state: {},

  effects: {
    *singleList({ payload }, { call, put }) {
      const response = yield call(singleListData, payload);

      yield put({
        type: 'handleListData',
        payload: response,
      });
    },
    *changeNoticeRead({ payload }, { call, put }) {
      const response = yield call(changeNoticeReadData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *clearNotice({ payload }, { call, put }) {
      const response = yield call(clearNoticeData, payload);

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
