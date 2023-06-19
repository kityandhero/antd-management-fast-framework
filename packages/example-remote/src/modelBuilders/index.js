import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildArticleModel } from './article';
import { buildModel as buildChannelSqlLogSwitchModel } from './channelSqlLogSwitch';
import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentSystemModel } from './currentSystem';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildGeneralLogModel } from './generalLog';
import { buildModel as buildHostServiceModel } from './hostService';
import { buildModel as buildHostServiceLogModel } from './hostServiceLog';
import { buildModel as buildPresetRoleModel } from './presetRole';
import { buildModel as buildSmsCategoryModel } from './smsCategory';
import { buildModel as buildSmsCategoryStatisticModel } from './smsCategoryStatistic';
import { buildModel as buildSmsLogModel } from './smsLog';
import { buildModel as buildSmsStatisticModel } from './smsStatistic';
import { buildModel as buildSqlLogModel } from './sqlLog';

function collectModelBuilder() {
  appendExtraBuilder(buildCurrentAccountModel);

  appendExtraBuilder(buildCurrentSystemModel);

  appendExtraBuilder(buildChannelSqlLogSwitchModel);

  appendExtraBuilder(buildErrorLogModel);

  appendExtraBuilder(buildGeneralLogModel);

  appendExtraBuilder(buildAccessWayModel);

  appendExtraBuilder(buildPresetRoleModel);

  appendExtraBuilder(buildSqlLogModel);

  appendExtraBuilder(buildHostServiceModel);

  appendExtraBuilder(buildHostServiceLogModel);

  appendExtraBuilder(buildSmsLogModel);

  appendExtraBuilder(buildSmsStatisticModel);

  appendExtraBuilder(buildSmsCategoryModel);

  appendExtraBuilder(buildSmsCategoryStatisticModel);

  appendExtraBuilder(buildArticleModel);
}

collectModelBuilder();

export function prepareModel() {}
