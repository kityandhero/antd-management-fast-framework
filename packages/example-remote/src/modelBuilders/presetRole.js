import {
  getTacitlyState,
  pretreatmentRemoteListData,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  addBasicInfoData,
  getData,
  listModuleData,
  pageListData,
  refreshCacheData,
  setDisableData,
  setEnableData,
  updateBasicInfoData,
} from '../services/presetRole';

export function buildModel() {
  return {
    namespace: 'presetRole',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList({ payload, alias }, { call, put }) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *listModule({ payload, alias }, { call, put }) {
        const response = yield call(listModuleData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *get({ payload, alias }, { call, put }) {
        const response = yield call(getData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *addBasicInfo({ payload, alias }, { call, put }) {
        const response = yield call(addBasicInfoData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *updateBasicInfo({ payload, alias }, { call, put }) {
        const response = yield call(updateBasicInfoData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *setEnable({ payload, alias }, { call, put }) {
        const response = yield call(setEnableData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *setDisable({ payload, alias }, { call, put }) {
        const response = yield call(setDisableData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *refreshCache({ payload, alias }, { call, put }) {
        const response = yield call(refreshCacheData, payload);

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
