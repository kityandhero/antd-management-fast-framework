import { defineConfig } from '@umijs/max';

import { buildConfig as buildConfigCore } from 'antd-management-fast-framework/es/configGroup/configGeneral';

import pk from '../package.json';

import { config as configDevelopment } from './config.development';
import { config as configProduction } from './config.production';
import pageRoutes from './router.config';

function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

function buildConfig() {
  return {
    ...buildConfigCore(pk),
    ...{
      mfsu: false,
      hash: true,
      antd: {
        theme: {
          token: {
            colorPrimary: '#00b96b',
          },
        },
      },
      history: { type: 'browser' },
      styles: [`body { margin: 0; }`],
      layout: {
        title: '@umijs/max',
        onRouteChange: ({
          routes,
          clientRoutes,
          location,
          action,
          basename,
        }) => {
          console.log(routes);
        },
      },
      routes: pageRoutes,
    },
    ...(checkDevelopment() ? configDevelopment : configProduction),
  };
}

console.log(
  `current env is ${checkDevelopment() ? 'development' : 'production'}`,
);
console.log({ configDevelopment, configProduction });
console.log(buildConfig(pk));

export default defineConfig(buildConfig(pk));
