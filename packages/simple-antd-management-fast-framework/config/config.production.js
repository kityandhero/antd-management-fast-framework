import { defineConfig } from 'umi';

import { headScripts as headScriptsSource } from './extraScript';

const corsTargetDomain = '';

const headScripts = [
  ...[
    {
      src: `${corsTargetDomain}/interactionConfig/init.js`,
    },
  ],
  ...headScriptsSource,
];

export default defineConfig({
  favicon: `${corsTargetDomain}/assists/image/favicon.ico`,
  headScripts,
  esbuild: {},
});