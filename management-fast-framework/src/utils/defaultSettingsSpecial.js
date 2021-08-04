import { getAppInitConfigData } from './tools';
import { authenticationFailCode } from './constants';

export const defaultSettingsLayoutCustom = {
  getAuthenticationFailCode: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      result = appInit.authenticationFailCode || authenticationFailCode;
    }

    return result || authenticationFailCode;
  },
  getLoginPath: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      result = appInit.loginPath || '';
    }

    return result || '';
  },
  getApiVersion: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      result = appInit.apiVersion || '';
    }

    return result || '';
  },
  getUseVirtualRequest: () => {
    let result = false;

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      result = !!(appInit.useVirtualRequest || false);
    }

    return result || false;
  },
  getShowLogInConsole: () => {
    let result = false;

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      result = !!(appInit.showLogInConsole || false);
    }

    return result || false;
  },
  getShowRequestInfo: () => {
    let result = false;

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      result = !!(appInit.showRequestInfo || false);
    }

    return result || false;
  },
  getPlatformName: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.platformName || null) != null) {
        const { platformName } = appInit;

        result = platformName;
      }
    }

    return result || '';
  },
  getAppName: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appName || null) != null) {
        const { appName } = appInit;

        result = appName;
      }
    }

    return result || '';
  },
  getAppDescription: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appDescription || null) != null) {
        const { appDescription } = appInit;

        result = appDescription;
      }
    }

    return result || '';
  },
  getTitle: () => {
    let result = '商城管理系统';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appName || null) != null) {
        const { appName } = appInit;

        result = appName;
      }
    }

    return result || '';
  },
  getLoginLogo: () => {
    let result = '/Logo.png';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appName || null) != null) {
        const { loginLogo } = appInit;

        result = loginLogo;
      }
    }

    return result || '';
  },
  getShareLogo: () => {
    let result = '/shareLogo.png';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appName || null) != null) {
        const { shareLogo } = appInit;

        result = shareLogo;
      }
    }

    return result || '';
  },
  getShareLogoName: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appName || null) != null) {
        const { shareLogoName } = appInit;

        result = shareLogoName;
      }
    }

    return result || '';
  },
  getCompanyName: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.appName || null) != null) {
        const { companyName } = appInit;

        result = companyName;
      }
    }

    return result || '';
  },
  getLeftBarText: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.leftBarText || null) != null) {
        const { leftBarText } = appInit;

        result = leftBarText;
      }
    }

    return result || '';
  },
  getCopyright: () => {
    let result = '';

    const appInit = getAppInitConfigData();

    if ((appInit || null) != null) {
      if ((appInit.copyright || null) != null) {
        const { copyright } = appInit;

        result = copyright;
      }
    }

    return result || '';
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
