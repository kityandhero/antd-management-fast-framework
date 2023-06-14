import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentSystemModel } from './currentSystem';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildPresetRoleModel } from './presetRole';

function collectModelBuilder() {
  appendExtraBuilder(buildCurrentAccountModel);

  appendExtraBuilder(buildCurrentSystemModel);

  appendExtraBuilder(buildErrorLogModel);

  appendExtraBuilder(buildPresetRoleModel);
}

collectModelBuilder();

export function prepareModel() {}
