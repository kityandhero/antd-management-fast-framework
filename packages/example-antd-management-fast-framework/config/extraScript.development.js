import { headScripts as headScriptsSource } from './extraScript';

export const headScripts = [
  ...[
    {
      src: '/interactionConfig/initLocal.development.js',
    },
  ],
  ...headScriptsSource,
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
