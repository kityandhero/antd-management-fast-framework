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

import {
  getApplicationListDataApi,
  getMetaDataApi,
} from 'antd-management-fast-common';

import {
  refreshMetaDataData,
  refreshMetaDataSimulation,
  refreshSingleListApplicationListData,
  refreshSingleListApplicationListDataSimulation,
} from '../services/schedulingControl';

export function buildModel() {
  return {
    namespace: 'schedulingControl',

    state: {
      ...getTacitlyState(),
      remoteLoading: false,
    },

    effects: {
      *refreshApplicationListData({ payload, alias }, { call, put }) {
        const applicationListDataApi = getApplicationListDataApi();

        if (checkStringIsNullOrWhiteSpace(applicationListDataApi)) {
          logConfig(
            'applicationListDataApi has not set, please set it in applicationConfig with key "applicationListDataApi", it must be absolute or relative http url like "/metaData/refreshApplicationListData"',
            'use simulation request mode',
          );
        } else {
          logTrace(
            'applicationListDataApi has been set',
            'use real request mode',
          );
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(applicationListDataApi)
            ? refreshSingleListApplicationListDataSimulation
            : refreshSingleListApplicationListData,
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
      *refreshMetaData({ payload, alias }, { call, put }) {
        const metaDataApi = getMetaDataApi();

        if (checkStringIsNullOrWhiteSpace(metaDataApi)) {
          logConfig(
            'metaDataApi has not set, please set it in applicationConfig with key "metaDataApi", it must be absolute or relative http url like "/metaData/refresh"',
            'use simulation request mode',
          );
        } else {
          logTrace('metaDataApi has been set', 'use real request mode');
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(metaDataApi)
            ? refreshMetaDataSimulation
            : refreshMetaDataData,
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
