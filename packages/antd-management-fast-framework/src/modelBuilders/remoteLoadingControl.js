import {
  getTacitlyState,
  logDebug,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  toString,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'remoteLoadingControl',

    state: {
      ...getTacitlyState(),
      remoteLoading: false,
    },

    effects: {
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
