import { defineConfig } from '@umijs/max';

import { headScripts as headScriptsSource } from './extraScript.development';

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
});
