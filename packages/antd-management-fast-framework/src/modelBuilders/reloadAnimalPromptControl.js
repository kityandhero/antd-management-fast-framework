import {
  getTacitlyState,
  logTrace,
  mergeArrowText,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'reloadAnimalPromptControl',

    state: {
      ...getTacitlyState(),
      visible: false,
    },

    effects: {
      *show({ payload, alias }, { put }) {
        const { message } = { flag: '', message: [], ...payload };

        const data = { visible: true };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'reloadAnimalPromptControl::show'),
          `visible change to true`,
        );

        return data;
      },
      *hide({ payload, alias }, { put }) {
        const { message } = { flag: '', message: [], ...payload };

        const data = { visible: false };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'reloadAnimalPromptControl::close'),
          `visible change to false`,
        );

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
