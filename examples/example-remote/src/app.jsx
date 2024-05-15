import React from 'react';

import { analysisRoute } from 'antd-management-fast-common';
import {
  ApplicationWrapper,
  mergeLayoutSetting,
} from 'antd-management-fast-framework';

import { MenuCard } from './components/MenuCard';
import {
  buildActionItems,
  buildSiderMenuExtra,
  buildSiderMenuFooter,
  getLogo,
  getTitle,
  themeToken,
} from './utils/tools';

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
  return mergeLayoutSetting({
    logo: getLogo(),
    title: getTitle(),
    water: 'test',
    actionItems: buildActionItems(),
    initialState: initialState || {},
    setInitialState,
    themeToken: themeToken,
    // keepCollapsed: true,
    groupMenu: true,
    // collapsedShowTitle: true,
    backgroundImageItems: [
      {
        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuExtra: buildSiderMenuExtra(),
    menuFooter: buildSiderMenuFooter(),
    miniMenu: <MenuCard />,
    config: {},
  });
};
