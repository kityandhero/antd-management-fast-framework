import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildArticleModel } from './article';
import { buildModel as buildCurrentOperatorModel } from './currentAccount';
import { buildModel as buildCurrentSystemModel } from './currentSystem';
import { buildModel as buildErrorLogModel } from './errorLog';

function collectModelBuilder() {
  appendExtraBuilder(buildAccessWayModel);
  appendExtraBuilder(buildCurrentOperatorModel);
  appendExtraBuilder(buildCurrentSystemModel);

  appendExtraBuilder(buildArticleModel);
  appendExtraBuilder(buildErrorLogModel);
}

collectModelBuilder();

export function prepareModel() {}
