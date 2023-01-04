import { defineConfig } from '@umijs/max';

import { buildConfig } from 'antd-management-fast-framework/es/configGroup/configGeneral';

import pk from '../package.json';

import pageRoutes from './router.config';

const config = defineConfig({
  ...buildConfig(pk),
  ...{
    mfsu: false,
    layout: {
      title: '@umijs/max',
      onRouteChange: ({ routes, clientRoutes, location, action, basename }) => {
        console.log(routes);
      },
    },
    routes: pageRoutes,
  },
});

export default config;
