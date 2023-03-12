import { appendEmbedBuilder } from 'easy-soft-utility';

import { buildModel as buildEntranceModel } from './entrance';
import { buildModel as buildSchedulingControlModel } from './schedulingControl';

export function appendEmbedModelBuilder() {
  appendEmbedBuilder(buildEntranceModel);
  appendEmbedBuilder(buildSchedulingControlModel);
}
