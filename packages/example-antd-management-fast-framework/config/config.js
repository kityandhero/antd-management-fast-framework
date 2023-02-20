import { defineConfig } from '@umijs/max';

import {
  buildConfig as buildConfigCore,
  checkDevelopment,
} from 'antd-management-fast-develop';

import pk from '../package.json';

import { config as configDevelopment } from './config.development';
import { config as configProduction } from './config.production';
import routes from './router.config';

function buildConfig() {
  return {
    ...buildConfigCore(pk),
    mfsu: false,
    styles: [`body { margin: 0; }`],
    routes: routes,
    ...(checkDevelopment() ? configDevelopment : configProduction),
  };
}

// console.log(
//   `current env is ${checkDevelopment() ? 'development' : 'production'}`,
// );
// console.log({ configDevelopment, configProduction });
console.log(buildConfig(pk));

export default defineConfig(buildConfig(pk));
