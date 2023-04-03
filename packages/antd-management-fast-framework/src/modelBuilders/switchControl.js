import {
  checkObjectIsNullOrEmpty,
  getTacitlyState,
  isArray,
  isEmptyArray,
  logTrace,
  mergeTextMessage,
  promptTextBuilder,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'switchControl',

    state: {
      ...getTacitlyState(),
      flags: {},
    },

    effects: {
      *open({ payload, alias }, { put }) {
        const { flag } = { flag: '', ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::open',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
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

        logTrace('switchControl::open', `switch flag "${flag}" change to true`);

        return data;
      },
      *close({ payload, alias }, { put }) {
        const { flag } = { flag: '', ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::close',
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
          'switchControl::close',
          `switch flag "${flag}" change to false`,
        );

        return data;
      },
      *openMulti({ payload, alias }, { put }) {
        const { flags } = { flags: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::openMulti',
              promptTextBuilder.buildMustArray({ name: 'payload.flags' }),
              'must be string array, disallow empty array',
            ),
          );
        }

        const data = {};

        for (const o of flags) {
          data[o] = true;
        }

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          'switchControl::openMulti',
          `switch flags "${flags.join(',')}" change to true`,
        );

        return data;
      },
      *closeMulti({ payload, alias }, { put }) {
        const { flags } = { flags: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'switchControl::closeMulti',
              promptTextBuilder.buildMustArray({ name: 'payload.flags' }),
              'must be string array, disallow empty array',
            ),
          );
        }

        const data = {};

        for (const o of flags) {
          data[o] = false;
        }

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          'switchControl::closeMulti',
          `switch flags "${flags.join(',')}" change to false`,
        );

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
