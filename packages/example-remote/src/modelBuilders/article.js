import {
  getTacitlyState,
  pretreatmentRemotePageListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { pageListData } from '../services/article';

export function buildModel() {
  return {
    namespace: 'simple',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList({ payload, alias }, { call, put }) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({ source: response });

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
}
