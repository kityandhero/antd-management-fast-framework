import {
  getTacitlyState,
  logDebug,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  toString,
} from 'easy-soft-utility';

import {
  getMetaDataData,
  getMetaDataSimulation,
  singleListApplicationListData,
  singleListApplicationListDataSimulation,
} from '../services/schedulingControl';

export function buildSchedulingControlModel() {
  return {
    namespace: 'schedulingControl',

    state: {
      ...getTacitlyState(),
      remoteLoading: false,
    },

    effects: {
      *getApplicationListData({ payload, alias }, { call, put }) {
        const response = yield call(singleListApplicationListData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getApplicationListDataSimulation({ payload, alias }, { call, put }) {
        const response = yield call(
          singleListApplicationListDataSimulation,
          payload,
        );

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getMetaData({ payload, alias }, { call, put }) {
        const response = yield call(getMetaDataData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getMetaDataSimulation({ payload, alias }, { call, put }) {
        const response = yield call(getMetaDataSimulation, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *configLayoutSetting({ payload, alias }, { put }) {
        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: payload,
          alias,
          ...reducerDefaultParameters,
        });

        return payload;
      },
      *startRemoteLoading({ alias }, { put }) {
        const remoteLoading = true;

        const data = { remoteLoading };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logDebug(
          'startRemoteLoading',
          `remoteLoading change to ${toString(remoteLoading)}`,
        );

        return data;
      },
      *stopRemoteLoading({ alias }, { put }) {
        const remoteLoading = false;

        const data = { remoteLoading };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logDebug(
          'stopRemoteLoading',
          `remoteLoading change to ${toString(remoteLoading)}`,
        );

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
