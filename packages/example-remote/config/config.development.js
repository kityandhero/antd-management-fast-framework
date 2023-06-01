import { headScripts as headScriptsSource } from './extraScript.development';

const corsTargetDomain = 'http://master.api.oa.local.com';

const headScripts = [
  ...headScriptsSource,
  {
    src: `${corsTargetDomain}/interactionConfig/initRemote.js`,
  },
];

const config = {
  favicons: [`${corsTargetDomain}/assists/image/favicon.ico`],
  headScripts,
};

export { config };
