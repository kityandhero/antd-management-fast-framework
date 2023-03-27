import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildCurrentOperatorModel } from './currentAccount';
import { buildModel as buildCurrentSystemModel } from './currentSystem';
import { buildModel as buildFlowEditorModel } from './flowEditor';
import { buildModel as buildNoticeModel } from './notice';
import { buildModel as buildSimpleModel } from './simple';
import { buildModel as buildTestModel } from './testModel';

function collectModelBuilder() {
  appendExtraBuilder(buildAccessWayModel);
  appendExtraBuilder(buildCurrentOperatorModel);
  appendExtraBuilder(buildCurrentSystemModel);
  appendExtraBuilder(buildFlowEditorModel);
  appendExtraBuilder(buildNoticeModel);
  appendExtraBuilder(buildSimpleModel);
  appendExtraBuilder(buildTestModel);
}

collectModelBuilder();

export function prepareModel() {}
