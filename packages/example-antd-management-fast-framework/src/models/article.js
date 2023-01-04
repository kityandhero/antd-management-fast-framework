import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import {
  pretreatmentRemoteListData,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
} from 'antd-management-fast-common/es/utils/requestAssistor';

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
    *pageList({ payload, alias }, { call, put }) {
      const response = yield call(pageListData, payload);

      const dataAdjust = pretreatmentRemotePageListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *singleList({ payload, alias }, { call, put }) {
      const response = yield call(singleListData, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *singleListTree({ payload, alias }, { call, put }) {
      const response = yield call(singleListTreeData, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *get({ payload, alias }, { call, put }) {
      const response = yield call(getData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *addBasicInfo({ payload, alias }, { call, put }) {
      const response = yield call(addBasicInfoData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateBasicInfo({ payload, alias }, { call, put }) {
      const response = yield call(updateBasicInfoData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateContentInfo({ payload, alias }, { call, put }) {
      const response = yield call(updateContentInfoData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateMediaInfo({ payload, alias }, { call, put }) {
      const response = yield call(updateMediaInfoData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateSort({ payload, alias }, { call, put }) {
      const response = yield call(updateSortData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateImageSort({ payload, alias }, { call, put }) {
      const response = yield call(updateImageSortData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateRenderType({ payload, alias }, { call, put }) {
      const response = yield call(updateRenderTypeData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *setOnline({ payload, alias }, { call, put }) {
      const response = yield call(setOnlineData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *setOffline({ payload, alias }, { call, put }) {
      const response = yield call(setOfflineData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *refreshCache({ payload, alias }, { call, put }) {
      const response = yield call(refreshCacheData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *remove({ payload, alias }, { call, put }) {
      const response = yield call(removeData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *getMediaItem({ payload, alias }, { call, put }) {
      const response = yield call(getMediaItemData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *addMediaItem({ payload, alias }, { call, put }) {
      const response = yield call(addMediaItemData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *updateMediaItem({ payload, alias }, { call, put }) {
      const response = yield call(updateMediaItemData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *setMediaCollectionSort({ payload, alias }, { call, put }) {
      const response = yield call(setMediaCollectionSortData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *removeMediaItem({ payload, alias }, { call, put }) {
      const response = yield call(removeMediaItemData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *listImage({ payload, alias }, { call, put }) {
      const response = yield call(listImageData, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *addImage({ payload, alias }, { call, put }) {
      const response = yield call(addImageData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *removeImage({ payload, alias }, { call, put }) {
      const response = yield call(removeImageData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
  },

  reducers: {
    ...reducerCollection,
  },
};
