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
    namespace: 'tabControl',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getActiveKey({ payload }, { select }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'tabControl::getActiveKey',
              promptTextBuilder.buildMustString({ name: 'payload.flag' }),
              'disallow empty string',
            ),
          );
        }

        const o = yield select((state) => state['tabControl']);

        const value = o[flag] || '';

        logTrace(
          mergeArrowText(...message, 'tabControl::getActiveKey'),
          `tab flag "${flag}" value is "${value}"`,
        );

        return value;
      },
      *setActiveKey({ payload, alias }, { put }) {
        const { flag, name, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'tabControl::setActiveKey',
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
          mergeArrowText(...message, 'tabControl::setActiveKey'),
          `tab flag "${flag}" change to "${name}"`,
        );

        return data;
      },
      *remove({ payload, alias }, { put }) {
        const { flag, message } = { flag: '', message: [], ...payload };

        if (checkObjectIsNullOrEmpty(flag)) {
          throw new Error(
            mergeTextMessage(
              'tabControl::remove',
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
          mergeArrowText(...message, 'tabControl::remove'),
          `tab flag "${flag}" will remove`,
        );
      },
      *removeMulti({ payload, alias }, { put }) {
        const { flags, message } = { flags: [], message: [], ...payload };

        if (!isArray(flags) || isEmptyArray(flags)) {
          throw new Error(
            mergeTextMessage(
              'tabControl::removeMulti',
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
          mergeArrowText(...message, 'tabControl::removeMulti'),
          `tab flags "${flags.join(',')}" will remove`,
        );
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
