import { defaultSettings as defaultSettingsLayout } from '@ant-design/pro-layout/lib/defaultSettings';

import { getLayoutSetting } from './settingAssist';

export function getLayoutSettings() {
  return {
    ...defaultSettingsLayout,

    onMenuHeaderClick: () => {},
    contentStyle: {
      padding: '0',
    },
    token: {
      // bgLayout: '',
      pageContainer: {
        colorBgPageContainer: '#f0f2f5',
      },
      // header: {
      //   colorBgHeader: '#292f33',
      //   colorHeaderTitle: '#fff',
      //   colorTextMenu: '#dfdfdf',
      //   colorTextMenuSecondary: '#dfdfdf',
      //   colorTextMenuSelected: '#fff',
      //   colorBgMenuItemSelected: '#22272b',
      //   colorTextMenuActive: 'rgba(255,255,255,0.85)',
      //   colorTextRightActionsItem: '#dfdfdf',
      // },
      // colorTextAppListIconHover: '#fff',
      // colorTextAppListIcon: '#dfdfdf',
      // sider: {
      //   colorMenuBackground: '#fff',
      //   colorMenuItemDivider: '#dfdfdf',
      //   colorBgMenuItemHover: '#f6f6f6',
      //   colorTextMenu: '#595959',
      //   colorTextMenuSelected: '#242424',
      //   colorTextMenuActive: '#242424',
      //   colorBgMenuItemCollapsedHover: '#242424',
      // },
    },
    ...getLayoutSetting(),
  };
}
