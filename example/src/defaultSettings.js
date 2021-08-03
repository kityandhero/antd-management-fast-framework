import defaultSettingsLayout from '@ant-design/pro-layout/lib/defaultSettings';

import { defaultSettingsLayoutCustom } from '@antd-management-fast-framework/utils/defaultSettingsSpecial';

export const defaultSettings = {
  ...defaultSettingsLayout,
  ...defaultSettingsLayoutCustom,
  ...{
    title: '标题',
    // navTheme: 'light',
    layout: 'top',
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
