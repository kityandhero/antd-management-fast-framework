import { headScripts as headScriptsSource } from './extraScript.development';

const corsTargetDomain = 'http://zwapi.1010101.cc';
// const corsTargetDomain = '';

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
