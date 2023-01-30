import {
  apiSuccessCode as apiSuccessCodeDefault,
  authenticationFailCode as authenticationFailCodeDefault,
  emptyLogo as emptyLogoImage,
} from '../utils/constants';

import { checkStringIsNullOrWhiteSpace, getAppInitConfigData } from './core';

export function logShowInConsole() {
  const appInit = getAppInitConfigData();
  const result = !!(appInit.showLogInConsole || false);

  return result;
}

export function getTinymceImagesUploadUrl() {
  const appInit = getAppInitConfigData();

  const { tinymceImagesUploadUrl } = {
    ...{ tinymceImagesUploadUrl: null },
    ...(appInit || {}),
  };

  return tinymceImagesUploadUrl || '';
}

export function getTinymceApiKey() {
  const appInit = getAppInitConfigData();

  const { tinymceApiKey } = {
    ...{ tinymceApiKey: '' },
    ...(appInit || {}),
  };

  return tinymceApiKey || '';
}

export function getUseNprogress() {
  const appInit = getAppInitConfigData();

  const { useNprogress } = {
    ...{ useNprogress: true },
    ...(appInit || {}),
  };

  return useNprogress;
}

export function getFileUploadMaxSize() {
  const appInit = getAppInitConfigData();

  const { fileUploadMaxSize } = {
    ...{ fileUploadMaxSize: 2 },
    ...(appInit || {}),
  };

  return fileUploadMaxSize || 2;
}

export function getAudioUploadMaxSize() {
  const appInit = getAppInitConfigData();

  const { audioUploadMaxSize } = {
    ...{ audioUploadMaxSize: 4 },
    ...(appInit || {}),
  };

  return audioUploadMaxSize || 4;
}

export function getVideoUploadMaxSize() {
  const appInit = getAppInitConfigData();

  const { videoUploadMaxSize } = {
    ...{ videoUploadMaxSize: 4 },
    ...(appInit || {}),
  };

  return videoUploadMaxSize || 4;
}

export function getImageUploadMaxSize() {
  const appInit = getAppInitConfigData();

  const { imageUploadMaxSize } = {
    ...{ imageUploadMaxSize: 2 },
    ...(appInit || {}),
  };

  return imageUploadMaxSize || 2;
}

export function getShowSelectLanguage() {
  const appInit = getAppInitConfigData();

  const { showSelectLanguage } = {
    ...{ showSelectLanguage: false },
    ...(appInit || {}),
  };

  return showSelectLanguage || false;
}

export function getShowLogoInEntrance() {
  const appInit = getAppInitConfigData();

  const { showLogoInEntrance } = {
    ...{ showLogoInEntrance: false },
    ...(appInit || {}),
  };

  return showLogoInEntrance || false;
}

export function getEmptyLogo() {
  const appInit = getAppInitConfigData();

  const { emptyLogo } = {
    ...{ emptyLogo: emptyLogoImage },
    ...(appInit || {}),
  };

  return emptyLogo || emptyLogoImage;
}

export function getApiSuccessCode() {
  const appInit = getAppInitConfigData();

  const { apiSuccessCode } = {
    ...{ apiSuccessCode: apiSuccessCodeDefault },
    ...(appInit || {}),
  };

  return apiSuccessCode || apiSuccessCodeDefault;
}

export function getAuthenticationFailCode() {
  const appInit = getAppInitConfigData();

  const { authenticationFailCode } = {
    ...{
      authenticationFailCode: authenticationFailCodeDefault,
      ...(appInit || {}),
    },
  };

  return authenticationFailCode || authenticationFailCodeDefault;
}

export function getEntrancePath() {
  const appInit = getAppInitConfigData();

  const { entrancePath } = {
    ...{ entrancePath: '' },
    ...(appInit || {}),
  };

  return entrancePath || '';
}

export function getAppListDataPath() {
  const appInit = getAppInitConfigData();

  const { appListDataPath } = {
    ...{ appListDataPath: '' },
    ...(appInit || {}),
  };

  return appListDataPath || '';
}

export function getAppListData() {
  const appInit = getAppInitConfigData();

  const { appListData } = {
    ...{ appListData: '' },
    ...(appInit || {}),
  };

  return isArray(appListData) ? appListData : [];
}

