import {
  checkStringIsNullOrWhiteSpace,
  checkWhetherDevelopmentEnvironment,
  getApplicationMergeConfig,
  isArray,
  isBrowser,
  isObject,
  logError,
  redirectTo,
  setApplicationExternalConfigList,
  setApplicationInitialConfig,
  setAuthenticationFailCode,
  setAuthenticationFailHandler,
  setLoggerDisplaySwitch,
  setRuntimeDataStorage,
  setSuccessCode,
  setUrlGlobalPrefix,
  toNumber,
} from 'easy-soft-utility';

import { appInitDefault } from './constants';
import { setLocalStorageHandler } from './localStorageAssist';
import { setMessageDisplayMonitor } from './messageAssist';
import { setNavigationHandler } from './navigationAssist';
import { setNotificationDisplayMonitor } from './notificationAssist';
import { setRequestHandler } from './requestAssist';
import { setSessionStorageHandler } from './sessionStorageAssist';
import { getApiVersion, getSignInRoutePath } from './settingAssist';

function getShowLogInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}

function getSuccessCode() {
  const { successCode } = {
    successCode: appInitDefault.successCode,
    ...getApplicationMergeConfig(),
  };

  return toNumber(successCode || appInitDefault.successCode);
}

function getAuthenticationFailCode() {
  const { authenticationFailCode } = {
    authenticationFailCode: appInitDefault.authenticationFailCode,
    ...getApplicationMergeConfig(),
  };

  return toNumber(
    authenticationFailCode || appInitDefault.authenticationFailCode,
  );
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

  setSuccessCode(getSuccessCode());
  setAuthenticationFailCode(getAuthenticationFailCode());
  setAuthenticationFailHandler(() => {
    const signInRoutePath = getSignInRoutePath();

    if (checkStringIsNullOrWhiteSpace(signInRoutePath)) {
      logError(
        'signInRoutePath has not set yet, please set it in applicationConfig with key "signInRoutePath"',
      );
    }

    redirectTo(signInRoutePath);
  });

  setUrlGlobalPrefix(getApiVersion());

  setRequestHandler();
}
