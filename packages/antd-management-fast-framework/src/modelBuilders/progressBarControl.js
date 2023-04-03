import {
  getTacitlyState,
  logTrace,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'progressBarControl',

    state: {
      ...getTacitlyState(),
      progressing: false,
    },

    effects: {
      *start({ alias }, { put }) {
        const progressing = true;

        const data = { progressing };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(`progressingBar start`);

        return data;
      },
      *stop({ alias }, { put }) {
        const progressing = false;

        const data = { progressing };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: data,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(`progressingBar stop`);

        return data;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
