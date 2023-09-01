import { GlobalRegistry } from '@designable/core';

import zhCN from './chinese';
import enUS from './english';
import koKR from './korean';

GlobalRegistry.registerDesignerLocales(zhCN, enUS, koKR);
