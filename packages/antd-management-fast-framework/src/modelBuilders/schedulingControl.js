import {
  getTacitlyState,
  pretreatmentRemoteListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
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
    },

    effects: {
      *singleListAppList({ payload, alias }, { call, put }) {
        const response = yield call(singleListApplicationListData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *singleListApplicationListSimulation({ payload, alias }, { call, put }) {
        const response = yield call(
          singleListApplicationListDataSimulation,
          payload,
        );

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
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
          type: reducerNameCollection.reducerData,
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
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *configLayoutSetting({ payload, alias }, { put }) {
        yield put({
          type: reducerNameCollection.reducerData,
          payload: payload,
          alias,
          ...reducerDefaultParameters,
        });

        return payload;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
