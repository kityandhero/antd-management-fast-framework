import { headScripts as headScriptsSource } from './extraScript';

export const headScripts = [
  ...[
    {
      src: '/interactionConfig/initLocal.production.js',
    },
  ],
  ...headScriptsSource,
];
