import { _ as _objectSpread, e as emptyLogo, a as apiSuccessCode, b as authenticationFailCode } from './constants.js';
import { g as getAppInitConfigData, s as stringIsNullOrWhiteSpace } from './core.js';
import '@ant-design/icons';
import 'react';
import 'lodash';
import 'path-to-regexp';
import 'qs';

function getTinymceImagesUploadUrl() {
  var appInit = getAppInitConfigData();
  var _tinymceImagesUploadU = _objectSpread(_objectSpread({}, {
      tinymceImagesUploadUrl: null
    }), appInit || {}),
    tinymceImagesUploadUrl = _tinymceImagesUploadU.tinymceImagesUploadUrl;
  return tinymceImagesUploadUrl || '';
}
function getTinymceApiKey() {
  var appInit = getAppInitConfigData();
  var _tinymceApiKey = _objectSpread(_objectSpread({}, {
      tinymceApiKey: ''
    }), appInit || {}),
    tinymceApiKey = _tinymceApiKey.tinymceApiKey;
  return tinymceApiKey || '';
}
function getUseNprogress() {
  var appInit = getAppInitConfigData();
  var _useNprogress = _objectSpread(_objectSpread({}, {
      useNprogress: true
    }), appInit || {}),
    useNprogress = _useNprogress.useNprogress;
  return useNprogress;
}
function getFileUploadMaxSize() {
  var appInit = getAppInitConfigData();
  var _fileUploadMaxSize = _objectSpread(_objectSpread({}, {
      fileUploadMaxSize: 2
    }), appInit || {}),
    fileUploadMaxSize = _fileUploadMaxSize.fileUploadMaxSize;
  return fileUploadMaxSize || 2;
}
function getAudioUploadMaxSize() {
  var appInit = getAppInitConfigData();
  var _audioUploadMaxSize = _objectSpread(_objectSpread({}, {
      audioUploadMaxSize: 4
    }), appInit || {}),
    audioUploadMaxSize = _audioUploadMaxSize.audioUploadMaxSize;
  return audioUploadMaxSize || 4;
}
function getVideoUploadMaxSize() {
  var appInit = getAppInitConfigData();
  var _videoUploadMaxSize = _objectSpread(_objectSpread({}, {
      videoUploadMaxSize: 4
    }), appInit || {}),
    videoUploadMaxSize = _videoUploadMaxSize.videoUploadMaxSize;
  return videoUploadMaxSize || 4;
}
function getImageUploadMaxSize() {
  var appInit = getAppInitConfigData();
  var _imageUploadMaxSize = _objectSpread(_objectSpread({}, {
      imageUploadMaxSize: 2
    }), appInit || {}),
    imageUploadMaxSize = _imageUploadMaxSize.imageUploadMaxSize;
  return imageUploadMaxSize || 2;
}
function getShowSelectLanguage() {
  var appInit = getAppInitConfigData();
  var _showSelectLanguage = _objectSpread(_objectSpread({}, {
      showSelectLanguage: false
    }), appInit || {}),
    showSelectLanguage = _showSelectLanguage.showSelectLanguage;
  return showSelectLanguage || false;
}
function getShowLogoInEntrance() {
  var appInit = getAppInitConfigData();
  var _showLogoInEntrance = _objectSpread(_objectSpread({}, {
      showLogoInEntrance: false
    }), appInit || {}),
    showLogoInEntrance = _showLogoInEntrance.showLogoInEntrance;
  return showLogoInEntrance || false;
}
function getEmptyLogo() {
  var appInit = getAppInitConfigData();
  var _emptyLogo = _objectSpread(_objectSpread({}, {
      emptyLogo: emptyLogo
    }), appInit || {}),
    emptyLogo$1 = _emptyLogo.emptyLogo;
  return emptyLogo$1 || emptyLogo;
}
function getApiSuccessCode() {
  var appInit = getAppInitConfigData();
  var _apiSuccessCode = _objectSpread(_objectSpread({}, {
      apiSuccessCode: apiSuccessCode
    }), appInit || {}),
    apiSuccessCode$1 = _apiSuccessCode.apiSuccessCode;
  return apiSuccessCode$1 || apiSuccessCode;
}
function getAuthenticationFailCode() {
  var appInit = getAppInitConfigData();
  var _authenticationFailCo = _objectSpread({}, _objectSpread({
      authenticationFailCode: authenticationFailCode
    }, appInit || {})),
    authenticationFailCode$1 = _authenticationFailCo.authenticationFailCode;
  return authenticationFailCode$1 || authenticationFailCode;
}
function getEntrancePath() {
  var appInit = getAppInitConfigData();
  var _entrancePath = _objectSpread(_objectSpread({}, {
      entrancePath: ''
    }), appInit || {}),
    entrancePath = _entrancePath.entrancePath;
  return entrancePath || '';
}
function getApiVersion() {
  var appInit = getAppInitConfigData();
  var _apiVersion = _objectSpread(_objectSpread({}, {
      apiVersion: ''
    }), appInit || {}),
    apiVersion = _apiVersion.apiVersion;
  return apiVersion || '';
}
function getUseVirtualRequest() {
  var appInit = getAppInitConfigData();
  var _useVirtualRequest = _objectSpread(_objectSpread({}, {
      useVirtualRequest: false
    }), appInit || {}),
    useVirtualRequest = _useVirtualRequest.useVirtualRequest;
  return useVirtualRequest || false;
}
function getShowUseVirtualRequestMessage() {
  var appInit = getAppInitConfigData();
  var _showUseVirtualReques = _objectSpread(_objectSpread({}, {
      showUseVirtualRequestMessage: false
    }), appInit || {}),
    showUseVirtualRequestMessage = _showUseVirtualReques.showUseVirtualRequestMessage;
  return showUseVirtualRequestMessage || false;
}
function getShowLogInConsole() {
  var appInit = getAppInitConfigData();
  var _showLogInConsole = _objectSpread(_objectSpread({}, {
      showLogInConsole: false
    }), appInit || {}),
    showLogInConsole = _showLogInConsole.showLogInConsole;
  return showLogInConsole || false;
}
function getShowRequestInfo() {
  var appInit = getAppInitConfigData();
  var _showRequestInfo = _objectSpread(_objectSpread({}, {
      showRequestInfo: false
    }), appInit || {}),
    showRequestInfo = _showRequestInfo.showRequestInfo;
  return showRequestInfo || false;
}
function getPlatformName() {
  var appInit = getAppInitConfigData();
  var _platformName = _objectSpread(_objectSpread({}, {
      platformName: ''
    }), appInit || {}),
    platformName = _platformName.platformName;
  return platformName || '';
}
function getAppName() {
  var appInit = getAppInitConfigData();
  var _appName = _objectSpread(_objectSpread({}, {
      appName: ''
    }), appInit || {}),
    appName = _appName.appName;
  return appName || '';
}
function getAppDescription() {
  var appInit = getAppInitConfigData();
  var _appDescription = _objectSpread(_objectSpread({}, {
      appDescription: ''
    }), appInit || {}),
    appDescription = _appDescription.appDescription;
  return appDescription || '';
}
function getTitle() {
  var appInit = getAppInitConfigData();
  var _appName2 = _objectSpread(_objectSpread({}, {
      appName: ''
    }), appInit || {}),
    appName = _appName2.appName;
  return appName || '';
}
function getEntranceLogo() {
  var appInit = getAppInitConfigData();
  var _entranceLogo = _objectSpread(_objectSpread({}, {
      entranceLogo: emptyLogo
    }), appInit || {}),
    entranceLogo = _entranceLogo.entranceLogo;
  return entranceLogo || emptyLogo;
}
function getShareLogo() {
  var appInit = getAppInitConfigData();
  var _shareLogo = _objectSpread(_objectSpread({}, {
      shareLogo: emptyLogo
    }), appInit || {}),
    shareLogo = _shareLogo.shareLogo;
  return shareLogo || emptyLogo;
}
function getShareLogoName() {
  var appInit = getAppInitConfigData();
  var _shareLogoName = _objectSpread(_objectSpread({}, {
      shareLogoName: ''
    }), appInit || {}),
    shareLogoName = _shareLogoName.shareLogoName;
  return shareLogoName || '';
}
function getCompanyName() {
  var appInit = getAppInitConfigData();
  var _companyName = _objectSpread(_objectSpread({}, {
      companyName: ''
    }), appInit || {}),
    companyName = _companyName.companyName;
  return companyName || '';
}
function getLeftBarLogo(remoteLogo) {
  if (!stringIsNullOrWhiteSpace(remoteLogo || null)) {
    return remoteLogo;
  }
  var appInit = getAppInitConfigData();
  var _leftBarLogo = _objectSpread(_objectSpread({}, {
      leftBarLogo: emptyLogo
    }), appInit || {}),
    leftBarLogo = _leftBarLogo.leftBarLogo;
  return leftBarLogo || emptyLogo;
}
function getLeftBarText() {
  var appInit = getAppInitConfigData();
  var _leftBarText = _objectSpread(_objectSpread({}, {
      leftBarText: ''
    }), appInit || {}),
    leftBarText = _leftBarText.leftBarText;
  return leftBarText || '';
}
function getCopyright() {
  var appInit = getAppInitConfigData();
  var _copyright = _objectSpread(_objectSpread({}, {
      copyright: ''
    }), appInit || {}),
    copyright = _copyright.copyright;
  return copyright || '';
}

