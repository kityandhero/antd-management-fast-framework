import {
  logExecute,
  removeLocalMetaData,
  showInfoMessage,
} from 'easy-soft-utility';

import { loadApplicationListData } from './applicationListDataAssist';
import { removeApplicationListDataCache } from './applicationListDataCacheAssist';
import { loadMetaData } from './metaDataAssist';

let loadApplicationInitialDataComplete = false;
let metaDataFirstLoadSuccess = false;
let applicationListDataFirstLoadSuccess = false;

/**
 * Load application initial data after sign in, make sure to call after sign in
 */
export function loadApplicationInitialData() {
  if (loadApplicationInitialDataComplete) {
    return;
  }

  requestAnimationFrame(() => {
    const text = '初始数据正在努力加载中，需要一点点时间哦！';

    showInfoMessage({
      text: text,
      duration: 2,
    });
  });

  loadApplicationInitialDataComplete = true;

  logExecute('loadApplicationInitialData');

  if (!metaDataFirstLoadSuccess) {
    removeLocalMetaData();

    loadMetaData({
      successCallback: () => {
        metaDataFirstLoadSuccess = true;
      },
    });
  }

  if (!applicationListDataFirstLoadSuccess) {
    removeApplicationListDataCache();

    loadApplicationListData({
      successCallback: () => {
        applicationListDataFirstLoadSuccess = true;
      },
    });
  }
}
