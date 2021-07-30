import defaultSettingsLayout from '@ant-design/pro-layout/lib/defaultSettings';

import { appInitCustom } from '../lib/utils/constants';

export const defaultSettings = {
  ...defaultSettingsLayout,
  ...{
    title: '标题',
    // navTheme: 'light',
    layout: 'top',
    fixSiderbar: true,
    contentWidth: 'Fluid',
    emptyLogo: '/EmptyLogo.png',
    getPlatformName: () => {
      let result = '';

      if ((appInitCustom || null) != null) {
        if ((appInitCustom.appName || null) != null) {
          const { platformName } = appInitCustom;

          result = platformName;
        }
      }

      return result || '';
    },
    getTitle: () => {
      let result = '商城管理系统';

      if ((appInitCustom || null) != null) {
        if ((appInitCustom.appName || null) != null) {
          const { appName } = appInitCustom;

          result = appName;
        }
      }

      return result || '';
    },
    getLoginLogo: () => {
      let result = '/Logo.png';

      if ((appInitCustom || null) != null) {
        if ((appInitCustom.appName || null) != null) {
          const { loginLogo } = appInitCustom;

          result = loginLogo;
        }
      }

      return result || '';
    },
    getShareLogo: () => {
      let result = '/shareLogo.png';

      if ((appInitCustom || null) != null) {
        if ((appInitCustom.appName || null) != null) {
          const { shareLogo } = appInitCustom;

          result = shareLogo;
        }
      }

      return result || '';
    },
    getShareLogoName: () => {
      let result = '';

      if ((appInitCustom || null) != null) {
        if ((appInitCustom.appName || null) != null) {
          const { shareLogoName } = appInitCustom;

          result = shareLogoName;
        }
      }

      return result || '';
    },
    getCompanyName: () => {
      let result = '';

      if ((appInitCustom || null) != null) {
        if ((appInitCustom.appName || null) != null) {
          const { companyName } = appInitCustom;

          result = companyName;
        }
      }

      return result || '';
    },
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
