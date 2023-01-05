import { headScripts as headScriptsSource } from './extraScript.production';

const corsTargetDomain = '';

const headScripts = [
  ...headScriptsSource,
  ...[
    {
      src: `${corsTargetDomain}/interactionConfig/initRemote.js`,
    },
  ],
];

const config = {
  favicons: [`${corsTargetDomain}/assists/image/favicon.ico`],
  headScripts,
};

export { config };

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
