import { GlobalRegistry } from '@designable/core';

import global from './global';
import icons from './icons';
import operations from './operations';
import panels from './panels';

GlobalRegistry.registerDesignerLocales(icons, panels, global, operations);
