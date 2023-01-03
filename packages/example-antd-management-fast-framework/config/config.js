import { defineConfig } from '@umijs/max';

import { buildConfig } from 'antd-management-fast-framework/es/configGroup/configGeneral';

import pk from '../package.json';

import pageRoutes from './router.config';

const config = defineConfig({
  ...buildConfig(pk),
  ...{
    layout: {
      title: '@umijs/max',
    },
    routes: pageRoutes,
  },
});

export default config;
