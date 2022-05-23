import { defineConfig } from 'umi';
import { headScripts as headScriptsSource } from './extraScript.production';

const corsTargetDomain = '';

const headScripts = [
  ...[
    {
      src: `${corsTargetDomain}/interactionConfig/initRemote.js`,
    },
  ],
  ...headScriptsSource,
];

export default defineConfig({
  favicon: `${corsTargetDomain}/assists/image/favicon.ico`,
  headScripts,
  esbuild: {},
});
