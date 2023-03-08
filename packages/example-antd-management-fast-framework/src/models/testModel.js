import {
  getGuid,
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

export default {
  namespace: 'testModel',

  state: {
    ...getTacitlyState(),
  },

  effects: {
    *changeValue({ alias }, { put }) {
      const dataAdjust = { value: getGuid() };

      yield put({
        type: reducerNameCollection.reducerRemoteData,
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
