import { defineConfig, utils } from 'umi';

import proxy from './proxy';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';

const { winPath } = utils;

const corsTargetDomain = '';
const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';

export default defineConfig({
  favicon: `${corsTargetDomain}/assists/image/favicon.ico`,
  headScripts: [
    {
      src: `${corsTargetDomain}/interactionConfig/init.js`,
    },
  ],
});
