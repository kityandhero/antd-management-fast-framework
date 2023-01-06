import { defineConfig } from '@umijs/max';

import { buildConfig as buildConfigCore } from 'antd-management-fast-framework/es/configGroup/configGeneral';

import pk from '../package.json';

import { config as configDevelopment } from './config.development';
import { config as configProduction } from './config.production';
import routes from './router.config';

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
      routes: routes,
      // routes: [
      //   {
      //     path: '/',
      //     redirect: '/home',
      //   },
      //   {
      //     name: '首页',
      //     path: '/home',
      //     // component: './Home',
      //   },
      // ],
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
