import { headScripts as headScriptsSource } from './extraScript.development';

// const corsTargetDomain = '';
// const corsTargetDomain = 'http://master.api.oa.local.com';
const corsTargetDomain = 'http://master.api.oa.32306.net';
// const corsTargetDomain = 'http://test.master.api.oa.32306.net';

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
