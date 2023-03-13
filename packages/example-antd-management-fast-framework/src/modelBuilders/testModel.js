import {
  getGuid,
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { schedulingControlAssist } from 'antd-management-fast-framework';

export function buildModel() {
  return {
    namespace: 'testModel',

    state: {
      ...getTacitlyState(),
      simpleText: '',
    },

    effects: {
      *changeSimpleValue({ alias }, { put }) {
        const simpleText = getGuid();

        const dataAdjust = { simpleText };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        // logTrace(`simpleText change to ${simpleText}`);

        return dataAdjust;
      },
      *changeSimpleValueWithLoading({ alias }, { put }) {
        const simpleText = getGuid();

        const dataAdjust = { simpleText };

        yield put({
          type: reducerNameCollection.reducerNormalData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        // logTrace(`simpleText change to ${simpleText}`);

        schedulingControlAssist.stopRemoteLoading();

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
