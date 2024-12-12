// 此文件若不存在，将在从项目模板升级时候创建，若已存在，则不进行改动。
// 此文件用于存放扩展业务类路由配置.

import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export const root = {
  path: '/',
  redirect: '/dashboard',
  routes: [],
};

export const dashboard = {
  path: '/dashboard',
  name: 'dashboard',
  icon: 'team',
  authority: [accessWayCollection.super.permission],
  hideChildrenInMenu: true,
  routes: [
    {
      path: '/dashboard',
      redirect: '/dashboard/workbench',
    },
    {
      path: '/dashboard/workbench',
      name: 'workbench',
      icon: 'bars',
      component: './Workbench',
    },
  ],
};
