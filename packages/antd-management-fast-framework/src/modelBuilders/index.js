import { appendEmbedBuilder } from 'easy-soft-utility';

import { buildModel as buildCurrentOperatorModel } from './currentOperator';
import { buildModel as buildEntranceModel } from './entrance';
import { buildModel as buildProgressBarControlModel } from './progressBarControl';
import { buildModel as buildSchedulingControlModel } from './schedulingControl';
import { buildModel as buildSwitchControlModel } from './switchControl';
import { buildModel as buildTabControlModel } from './tabControl';

export function appendEmbedModelBuilder() {
  appendEmbedBuilder(buildEntranceModel);
  appendEmbedBuilder(buildCurrentOperatorModel);
  appendEmbedBuilder(buildProgressBarControlModel);
  appendEmbedBuilder(buildSchedulingControlModel);
  appendEmbedBuilder(buildSwitchControlModel);
  appendEmbedBuilder(buildTabControlModel);
}
