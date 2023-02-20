import { headScripts as headScriptsSource } from './extraScript';

export const headScripts = [
  ...headScriptsSource,
  {
    src: '/interactionConfig/initLocal.development.js',
  },
];
