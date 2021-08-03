import { handleCommonDataAssist } from '@antd-management-fast-framework/utils/tools';
import {
  getCurrentData,
  getCurrentBasicInfoData,
  updateCurrentBasicInfoData,
  changeCurrentPasswordData,
} from '../services/operator';

export default {
  namespace: 'operator',

  state: {},

  effects: {
    *getCurrent({ payload }, { call, put }) {
      const response = yield call(getCurrentData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getCurrentBasicInfo({ payload }, { call, put }) {
      const response = yield call(getCurrentBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateCurrentBasicInfo({ payload }, { call, put }) {
      const response = yield call(updateCurrentBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *changeCurrentPassword({ payload }, { call, put }) {
      const response = yield call(changeCurrentPasswordData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
