import {
  checkWhetherDevelopmentEnvironment,
  getApplicationMergeConfig,
  isArray,
  isBrowser,
  isObject,
  setApplicationExternalConfigList,
  setApplicationInitialConfig,
  setLoggerDisplaySwitch,
  setRuntimeDataStorage,
  setUrlGlobalPrefix,
} from 'easy-soft-utility';

import { appInitDefault } from './constants';
import { setLocalStorageHandler } from './localStorageAssist';
import { setMessageDisplayMonitor } from './messageAssist';
import { setNavigationHandler } from './navigationAssist';
import { setNotificationDisplayMonitor } from './notificationAssist';
import { setRequestHandler } from './requestAssist';
import { setSessionStorageHandler } from './sessionStorageAssist';
import { getApiVersion } from './settingAssist';

function getShowLogInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}

function getExternalConfigs() {
  const list = [];

  if (isBrowser()) {
    if (isObject(window.appInitCustomLocalCore)) {
      list.push(window.appInitCustomLocalCore);
    }

    if (isObject(window.appInitCustomLocalSpecial)) {
      list.push(window.appInitCustomLocalSpecial);
    }

    if (isObject(window.appInitCustomRemote)) {
      list.push(window.appInitCustomRemote);
    }

    const applicationListData = [
      ...(isArray(appInitDefault.applicationListData)
        ? appInitDefault.applicationListData
        : []),
      ...((window.appInitCustomLocalCore || null) == null
        ? []
        : isArray(window.appInitCustomLocalCore.applicationListData)
        ? window.appInitCustomLocalCore.applicationListData
        : []),
      ...((window.appInitCustomLocalSpecial || null) == null
        ? []
        : isArray(window.appInitCustomLocalSpecial.applicationListData)
        ? window.appInitCustomLocalSpecial.applicationListData
        : []),
      ...((window.appInitCustomRemote || null) == null
        ? []
        : isArray(window.appInitCustomRemote.applicationListData)
        ? window.appInitCustomRemote.applicationListData
        : []),
    ];

    list.push({ applicationListData });
  }

  return list;
}

/**
 * 设置 easy-soft-utility 处理器
 */
export function setEasySoftUtilityHandler() {
  setLocalStorageHandler();

  setSessionStorageHandler();

  setNavigationHandler();

  setRuntimeDataStorage(window);

  setApplicationInitialConfig({
    ...appInitDefault,
    showLogInConsole: checkWhetherDevelopmentEnvironment(),
  });

  const externalConfigList = getExternalConfigs();

  setApplicationExternalConfigList(externalConfigList);

  setLoggerDisplaySwitch(getShowLogInConsole());

  setMessageDisplayMonitor();

  setNotificationDisplayMonitor();

  setUrlGlobalPrefix(getApiVersion());

  setRequestHandler();
}
