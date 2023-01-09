import { getModelNameList } from 'antd-management-fast-common/es/utils/dva';
import {
  recordExecute,
  recordInfo,
  showInfoMessage,
} from 'antd-management-fast-common/es/utils/tools';

import { loadMetaData } from './metaDataAssist';
import { removeMetaDataCache } from './storageAssist';

let applicationInitComplete = false;
let showModelNameList = false;
let metaDataFirstLoadSuccess = false;

export function applicationInit() {
  if (applicationInitComplete) {
    return;
  }

  requestAnimationFrame(() => {
    const text = '初始数据正在努力加载中，需要一点点时间哦！';

    showInfoMessage({
      message: text,
      duration: 0.8,
    });
  });

  applicationInitComplete = true;

  recordExecute('applicationInit');

  if (!showModelNameList) {
    recordInfo(`current modelNameList: ${getModelNameList().join()}`);

    showModelNameList = true;
  }

  if (!metaDataFirstLoadSuccess) {
    removeMetaDataCache();

    loadMetaData({
      successCallback: () => {
        metaDataFirstLoadSuccess = true;
      },
    });
  }
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
