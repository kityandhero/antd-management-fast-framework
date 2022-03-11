import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist,
  pretreatmentRemoteSingleData,
} from 'antd-management-fast-framework/es/utils/requestAssistor';

import { getCurrentOperatorCache, setCurrentOperatorCache } from '@/utils/storageAssist';

import {
  getCurrentBasicInfoData,
  updateCurrentBasicInfoData,
  changeCurrentPasswordData,
} from '@/services/currentOperator';

export default {
  namespace: 'currentOperator',

  state: {
    currentOperator: null,
  },

  effects: {
    *getCurrentOperator({ payload }, { call, put }) {
      const { force } = payload || { force: false };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getCurrentOperatorCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        const response = yield call(getCurrentBasicInfoData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          result = metaData;

          setCurrentOperatorCache(result);
        }
      }

      yield put({
        type: 'changeCurrentOperator',
        payload: result,
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
    changeCurrentOperator(state, { payload }) {
      return {
        ...state,
        currentOperator: payload,
      };
    },
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
