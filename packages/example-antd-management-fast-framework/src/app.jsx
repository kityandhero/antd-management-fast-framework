import React from 'react';

import { analysisRoute } from 'antd-management-fast-common';
import { AnchorLink } from 'antd-management-fast-component';
import {
  ApplicationWrapper,
  getLayoutSetting,
} from 'antd-management-fast-framework';

import { MenuCard } from './components/MenuCard';
import { getLogo, getTitle } from './utils/tools';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档:https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

export function rootContainer(container) {
  return React.createElement(ApplicationWrapper, null, container);
}

export function onRouteChange({
  location,
  clientRoutes,
  routes,
  action,
  basename,
}) {
  analysisRoute({
    location,
    clientRoutes,
    routes,
    action,
    basename,
  });
}

export const layout = ({ initialState, setInitialState }) => {
  return getLayoutSetting({
    logo: getLogo(),
    title: getTitle(),
    water: 'test',
    initialState: initialState || {},
    setInitialState,
    // themeToken: {
    //   colorBgAppListIconHover: 'rgba(0,0,0,0.06)',
    //   colorTextAppListIconHover: 'rgba(255,255,255,0.95)',
    //   colorTextAppListIcon: 'rgba(255,255,255,0.85)',
    //   sider: {
    //     colorBgCollapsedButton: '#fff',
    //     colorTextCollapsedButtonHover: 'rgba(0,0,0,0.65)',
    //     colorTextCollapsedButton: 'rgba(0,0,0,0.45)',
    //     colorMenuBackground: '#004FD9',
    //     colorBgMenuItemCollapsedHover: 'rgba(0,0,0,0.06)',
    //     colorBgMenuItemCollapsedSelected: 'rgba(0,0,0,0.15)',
    //     colorBgMenuItemCollapsedElevated: 'rgba(0,0,0,0.85)',
    //     colorMenuItemDivider: 'rgba(255,255,255,0.15)',
    //     colorBgMenuItemHover: 'rgba(0,0,0,0.06)',
    //     colorBgMenuItemSelected: 'rgba(0,0,0,0.15)',
    //     colorTextMenuSelected: '#fff',
    //     colorTextMenuItemHover: 'rgba(255,255,255,0.75)',
    //     colorTextMenu: 'rgba(255,255,255,0.75)',
    //     colorTextMenuSecondary: 'rgba(255,255,255,0.65)',
    //     colorTextMenuTitle: 'rgba(255,255,255,0.95)',
    //     colorTextMenuActive: 'rgba(255,255,255,0.95)',
    //     colorTextSubMenuSelected: '#fff',
    //   },
    // },
    config: {
      headerTitleRender: (logo, title, _) => {
        const defaultDom = (
          <AnchorLink>
            {logo}
            {title}
          </AnchorLink>
        );

        if (document.body.clientWidth < 1400) {
          return defaultDom;
        }

        if (_.isMobile) return defaultDom;

        return (
          <>
            {defaultDom}

            <MenuCard />
          </>
        );
      },
    },
  });
};
