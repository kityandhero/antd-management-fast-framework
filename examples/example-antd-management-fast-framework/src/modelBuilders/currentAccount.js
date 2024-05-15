import {
  getCurrentOperatorCache,
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  setCurrentOperatorCache,
} from 'easy-soft-utility';

import {
  changeCurrentPasswordData,
  getCurrentBasicInfoData,
  updateCurrentBasicInfoData,
} from '../services/currentAccount';

export function buildModel() {
  return {
    namespace: 'currentAccount',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getCurrentOperator({ payload, alias }, { call, put }) {
        let dataAdjust = {};

        const { force } = payload || {
          force: false,
        };
        let result = {};
        let fromRemote = force || false;

        if (!force) {
          dataAdjust = getCurrentOperatorCache();

          if ((result || null) == null) {
            fromRemote = true;
            dataAdjust = {};
          }
        }

        if (fromRemote) {
          const response = yield call(getCurrentBasicInfoData, payload);

          const dataAdjust = pretreatmentRemoteSingleData({ source: response });

          yield put({
            type: reducerNameCollection.reducerRemoteData,
            payload: dataAdjust,
            alias,
            ...reducerDefaultParameters,
          });

          setCurrentOperatorCache(dataAdjust);
        }

        return dataAdjust;
      },
      *getCurrentBasicInfo({ payload, alias }, { call, put }) {
        const response = yield call(getCurrentBasicInfoData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *updateCurrentBasicInfo({ payload, alias }, { call, put }) {
        const response = yield call(updateCurrentBasicInfoData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *changeCurrentPassword({ payload, alias }, { call, put }) {
        const response = yield call(changeCurrentPasswordData, payload);

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
