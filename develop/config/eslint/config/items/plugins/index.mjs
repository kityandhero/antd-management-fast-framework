/**
generate by easy-soft-develop
*/

import {
  pluginCollection as customPlugins,
  pluginXCollection as customPluginsX,
} from './custom.mjs';
import {
  pluginCollection as embedPlugins,
  pluginXCollection as embedPluginsX,
} from './embed.mjs';

export const pluginCollection = {
  ...embedPlugins,
  ...customPlugins,
};

export const pluginXCollection = {
  ...embedPluginsX,
  ...customPluginsX,
};
