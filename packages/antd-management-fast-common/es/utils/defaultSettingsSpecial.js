import { getTinymceImagesUploadUrl, getTinymceApiKey, getUseNprogress, getFileUploadMaxSize, getAudioUploadMaxSize, getVideoUploadMaxSize, getImageUploadMaxSize, getShowSelectLanguage, getShowLogoInEntrance, getEmptyLogo, getApiSuccessCode, getAuthenticationFailCode, getEntrancePath, getApiVersion, getUseVirtualRequest, getShowUseVirtualRequestMessage, getShowLogInConsole, getShowRequestInfo, getPlatformName, getAppName, getAppDescription, getTitle, getEntranceLogo, getShareLogo, getShareLogoName, getCompanyName, getLeftBarLogo, getLeftBarText, getCopyright } from './appConfiguration.js';
import '../constants.js';
import '@ant-design/icons';
import 'react';
import './mediaDefault.js';
import './core.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import './typeCheck.js';

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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { defaultSettingsLayoutCustom, empty };
