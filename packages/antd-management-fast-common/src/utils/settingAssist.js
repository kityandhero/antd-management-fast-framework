import {
  checkStringIsNullOrWhiteSpace,
  getApplicationMergeConfig,
  isArray,
  isObject,
} from 'easy-soft-utility';

import { authenticationFailCode as authenticationFailCodeDefault } from './constants';
import { emptyLogo as emptyLogoImage } from './mediaDefault';

/**
 * get cors domain
 */
export function getCorsDomain() {
  const appInit = getApplicationMergeConfig();

  let corsTargetDomain = '';

  if (appInit.apiPrefix != null && appInit.apiPrefix.corsTargetDomain != null) {
    const {
      apiPrefix: { corsTargetDomain: corsTargetDomainRemote },
    } = appInit;

    corsTargetDomain = corsTargetDomainRemote;
  }

  return corsTargetDomain;
}

export function getLocalStorageSecretSwitch() {
  const { localStorageSecretSwitch } = {
    localStorageSecretSwitch: true,
    ...getApplicationMergeConfig(),
  };

  return localStorageSecretSwitch || false;
}

export function logShowInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}

export function getTinymceScriptSource() {
  const { tinymceScriptSrc } = {
    tinymceScriptSrc: null,
    ...getApplicationMergeConfig(),
  };

  return tinymceScriptSrc || '';
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

export function getTinymceLanguage() {
  const { tinymceLanguage } = {
    tinymceLanguage: '',
    ...getApplicationMergeConfig(),
  };

  return tinymceLanguage || '';
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

export function getAuthenticationFailCode() {
  const { authenticationFailCode } = {
    authenticationFailCode: authenticationFailCodeDefault,
    ...getApplicationMergeConfig(),
  };

  return authenticationFailCode || authenticationFailCodeDefault;
}

export function getTokenName() {
  const { tokenName } = {
    tokenName: 'token',
    ...getApplicationMergeConfig(),
  };

  return tokenName || 'token';
}

export function getSignInApi() {
  const { signInApi } = {
    signInApi: '',
    ...getApplicationMergeConfig(),
  };

  return signInApi || '';
}

export function getSignInCaptchaApi() {
  const { signInCaptchaApi } = {
    signInCaptchaApi: '',
    ...getApplicationMergeConfig(),
  };

  return signInCaptchaApi || '';
}

export function getSignOutApi() {
  const { signOutApi } = {
    signOutApi: '',
    ...getApplicationMergeConfig(),
  };

  return signOutApi || '';
}

export function getSignInSimulationData() {
  const { signInSimulationData } = {
    signInSimulationData: {},
    ...getApplicationMergeConfig(),
  };

  return isObject(signInSimulationData) ? signInSimulationData : {};
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

export function getPresetMetaData() {
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

export function getCurrentOperatorSimulationData() {
  const { currentOperatorSimulationData } = {
    currentOperatorSimulationData: {},
    ...getApplicationMergeConfig(),
  };

  return isObject(currentOperatorSimulationData)
    ? currentOperatorSimulationData
    : {};
}

export function getApiVersion() {
  const { apiVersion } = {
    apiVersion: '',
    ...getApplicationMergeConfig(),
  };

  return apiVersion || '';
}

export function getAuthenticationFailRedirectPath() {
  const { authenticationFailRedirectPath } = {
    authenticationFailRedirectPath: '',
    ...getApplicationMergeConfig(),
  };

  return authenticationFailRedirectPath || '';
}

export function getAuthorizationFailRedirectPath() {
  const { authorizationFailRedirectPath } = {
    authorizationFailRedirectPath: '',
    ...getApplicationMergeConfig(),
  };

  return authorizationFailRedirectPath || '';
}

export function getShowLogInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
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

  return {
    ...layoutSetting,
  };
}

export function getTitle() {
  const { appName } = {
    appName: '',
    ...getApplicationMergeConfig(),
  };

  return appName || '';
}

export function getUseShortcutNavigation() {
  const { useShortcutNavigation } = {
    useShortcutNavigation: false,
    ...getApplicationMergeConfig(),
  };

  return !!useShortcutNavigation || false;
}
