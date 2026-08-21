/**
generate by easy-soft-develop
*/

import {
  parserJsOptions as customParserJsOptions,
  parserTsOptions as customParserTsOptions,
} from './custom.mjs';
import {
  parserJsOptions as embedParserJsOptions,
  parserTsOptions as embedParserTsOptions,
} from './embed.mjs';

export const parserJsOptions = {
  ...embedParserJsOptions,
  ...customParserJsOptions,
};

export const parserTsOptions = {
  ...embedParserTsOptions,
  ...customParserTsOptions,
};
