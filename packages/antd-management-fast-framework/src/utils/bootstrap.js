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

  logExecute('loadApplicationInitialData');

  setTimeout(() => {
    const text = '数据正在初始化，需要一点点时间哦！';

    try {
      showInfoMessage({
        text: text,
        duration: 2,
      });
    } catch {
      // ignore
    }
  }, 300);

  loadApplicationInitialDataComplete = true;

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
