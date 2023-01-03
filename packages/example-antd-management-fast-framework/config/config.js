import { defineConfig } from '@umijs/max';

import { configDefault } from 'antd-management-fast-framework/es/configGroup/configGeneral';

import pageRoutes from './router.config';

const config = defineConfig({
  ...configDefault,
  ...{
    layout: {
      title: '@umijs/max',
    },
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
      },
    ],
  },
});

export default config;
