import { defaultSettings as defaultSettingsLayout } from '@ant-design/pro-layout/lib/defaultSettings';

import {
  getApiSuccessCode,
  getApiVersion,
  getAppDescription,
  getAppListData,
  getAppListDataPath,
  getAppName,
  getAudioUploadMaxSize,
  getAuthenticationFailCode,
  getCompanyName,
  getCopyright,
  getEmptyLogo,
  getEntranceLogo,
  getEntrancePath,
  getFileUploadMaxSize,
  getImageUploadMaxSize,
  getLayoutSetting,
  getLeftBarLogo,
  getLeftBarText,
  getMetaData,
  getMetaDataPath,
  getPlatformName,
  getShareLogo,
  getShareLogoName,
  getShowLogInConsole,
  getShowLogoInEntrance,
  getShowRequestInfo,
  getShowSelectLanguage,
  getShowUseVirtualRequestMessage,
  getTinymceApiKey,
  getTinymceImagesUploadUrl,
  getTitle,
  getUseNprogress,
  getUseVirtualRequest,
  getVideoUploadMaxSize,
} from './appConfiguration';

export const runtimeSettings = {
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
  getAppListData: getAppListData,
  getAppListDataPath: getAppListDataPath,
  getMetaDataPath: getMetaDataPath,
  getMetaData: getMetaData,
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
  getCopyright: getCopyright,
};

export const layoutSettings = {
  ...defaultSettingsLayout,
  ...{
    onMenuHeaderClick: () => {},
    contentStyle: {
      padding: '0',
    },
  },
  ...(getLayoutSetting() || {}),
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
