import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-common/es/utils/requestAssistor';

import {
  getMetaDataData,
  getMetaDataSimulationData,
} from '../services/schedulingControl';

export default {
  namespace: 'schedulingControl',

  state: {
    ...tacitlyState,
  },

  effects: {
    *getMetaData({ payload, alias }, { call, put }) {
      const response = yield call(getMetaDataData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *getMetaDataSimulation({ payload, alias }, { call, put }) {
      const response = yield call(getMetaDataSimulationData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *configSetting({ payload, alias }, { put }) {
      yield put({
        type: reducerNameCollection.reducerData,
        payload: payload,
        alias,
        ...reducerDefaultParams,
      });

      return payload;
    },
  },

  reducers: {
    ...reducerCollection,
  },
};
