import {
  getTacitlyState,
  logTrace,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  toString,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'progressControl',

    state: {
      ...getTacitlyState(),
      progressing: false,
    },

    effects: {
      *startProgressing({ alias }, { put }) {
        const progressing = true;

        const data = { progressing };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          'startProgressing',
          `progressing change to ${toString(progressing)}`,
        );

        return data;
      },
      *stopProgressing({ alias }, { put }) {
        const progressing = false;

        const data = { progressing };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          'stopProgressing',
          `progressing change to ${toString(progressing)}`,
        );

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
