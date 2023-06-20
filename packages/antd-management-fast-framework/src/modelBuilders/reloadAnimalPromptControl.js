import {
  checkObjectIsNullOrEmpty,
  getTacitlyState,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  promptTextBuilder,
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
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'reloadAnimalPromptControl::show',
              promptTextBuilder.buildMustString({
                name: 'payload.flag',
              }),
              'disallow empty string',
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

        logTrace(
          mergeArrowText(...message, 'reloadAnimalPromptControl::show'),
          `visible flag "${flag}" change to true`,
        );

        return data;
      },
      *hide({ payload, alias }, { put }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'reloadAnimalPromptControl::close',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
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

        logTrace(
          mergeArrowText(...message, 'reloadAnimalPromptControl::close'),
          `visible flag "${flag}" change to false`,
        );

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
