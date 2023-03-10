import {
  getGuid,
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { schedulingControlAssist } from 'antd-management-fast-framework';

export default {
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

      schedulingControlAssist.stopRemoteLoading();

      return dataAdjust;
    },
  },

  reducers: {
    ...reducerCollection,
  },
};
