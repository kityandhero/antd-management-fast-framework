import { appendEmbedBuilder } from 'easy-soft-utility';

import { buildModel as buildCurrentOperatorModel } from './currentOperator';
import { buildModel as buildEntranceModel } from './entrance';
import { buildModel as buildMenuControlModel } from './menuControl';
import { buildModel as buildProgressBarControlModel } from './progressBarControl';
import { buildModel as buildReloadAnimalPromptControlModel } from './reloadAnimalPromptControl';
import { buildModel as buildSchedulingControlModel } from './schedulingControl';
import { buildModel as buildShortcutControlModel } from './shortcutControl';
import { buildModel as buildSwitchControlModel } from './switchControl';
import { buildModel as buildTabControlModel } from './tabControl';

export function appendEmbedModelBuilder() {
  appendEmbedBuilder(buildEntranceModel);
  appendEmbedBuilder(buildCurrentOperatorModel);
  appendEmbedBuilder(buildProgressBarControlModel);
  appendEmbedBuilder(buildReloadAnimalPromptControlModel);
  appendEmbedBuilder(buildSchedulingControlModel);
  appendEmbedBuilder(buildShortcutControlModel);
  appendEmbedBuilder(buildSwitchControlModel);
  appendEmbedBuilder(buildTabControlModel);
  appendEmbedBuilder(buildMenuControlModel);
}
