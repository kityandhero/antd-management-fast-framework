import { changeNoticeReadData, clearNoticeData, singleListData } from '@/services/notice';
import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'antd-management-fast-framework/es/utils/dva';

export default {
  namespace: 'notice',

  state: {
    ...tacitlyState,
  },

  effects: {
    *singleList({ payload }, { call, put }) {
      const response = yield call(singleListData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
    *changeNoticeRead({ payload }, { call, put }) {
      const response = yield call(changeNoticeReadData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *clearNotice({ payload }, { call, put }) {
      const response = yield call(clearNoticeData, payload);

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
