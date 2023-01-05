import { headScripts as headScriptsSource } from './extraScript';

export const headScripts = [
  ...headScriptsSource,
  ...[
    {
      src: '/interactionConfig/initLocal.production.js',
    },
  ],
];

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
