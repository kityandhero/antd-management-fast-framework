import {
  checkObjectIsNullOrEmpty,
  getTacitlyState,
  logTrace,
  mergeTextMessage,
  promptTextBuilder,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'loadingControl',

    state: {
      ...getTacitlyState(),
      flags: {},
    },

    effects: {
      *startLoading({ payload, alias }, { put }) {
        const { flag } = { flag: '', ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'loadingControl::startLoading',
              promptTextBuilder.buildMustString('payload.flag'),
            ),
          );
        }

        const data = {};

        data[flag] = true;

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace('startLoading', `loading flag "${flag}" change to true`);

        return data;
      },
      *stopLoading({ payload, alias }, { put }) {
        const { flag } = { flag: '', ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'loadingControl::stopLoading',
              promptTextBuilder.buildMustString('payload.flag'),
            ),
          );
        }

        const data = {};

        data[flag] = false;

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace('stopLoading', `loading flag "${flag}" change to false`);

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
