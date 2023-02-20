import {
  getApplicationMergeConfig,
  logConfig,
  logExecute,
  logInfo,
  removeLocalMetaData,
  showInfoMessage,
} from 'easy-soft-utility';

import { getModelNameList } from 'antd-management-fast-common';

import { loadApplicationListData } from './applicationListDataAssist';
import { removeApplicationListDataCache } from './applicationListDataCacheAssist';
import { loadMetaData } from './metaDataAssist';

let applicationInitComplete = false;
let showModelNameList = false;
let metaDataFirstLoadSuccess = false;
let applicationListDataFirstLoadSuccess = false;

export function applicationInit() {
  if (applicationInitComplete) {
    return;
  }

  logConfig(getApplicationMergeConfig());

  requestAnimationFrame(() => {
    const text = '初始数据正在努力加载中，需要一点点时间哦！';

    showInfoMessage({
      text: text,
      duration: 0.8,
    });
  });

  applicationInitComplete = true;

  logExecute('applicationInit');

  if (!showModelNameList) {
    logInfo(`current modelNameList: ${getModelNameList().join(',')}`);

    showModelNameList = true;
  }

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
