import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import {
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
} from 'antd-management-fast-common/es/utils/requestAssistor';

import {
  getMetaDataData,
  getMetaDataSimulation,
  singleListAppListData,
  singleListAppListDataSimulation,
} from '../services/schedulingControl';

export default {
  namespace: 'schedulingControl',

  state: {
    ...tacitlyState,
  },

  effects: {
    *singleListAppList({ payload, alias }, { call, put }) {
      const response = yield call(singleListAppListData, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *singleListAppListSimulation({ payload, alias }, { call, put }) {
      const response = yield call(singleListAppListDataSimulation, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
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
      const response = yield call(getMetaDataSimulation, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *configLayoutSetting({ payload, alias }, { put }) {
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
