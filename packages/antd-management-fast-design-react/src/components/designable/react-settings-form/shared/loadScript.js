import { globalThisPolyfill } from '@designable/shared';

import { getNpmCDNRegistry } from '../registry';

export const loadScript = async (properties) => {
  const options = {
    base: getNpmCDNRegistry(),
    ...properties,
  };
  if (globalThisPolyfill[properties.root]) {
    return globalThisPolyfill[options.root];
  }

  const path = `${options.base}/${options.package}/${options.entry}`;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = path;

    script.addEventListener('load', () => {
      const module = globalThisPolyfill[options.root];
      globalThisPolyfill['define'] = define;
      resolve(module);
      script.remove();
    });

    script.addEventListener('error', (error) => {
      reject(error);
    });

    const define = globalThisPolyfill['define'];

    globalThisPolyfill['define'] = undefined;

    document.body.append(script);
  });
};