export function getMetaDataPath() {
  const appInit = getAppInitConfigData();

  const { metaDataPath } = {
    ...{ metaDataPath: '' },
    ...(appInit || {}),
  };

  return metaDataPath || '';
}

export function getMetaData() {
  const appInit = getAppInitConfigData();

  const { metaData } = {
    ...{ metaData: '' },
    ...(appInit || {}),
  };

  return metaData || {};
}

export function getApiVersion() {
  const appInit = getAppInitConfigData();

  const { apiVersion } = {
    ...{ apiVersion: '' },
    ...(appInit || {}),
  };

  return apiVersion || '';
}

export function getUseVirtualRequest() {
  const appInit = getAppInitConfigData();

  const { useVirtualRequest } = {
    ...{ useVirtualRequest: false },
    ...(appInit || {}),
  };

  return useVirtualRequest || false;
}

export function getShowUseVirtualRequestMessage() {
  const appInit = getAppInitConfigData();

  const { showUseVirtualRequestMessage } = {
    ...{ showUseVirtualRequestMessage: false },
    ...(appInit || {}),
  };

  return showUseVirtualRequestMessage || false;
}

export function getShowLogInConsole() {
  const appInit = getAppInitConfigData();

  const { showLogInConsole } = {
    ...{ showLogInConsole: false },
    ...(appInit || {}),
  };

  return showLogInConsole || false;
}

export function getShowRequestInfo() {
  const appInit = getAppInitConfigData();

  const { showRequestInfo } = {
    ...{ showRequestInfo: false },
    ...(appInit || {}),
  };

  return showRequestInfo || false;
}

export function getPlatformName() {
  const appInit = getAppInitConfigData();

  const { platformName } = {
    ...{ platformName: '' },
    ...(appInit || {}),
  };

  return platformName || '';
}

export function getAppName() {
  const appInit = getAppInitConfigData();

  const { appName } = {
    ...{ appName: '' },
    ...(appInit || {}),
  };

  return appName || '';
}

export function getAppDescription() {
  const appInit = getAppInitConfigData();

  const { appDescription } = {
    ...{ appDescription: '' },
    ...(appInit || {}),
  };

  return appDescription || '';
}

export function getEntranceLogo() {
  const appInit = getAppInitConfigData();

  const { entranceLogo } = {
    ...{ entranceLogo: emptyLogoImage },
    ...(appInit || {}),
  };

  return entranceLogo || emptyLogoImage;
}

export function getShareLogo() {
  const appInit = getAppInitConfigData();

  const { shareLogo } = {
    ...{ shareLogo: emptyLogoImage },
    ...(appInit || {}),
  };

  return shareLogo || emptyLogoImage;
}

export function getShareLogoName() {
  const appInit = getAppInitConfigData();

  const { shareLogoName } = {
    ...{ shareLogoName: '' },
    ...(appInit || {}),
  };

  return shareLogoName || '';
}

export function getCompanyName() {
  const appInit = getAppInitConfigData();

  const { companyName } = {
    ...{ companyName: '' },
    ...(appInit || {}),
  };

  return companyName || '';
}

export function getLeftBarLogo(remoteLogo) {
  if (!checkStringIsNullOrWhiteSpace(remoteLogo || null)) {
    return remoteLogo;
  }

  const appInit = getAppInitConfigData();

  const { leftBarLogo } = {
    ...{ leftBarLogo: emptyLogoImage },
    ...(appInit || {}),
  };

  return leftBarLogo || emptyLogoImage;
}

export function getLeftBarText() {
  const appInit = getAppInitConfigData();

  const { leftBarText } = {
    ...{ leftBarText: '' },
    ...(appInit || {}),
  };

  return leftBarText || '';
}

export function getCopyright() {
  const appInit = getAppInitConfigData();

  const { copyright } = {
    ...{ copyright: '' },
    ...(appInit || {}),
  };

  return copyright || '';
}

export function getLayoutSetting() {
  const appInit = getAppInitConfigData();

  const { layoutSetting } = {
    ...{
      layoutSetting: {},
    },
    ...(appInit || {}),
  };

  return layoutSetting || {};
}

export function getTitle() {
  const appInit = getAppInitConfigData();

  const { appName } = {
    ...{ appName: '' },
    ...(appInit || {}),
  };

  return appName || '';
}
