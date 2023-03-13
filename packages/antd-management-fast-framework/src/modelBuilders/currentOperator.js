import {
  checkStringIsNullOrWhiteSpace,
  getTacitlyState,
  logConfig,
  logTrace,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { getCurrentOperatorApi } from 'antd-management-fast-common';

import {
  getCurrentOperatorData,
  getCurrentOperatorDataSimulation,
} from '../services/currentOperator';

export function buildModel() {
  return {
    namespace: 'currentOperator',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getCurrentOperator({ payload, alias }, { call, put }) {
        const currentOperatorApi = getCurrentOperatorApi();

        if (checkStringIsNullOrWhiteSpace(currentOperatorApi)) {
          logConfig(
            'currentOperatorApi has not set, please set it in applicationConfig with key "currentOperatorApi", it must be absolute or relative http url like "/currentOperator/getCurrentOperator"',
            'use simulation request mode',
          );
        } else {
          logTrace('currentOperatorApi has been set', 'use real request mode');
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(currentOperatorApi)
            ? getCurrentOperatorDataSimulation
            : getCurrentOperatorData,
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
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
