import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildArticleModel } from './article';
import { buildModel as buildCurrentOperatorModel } from './currentAccount';
import { buildModel as buildCurrentSystemModel } from './currentSystem';
import { buildModel as buildFlowEditorModel } from './flowEditor';
import { buildModel as buildGlobalModel } from './global';
import { buildModel as buildNoticeModel } from './notice';
import { buildModel as buildSettingsModel } from './setting';
import { buildModel as buildTestModel } from './testModel';

function collectModelBuilder() {
  appendExtraBuilder(buildAccessWayModel);
  appendExtraBuilder(buildArticleModel);
  appendExtraBuilder(buildCurrentOperatorModel);
  appendExtraBuilder(buildCurrentSystemModel);
  appendExtraBuilder(buildFlowEditorModel);
  appendExtraBuilder(buildGlobalModel);
  appendExtraBuilder(buildNoticeModel);
  appendExtraBuilder(buildSettingsModel);
  appendExtraBuilder(buildTestModel);
}

collectModelBuilder();

export function prepareModel() {}
