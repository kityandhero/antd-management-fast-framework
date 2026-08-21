/**
generate by easy-soft-develop
*/

import { settings as customSettings } from './custom.mjs';
import { settings as embedSettings } from './embed.mjs';

export const settings = {
  ...embedSettings,
  ...customSettings,
};
