import {
  getLocalMetaData,
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  setLocalMetaData,
  showInfoMessage,
} from 'easy-soft-utility';

import { getData } from '../services/global';

export default {
  namespace: 'global',

  state: {
    ...getTacitlyState(),
  },

  effects: {
    *getMetaData({ payload, alias }, { call, put }) {
      let dataAdjust = {};

      const { force } = payload || {
        force: false,
      };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        dataAdjust = getLocalMetaData();

        if ((result || null) == null) {
          fromRemote = true;
          dataAdjust = {};
        }
      }

      if (fromRemote) {
        requestAnimationFrame(() => {
          const text = '初始数据正在努力加载中，需要一点点时间哦！';

          showInfoMessage({
            message: text,
            duration: 0.8,
          });
        });

        const response = yield call(getData, payload);

        dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        setLocalMetaData(dataAdjust);
      }

      return dataAdjust;
    },
    *setAMapObject({ payload }, { put }) {
      yield put({
        type: 'handleAmapObject',
        payload,
      });
    },
  },

  reducers: {
    changeMetaData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    handleAmapObject(state, { payload }) {
      return {
        ...state,
        amapObject: payload,
      };
    },
    // changeLayoutCollapsed(
    //   state = {
    //     notices: [],
    //     collapsed: true,
    //   },
    //   { payload },
    // ) {
    //   return { ...state, collapsed: payload };
    // },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    // saveClearedNotices(
    //   state = {
    //     notices: [],
    //     collapsed: true,
    //   },
    //   { payload },
    // ) {
    //   return {
    //     collapsed: false,
    //     ...state,
    //     notices: state.notices.filter((item) => item.type !== payload),
    //   };
    // },
    changeAreaDistributionTempData(state, { payload }) {
      return {
        ...state,
        areaDistributionTempData: payload,
      };
    },
    ...reducerCollection,
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (window.ga !== undefined) {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
