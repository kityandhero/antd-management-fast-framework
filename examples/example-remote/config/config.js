import { defineConfig } from '@umijs/max';

import {
  buildConfig as buildConfigCore,
  checkDevelopment,
} from 'antd-management-fast-config';

import pk from '../package.json';

import { config as configDevelopment } from './config.development';
import { config as configProduction } from './config.production';
import routes from './router.config';

function buildConfig() {
  return buildConfigCore({
    packageJson: pk,
    config: {
      esbuildMinifyIIFE: true,
      mfsu: false,
      styles: [`body { margin: 0; }`],
      routes: routes,
      ...(checkDevelopment() ? configDevelopment : configProduction),
    },
  });
}

export default defineConfig(buildConfig());
