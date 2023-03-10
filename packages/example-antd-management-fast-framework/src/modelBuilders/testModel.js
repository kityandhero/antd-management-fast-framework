import {
  getGuid,
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'testModel',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *changeValue({ alias }, { put }) {
        const dataAdjust = { simpleText: getGuid() };

        yield put({
          type: reducerNameCollection.reducerNormalData,
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
