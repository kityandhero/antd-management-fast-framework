import { defineConfig } from 'umi';

const corsTargetDomain = '';

export default defineConfig({
  favicon: `${corsTargetDomain}/assists/image/favicon.ico`,
  headScripts: [
    {
      src: `${corsTargetDomain}/interactionConfig/init.js`,
    },
  ],
});
