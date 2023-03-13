import {
  checkStringIsNullOrWhiteSpace,
  getTacitlyState,
  logConfig,
  logTrace,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { getMetaDataApi } from 'antd-management-fast-common';

import {
  getMetaDataData,
  getMetaDataSimulation,
  singleListApplicationListData,
  singleListApplicationListDataSimulation,
} from '../services/schedulingControl';

export function buildModel() {
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
        const metaDataApi = getMetaDataApi();

        if (checkStringIsNullOrWhiteSpace(metaDataApi)) {
          logConfig(
            'metaDataApi has not set, please set it in applicationConfig with key "metaDataApi", it must be absolute or relative http url like "/metaData/get"',
            'use simulation request mode',
          );
        } else {
          logTrace('metaDataApi has been set', 'use real request mode');
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(metaDataApi)
            ? getMetaDataSimulation
            : getMetaDataData,
          payload,
        );

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
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

        // logDebug(
        //   'startRemoteLoading',
        //   `remoteLoading change to ${toString(remoteLoading)}`,
        // );

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

        // logDebug(
        //   'stopRemoteLoading',
        //   `remoteLoading change to ${toString(remoteLoading)}`,
        // );

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
