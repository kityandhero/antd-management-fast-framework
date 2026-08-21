/**
generate by easy-soft-develop
*/

import { ignoreCollection as ignoreCustomPlugins } from './custom.mjs';
import { ignoreCollection as ignoreEmbedPlugins } from './embed.mjs';

export const ignoreCollection = [...ignoreEmbedPlugins, ...ignoreCustomPlugins];
