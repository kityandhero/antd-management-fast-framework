import {
  checkObjectIsNullOrEmpty,
  getTacitlyState,
  isArray,
  isEmptyArray,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  promptTextBuilder,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  toString,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'menuControl',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getActiveKey({ payload }, { select }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'menuControl::getActiveKey',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        const o = yield select((state) => state['menuControl']);

        const value = o[flag] || '';

        logTrace(
          mergeArrowText(...message, 'menuControl::getActiveKey'),
          `menu flag "${flag}" value is "${value}"`,
        );

        return value;
      },
      *setActiveKey({ payload, alias }, { put }) {
        const { flag, name, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'menuControl::setActiveKey',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        const data = {};

        data[flag] = toString(name || '');

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'menuControl::setActiveKey'),
          `menu flag "${flag}" change to "${name}"`,
        );

        return data;
      },
      *remove({ payload, alias }, { put }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'menuControl::remove',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        yield put({
          type: reducerNameCollection.reducerRemoveKey,
          payload: flag,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'menuControl::remove'),
          `menu flag "${flag}" will remove`,
        );
      },
      *removeMulti({ payload, alias }, { put }) {
        const { flags, message } = { flags: [], message: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'menuControl::removeMulti',
              promptTextBuilder.buildMustArray({ name: 'payload.flags' }),
              'must be string array, disallow empty array',
            ),
          );
        }

        yield put({
          type: reducerNameCollection.reducerRemoveKey,
          payload: flags,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'menuControl::removeMulti'),
          `menu flags "${flags.join(',')}" will remove`,
        );
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
