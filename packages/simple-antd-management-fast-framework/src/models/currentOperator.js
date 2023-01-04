import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-common/es/utils/requestAssistor';

import {
  changeCurrentPasswordData,
  getCurrentBasicInfoData,
  updateCurrentBasicInfoData,
} from '@/services/currentOperator';
import {
  getCurrentOperatorCache,
  setCurrentOperatorCache,
} from '@/utils/storageAssist';

export default {
  namespace: 'currentOperator',

  state: {
    ...tacitlyState,
    ...{
      currentOperator: null,
    },
  },

  effects: {
    *getCurrentOperator({ payload, alias }, { call, put }) {
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
    *getCurrentBasicInfo({ payload, alias }, { call, put }) {
      const response = yield call(getCurrentBasicInfoData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateCurrentBasicInfo({ payload, alias }, { call, put }) {
      const response = yield call(updateCurrentBasicInfoData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *changeCurrentPassword({ payload, alias }, { call, put }) {
      const response = yield call(changeCurrentPasswordData, payload);

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
    changeCurrentOperator(state, { payload }) {
      return {
        ...state,
        currentOperator: payload,
      };
    },
    ...reducerCollection,
  },
};
