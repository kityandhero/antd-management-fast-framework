import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'antd-management-fast-framework/es/utils/dva';

import {
  addBasicInfoData,
  addImageData,
  addMediaItemData,
  getData,
  getMediaItemData,
  listImageData,
  pageListData,
  refreshCacheData,
  removeData,
  removeImageData,
  removeMediaItemData,
  setMediaCollectionSortData,
  setOfflineData,
  setOnlineData,
  singleListData,
  singleListTreeData,
  updateBasicInfoData,
  updateContentInfoData,
  updateImageSortData,
  updateMediaInfoData,
  updateMediaItemData,
  updateRenderTypeData,
  updateSortData,
} from '@/services/article';

export default {
  namespace: 'article',

  state: {
    ...tacitlyState,
  },

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);

      yield put({
        type: reducerCommonNameCollection.handlePageListData,
        payload: response,
      });
    },
    *singleList({ payload }, { call, put }) {
      const response = yield call(singleListData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
    *singleListTree({ payload }, { call, put }) {
      const response = yield call(singleListTreeData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *addBasicInfo({ payload }, { call, put }) {
      const response = yield call(addBasicInfoData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateBasicInfo({ payload }, { call, put }) {
      const response = yield call(updateBasicInfoData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateContentInfo({ payload }, { call, put }) {
      const response = yield call(updateContentInfoData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateMediaInfo({ payload }, { call, put }) {
      const response = yield call(updateMediaInfoData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateSort({ payload }, { call, put }) {
      const response = yield call(updateSortData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateImageSort({ payload }, { call, put }) {
      const response = yield call(updateImageSortData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateRenderType({ payload }, { call, put }) {
      const response = yield call(updateRenderTypeData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *setOnline({ payload }, { call, put }) {
      const response = yield call(setOnlineData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *setOffline({ payload }, { call, put }) {
      const response = yield call(setOfflineData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *refreshCache({ payload }, { call, put }) {
      const response = yield call(refreshCacheData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(removeData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *getMediaItem({ payload }, { call, put }) {
      const response = yield call(getMediaItemData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *addMediaItem({ payload }, { call, put }) {
      const response = yield call(addMediaItemData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *updateMediaItem({ payload }, { call, put }) {
      const response = yield call(updateMediaItemData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *setMediaCollectionSort({ payload }, { call, put }) {
      const response = yield call(setMediaCollectionSortData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *removeMediaItem({ payload }, { call, put }) {
      const response = yield call(removeMediaItemData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *listImage({ payload }, { call, put }) {
      const response = yield call(listImageData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
    *addImage({ payload }, { call, put }) {
      const response = yield call(addImageData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *removeImage({ payload }, { call, put }) {
      const response = yield call(removeImageData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
