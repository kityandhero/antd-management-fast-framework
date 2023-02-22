import {
  checkStringIsNullOrWhiteSpace,
  getApplicationMergeConfig,
  isArray,
} from 'easy-soft-utility';

import {
  apiSuccessCode as apiSuccessCodeDefault,
  authenticationFailCode as authenticationFailCodeDefault,
} from './constants';
import { emptyLogo as emptyLogoImage } from './mediaDefault';

export function logShowInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}

export function getTinymceImagesUploadUrl() {
  const { tinymceImagesUploadUrl } = {
    tinymceImagesUploadUrl: null,
    ...getApplicationMergeConfig(),
  };

  return tinymceImagesUploadUrl || '';
}

export function getTinymceApiKey() {
  const { tinymceApiKey } = {
    tinymceApiKey: '',
    ...getApplicationMergeConfig(),
  };

  return tinymceApiKey || '';
}

export function getUseNprogress() {
  const { useNprogress } = {
    useNprogress: true,
    ...getApplicationMergeConfig(),
  };

  return useNprogress;
}

export function getFileUploadMaxSize() {
  const { fileUploadMaxSize } = {
    fileUploadMaxSize: 2,
    ...getApplicationMergeConfig(),
  };

  return fileUploadMaxSize || 2;
}

export function getAudioUploadMaxSize() {
  const { audioUploadMaxSize } = {
    audioUploadMaxSize: 4,
    ...getApplicationMergeConfig(),
  };

  return audioUploadMaxSize || 4;
}

export function getVideoUploadMaxSize() {
  const { videoUploadMaxSize } = {
    videoUploadMaxSize: 4,
    ...getApplicationMergeConfig(),
  };

  return videoUploadMaxSize || 4;
}

export function getImageUploadMaxSize() {
  const { imageUploadMaxSize } = {
    imageUploadMaxSize: 2,
    ...getApplicationMergeConfig(),
  };

  return imageUploadMaxSize || 2;
}

export function getShowSelectLanguage() {
  const { showSelectLanguage } = {
    showSelectLanguage: false,
    ...getApplicationMergeConfig(),
  };

  return showSelectLanguage || false;
}

export function getShowLogoInEntrance() {
  const { showLogoInEntrance } = {
    showLogoInEntrance: false,
    ...getApplicationMergeConfig(),
  };

  return showLogoInEntrance || false;
}

export function getEmptyLogo() {
  const { emptyLogo } = {
    emptyLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return emptyLogo || emptyLogoImage;
}

export function getApiSuccessCode() {
  const { apiSuccessCode } = {
    apiSuccessCode: apiSuccessCodeDefault,
    ...getApplicationMergeConfig(),
  };

  return apiSuccessCode || apiSuccessCodeDefault;
}

export function getAuthenticationFailCode() {
  const { authenticationFailCode } = {
    authenticationFailCode: authenticationFailCodeDefault,
    ...getApplicationMergeConfig(),
  };

  return authenticationFailCode || authenticationFailCodeDefault;
}

export function getEntranceApi() {
  const { entranceApi } = {
    entranceApi: '',
    ...getApplicationMergeConfig(),
  };

  return entranceApi || '';
}

export function getApplicationListDataApi() {
  const { applicationListDataApi } = {
    applicationListDataApi: '',
    ...getApplicationMergeConfig(),
  };

  return applicationListDataApi || '';
}

export function getApplicationListData() {
  const { applicationListData } = {
    applicationListData: '',
    ...getApplicationMergeConfig(),
  };

  return isArray(applicationListData) ? applicationListData : [];
}

export function getMetaDataApi() {
  const { metaDataApi } = {
    metaDataApi: '',
    ...getApplicationMergeConfig(),
  };

  return metaDataApi || '';
}

export function getMetaData() {
  const { metaData } = {
    metaData: '',
    ...getApplicationMergeConfig(),
  };

  return metaData || {};
}

export function getCurrentOperatorApi() {
  const { currentOperatorApi } = {
    currentOperatorApi: '',
    ...getApplicationMergeConfig(),
  };

  return currentOperatorApi || '';
}

export function getApiVersion() {
  const { apiVersion } = {
    apiVersion: '',
    ...getApplicationMergeConfig(),
  };

  return apiVersion || '';
}

export function getUseSimulateRequest() {
  const { useSimulateRequest } = {
    useSimulateRequest: false,
    ...getApplicationMergeConfig(),
  };

  return useSimulateRequest || false;
}

export function getPromptSimulateRequestScene() {
  const { promptSimulation } = {
    promptSimulation: false,
    ...getApplicationMergeConfig(),
  };

  return promptSimulation || false;
}

export function getShowLogInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}

export function getShowRequestInfo() {
  const { showRequestInfo } = {
    showRequestInfo: false,
    ...getApplicationMergeConfig(),
  };

  return showRequestInfo || false;
}

export function getPlatformName() {
  const { platformName } = {
    platformName: '',
    ...getApplicationMergeConfig(),
  };

  return platformName || '';
}

export function getAppName() {
  const { appName } = {
    appName: '',
    ...getApplicationMergeConfig(),
  };

  return appName || '';
}

export function getAppDescription() {
  const { appDescription } = {
    appDescription: '',
    ...getApplicationMergeConfig(),
  };

  return appDescription || '';
}

export function getEntranceLogo() {
  const { entranceLogo } = {
    entranceLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return entranceLogo || emptyLogoImage;
}

export function getShareLogo() {
  const { shareLogo } = {
    shareLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return shareLogo || emptyLogoImage;
}

export function getShareLogoName() {
  const { shareLogoName } = {
    shareLogoName: '',
    ...getApplicationMergeConfig(),
  };

  return shareLogoName || '';
}

export function getCompanyName() {
  const { companyName } = {
    companyName: '',
    ...getApplicationMergeConfig(),
  };

  return companyName || '';
}

export function getLeftBarLogo(remoteLogo) {
  if (!checkStringIsNullOrWhiteSpace(remoteLogo || null)) {
    return remoteLogo;
  }

  const { leftBarLogo } = {
    leftBarLogo: emptyLogoImage,
    ...getApplicationMergeConfig(),
  };

  return leftBarLogo || emptyLogoImage;
}

export function getLeftBarText() {
  const { leftBarText } = {
    leftBarText: '',
    ...getApplicationMergeConfig(),
  };

  return leftBarText || '';
}

export function getCopyright() {
  const { copyright } = {
    copyright: '',
    ...getApplicationMergeConfig(),
  };

  return copyright || '';
}

export function getLayoutSetting() {
  const { layoutSetting } = {
    layoutSetting: {},
    ...getApplicationMergeConfig(),
  };

  return layoutSetting || {};
}

export function getTitle() {
  const { appName } = {
    appName: '',
    ...getApplicationMergeConfig(),
  };

  return appName || '';
}
