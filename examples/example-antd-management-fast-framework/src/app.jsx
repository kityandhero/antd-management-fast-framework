import React from 'react';

import { analysisRoute, setRouteCollection } from 'antd-management-fast-common';
import {
  ApplicationWrapper,
  mergeLayoutSetting,
} from 'antd-management-fast-framework';

import { layoutConfig } from './app.config';
import { getLogo, getTitle, themeToken } from './utils';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档:https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState() {
  return { name: '@umijs/max' };
}

export function rootContainer(container, o) {
  const { routes } = { routes: {}, ...o };

  let routeCollection = {};

  for (const o of Object.entries(routes)) {
    const [k, v] = o;

    const { id, name, parentId, path, redirect, authority, access } = {
      id: '',
      name: '',
      access: '',
      parentId: '',
      path: '',
      redirect: '',
      authority: [],
      ...v,
    };

    routeCollection[k] = {
      id,
      name,
      parentId,
      path,
      redirect,
      access,
      authority,
    };
  }

  setRouteCollection(routeCollection);

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
    initialState: initialState || {},
    setInitialState,
    themeToken: themeToken,
    // keepCollapsed: true,
    groupMenu: true,
    // collapsedShowTitle: true,
    ...layoutConfig,
  });
};
