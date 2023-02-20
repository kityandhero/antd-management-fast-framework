import { appendEmbedBuilder, appendExtraBuilder } from 'easy-soft-utility';

import { buildSchedulingControlModel } from 'antd-management-fast-framework';

import { buildAccessWayModel } from './accessWay';
import { buildArticleModel } from './article';
import { buildCurrentOperatorModel } from './currentOperator';
import { buildCurrentSystemModel } from './currentSystem';
import { buildEntranceModel } from './entrance';
import { buildFlowEditorModel } from './flowEditor';
import { buildGlobalModel } from './global';
import { buildNoticeModel } from './notice';
import { buildSettingsModel } from './setting';

function collectModelBuilder() {
  appendEmbedBuilder(buildSchedulingControlModel);

  appendExtraBuilder(buildAccessWayModel);
  appendExtraBuilder(buildArticleModel);
  appendExtraBuilder(buildCurrentOperatorModel);
  appendExtraBuilder(buildCurrentSystemModel);
  appendExtraBuilder(buildEntranceModel);
  appendExtraBuilder(buildFlowEditorModel);
  appendExtraBuilder(buildGlobalModel);
  appendExtraBuilder(buildNoticeModel);
  appendExtraBuilder(buildSettingsModel);
}

collectModelBuilder();

export function prepareModel() {}
