import {
  handlePageListDataAssist,
  handleListDataAssist,
  handleCommonDataAssist,
} from 'antd-management-fast-framework/es/utils/requestAssistor';

import {
  pageListData,
  getData,
  addBasicInfoData,
  updateBasicInfoData,
  updateContentInfoData,
  updateMediaInfoData,
  updateSortData,
  updateRenderTypeData,
  setOnlineData,
  setOfflineData,
  refreshCacheData,
  removeData,
  getMediaItemData,
  addMediaItemData,
  updateMediaItemData,
  setMediaCollectionSortData,
  removeMediaItemData,
} from '@/services/article';

export default {
  namespace: 'article',

  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);
      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *addBasicInfo({ payload }, { call, put }) {
      const response = yield call(addBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateBasicInfo({ payload }, { call, put }) {
      const response = yield call(updateBasicInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateContentInfo({ payload }, { call, put }) {
      const response = yield call(updateContentInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateMediaInfo({ payload }, { call, put }) {
      const response = yield call(updateMediaInfoData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateSort({ payload }, { call, put }) {
      const response = yield call(updateSortData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateRenderType({ payload }, { call, put }) {
      const response = yield call(updateRenderTypeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOnline({ payload }, { call, put }) {
      const response = yield call(setOnlineData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setOffline({ payload }, { call, put }) {
      const response = yield call(setOfflineData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *refreshCache({ payload }, { call, put }) {
      const response = yield call(refreshCacheData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getMediaItem({ payload }, { call, put }) {
      const response = yield call(getMediaItemData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *addMediaItem({ payload }, { call, put }) {
      const response = yield call(addMediaItemData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *updateMediaItem({ payload }, { call, put }) {
      const response = yield call(updateMediaItemData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setMediaCollectionSort({ payload }, { call, put }) {
      const response = yield call(setMediaCollectionSortData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *removeMediaItem({ payload }, { call, put }) {
      const response = yield call(removeMediaItemData, payload);
      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
  },
};