var defaultSettingsLayoutCustom = {
  getTinymceImagesUploadUrl: getTinymceImagesUploadUrl,
  getTinymceApiKey: getTinymceApiKey,
  getUseNprogress: getUseNprogress,
  getFileUploadMaxSize: getFileUploadMaxSize,
  getAudioUploadMaxSize: getAudioUploadMaxSize,
  getVideoUploadMaxSize: getVideoUploadMaxSize,
  getImageUploadMaxSize: getImageUploadMaxSize,
  getShowSelectLanguage: getShowSelectLanguage,
  getShowLogoInEntrance: getShowLogoInEntrance,
  getEmptyLogo: getEmptyLogo,
  getApiSuccessCode: getApiSuccessCode,
  getAuthenticationFailCode: getAuthenticationFailCode,
  getEntrancePath: getEntrancePath,
  getApiVersion: getApiVersion,
  getUseVirtualRequest: getUseVirtualRequest,
  getShowUseVirtualRequestMessage: getShowUseVirtualRequestMessage,
  getShowLogInConsole: getShowLogInConsole,
  getShowRequestInfo: getShowRequestInfo,
  getPlatformName: getPlatformName,
  getAppName: getAppName,
  getAppDescription: getAppDescription,
  getTitle: getTitle,
  getEntranceLogo: getEntranceLogo,
  getShareLogo: getShareLogo,
  getShareLogoName: getShareLogoName,
  getCompanyName: getCompanyName,
  getLeftBarLogo: getLeftBarLogo,
  getLeftBarText: getLeftBarText,
  getCopyright: getCopyright
};

export { defaultSettingsLayoutCustom as d };
