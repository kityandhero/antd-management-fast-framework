import { appendEmbedBuilder, appendExtraBuilder } from 'easy-soft-utility';

import { buildSchedulingControlModel } from 'antd-management-fast-framework';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildArticleModel } from './article';
import { buildModel as buildCurrentOperatorModel } from './currentOperator';
import { buildModel as buildCurrentSystemModel } from './currentSystem';
import { buildModel as buildEntranceModel } from './entrance';
import { buildModel as buildFlowEditorModel } from './flowEditor';
import { buildModel as buildGlobalModel } from './global';
import { buildModel as buildNoticeModel } from './notice';
import { buildModel as buildSettingsModel } from './setting';
import { buildModel as buildTestModel } from './testModel';

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
  appendExtraBuilder(buildTestModel);
}

collectModelBuilder();

export function prepareModel() {}
