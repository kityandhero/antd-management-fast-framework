import { appendEmbedBuilder } from 'easy-soft-utility';

import { buildModel as buildCurrentOperatorModel } from './currentOperator';
import { buildModel as buildEntranceModel } from './entrance';
import { buildModel as buildProgressControlModel } from './progressControl';
import { buildModel as buildRemoteLoadingControlModel } from './remoteLoadingControl';
import { buildModel as buildSchedulingControlModel } from './schedulingControl';

export function appendEmbedModelBuilder() {
  appendEmbedBuilder(buildEntranceModel);
  appendEmbedBuilder(buildCurrentOperatorModel);
  appendEmbedBuilder(buildProgressControlModel);
  appendEmbedBuilder(buildRemoteLoadingControlModel);
  appendEmbedBuilder(buildSchedulingControlModel);
}
