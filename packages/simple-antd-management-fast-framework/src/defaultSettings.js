import defaultSettingsLayout from '@ant-design/pro-layout/lib/defaultSettings';

import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';

export const defaultSettings = {
  ...defaultSettingsLayout,
  ...runtimeSettings,
  ...{
    title: '标题',
    // navTheme: 'light',
    // layout: 'top',
    fixSiderbar: true,
    contentWidth: 'Fluid',
    emptyLogo: '/EmptyLogo.png',
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
