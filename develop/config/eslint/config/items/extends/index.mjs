/**
generate by easy-soft-develop
*/

import { extendCollection as extendCustomPlugins } from './custom.mjs';
import { extendCollection as extendEmbedPlugins } from './embed.mjs';

export const extendCollection = [...extendEmbedPlugins, ...extendCustomPlugins];
