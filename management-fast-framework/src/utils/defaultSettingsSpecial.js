import { getAppInitConfigData, stringIsNullOrWhiteSpace } from './tools';
import {
  apiSuccessCode as apiSuccessCodeDefault,
  authenticationFailCode as authenticationFailCodeDefault,
  emptyLogo as emptyLogoImage,
} from './constants';

export const defaultSettingsLayoutCustom = {
  emptyLogo: emptyLogoImage,
  leftBarLogo: emptyLogoImage,
  getEmptyLogo: () => {
    const appInit = getAppInitConfigData();

    const { emptyLogo } = {
      ...{ emptyLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return emptyLogo || emptyLogoImage;
  },
  getApiSuccessCode: () => {
    const appInit = getAppInitConfigData();

    const { apiSuccessCode } = {
      ...{ apiSuccessCode: apiSuccessCodeDefault },
      ...(appInit || {}),
    };

    return apiSuccessCode || apiSuccessCodeDefault;
  },
  getAuthenticationFailCode: () => {
    const appInit = getAppInitConfigData();

    const { authenticationFailCode } = {
      ...{
        authenticationFailCode: authenticationFailCodeDefault,
        ...(appInit || {}),
      },
    };

    return authenticationFailCode || authenticationFailCodeDefault;
  },
  getLoginPath: () => {
    const appInit = getAppInitConfigData();

    const { loginPath } = {
      ...{ loginPath: '' },
      ...(appInit || {}),
    };

    return loginPath || '';
  },
  getApiVersion: () => {
    const appInit = getAppInitConfigData();

    const { apiVersion } = {
      ...{ apiVersion: '' },
      ...(appInit || {}),
    };

    return apiVersion || '';
  },
  getUseVirtualRequest: () => {
    const appInit = getAppInitConfigData();

    const { useVirtualRequest } = {
      ...{ useVirtualRequest: false },
      ...(appInit || {}),
    };

    return useVirtualRequest || false;
  },
  getShowLogInConsole: () => {
    const appInit = getAppInitConfigData();

    const { showLogInConsole } = {
      ...{ showLogInConsole: false },
      ...(appInit || {}),
    };

    return showLogInConsole || false;
  },
  getShowRequestInfo: () => {
    const appInit = getAppInitConfigData();

    const { showRequestInfo } = {
      ...{ showRequestInfo: false },
      ...(appInit || {}),
    };

    return showRequestInfo || false;
  },
  getPlatformName: () => {
    const appInit = getAppInitConfigData();

    const { platformName } = {
      ...{ platformName: '' },
      ...(appInit || {}),
    };

    return platformName || '';
  },
  getAppName: () => {
    const appInit = getAppInitConfigData();

    const { appName } = {
      ...{ appName: '' },
      ...(appInit || {}),
    };

    return appName || '';
  },
  getAppDescription: () => {
    const appInit = getAppInitConfigData();

    const { appDescription } = {
      ...{ appDescription: '' },
      ...(appInit || {}),
    };

    return appDescription || '';
  },
  getTitle: () => {
    const appInit = getAppInitConfigData();

    const { appName } = {
      ...{ appName: '' },
      ...(appInit || {}),
    };

    return appName || '';
  },
  getLoginLogo: () => {
    const appInit = getAppInitConfigData();

    const { loginLogo } = {
      ...{ loginLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return loginLogo || emptyLogoImage;
  },
  getShareLogo: () => {
    const appInit = getAppInitConfigData();

    const { shareLogo } = {
      ...{ shareLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return shareLogo || emptyLogoImage;
  },
  getShareLogoName: () => {
    const appInit = getAppInitConfigData();

    const { shareLogoName } = {
      ...{ shareLogoName: '' },
      ...(appInit || {}),
    };

    return shareLogoName || '';
  },
  getCompanyName: () => {
    const appInit = getAppInitConfigData();

    const { companyName } = {
      ...{ companyName: '' },
      ...(appInit || {}),
    };

    return companyName || '';
  },
  getLeftBarLogo: (remoteLogo) => {
    if (!stringIsNullOrWhiteSpace(remoteLogo || null)) {
      return remoteLogo;
    }

    const appInit = getAppInitConfigData();

    const { leftBarLogo } = {
      ...{ leftBarLogo: emptyLogoImage },
      ...(appInit || {}),
    };

    return leftBarLogo || emptyLogoImage;
  },
  getLeftBarText: () => {
    const appInit = getAppInitConfigData();

    const { leftBarText } = {
      ...{ leftBarText: '' },
      ...(appInit || {}),
    };

    return leftBarText || '';
  },
  getCopyright: () => {
    const appInit = getAppInitConfigData();

    const { copyright } = {
      ...{ copyright: '' },
      ...(appInit || {}),
    };

    return copyright || '';
  },
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
