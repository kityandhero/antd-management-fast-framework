import {
  getTacitlyState,
  pretreatmentRemotePageListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { pageListData } from '../../services/operationLog';

export const operationLogTypeCollection = {
  pageList: 'operationLog/pageList',
};

export function buildModel() {
  return {
    namespace: 'operationLog',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

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
