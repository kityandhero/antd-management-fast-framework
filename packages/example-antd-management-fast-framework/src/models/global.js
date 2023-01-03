import {
  reducerCommonCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import { modelCollection } from 'antd-management-fast-common/es/utils/globalModel';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-common/es/utils/requestAssistor';
import { showInfoMessage } from 'antd-management-fast-common/es/utils/tools';

import { getMetaDataCache, setMetaDataCache } from '@/utils/storageAssist';

import { getData } from '../services/global';

const GlobalModel = {
  namespace: 'global',

  state: {
    ...tacitlyState,
    ...(modelCollection || {}),
    ...{
      collapsed: false,
      amapObject: null,
      notices: [],
      mediaTypeList: [],
      webChannelList: [],
      accessWayStatusList: [],
      articleStatusList: [],
    },
  },

  effects: {
    *getMetaData({ payload }, { call, put }) {
      const { force, showMessage } = payload || {
        force: false,
        showMessage: true,
      };
      let result = {};
      let fromRemote = force || false;

      if (!force) {
        result = getMetaDataCache();

        if ((result || null) == null) {
          fromRemote = true;
          result = {};
        }
      }

      if (fromRemote) {
        if (showMessage) {
          requestAnimationFrame(() => {
            const text = '初始数据正在努力加载中，需要一点点时间哦！';

            showInfoMessage({
              message: text,
              duration: 0.8,
            });
          });
        }

        const response = yield call(getData, payload);

        const data = pretreatmentRemoteSingleData(response);

        const { dataSuccess, data: metaData } = data;

        if (dataSuccess) {
          const {
            mediaTypeList,
            webChannelList,
            accessWayStatusList,
            articleStatusList,
          } = metaData;

          result = {
            mediaTypeList,
            webChannelList,
            accessWayStatusList,
            articleStatusList,
          };

          setMetaDataCache(result);
        }
      }

      yield put({
        type: 'changeMetaData',
        payload: result,
      });
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
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter((item) => item.type !== payload),
      };
    },
    changeAreaDistributionTempData(state, { payload }) {
      return {
        ...state,
        areaDistributionTempData: payload,
      };
    },
    ...reducerCommonCollection,
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};

export default GlobalModel;
