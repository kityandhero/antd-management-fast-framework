import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildChannelSqlLogSwitchModel } from './channelSqlLogSwitch';
import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentManagementModel } from './currentManagement';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildGeneralLogModel } from './generalLog';
import { buildModel as buildHostServiceModel } from './hostService';
import { buildModel as buildHostServiceLogModel } from './hostServiceLog';
import { buildModel as buildInternalTesterModel } from './internalTester';
import { buildModel as buildMasterManagerModel } from './masterManager';
import { buildModel as buildPresetRoleModel } from './presetRole';
import { buildModel as buildSmsCategoryModel } from './smsCategory';
import { buildModel as buildSmsCategoryStatisticModel } from './smsCategoryStatistic';
import { buildModel as buildSmsLogModel } from './smsLog';
import { buildModel as buildSqlLogModel } from './sqlLog';
import { buildModel as buildUserModel } from './user';

function collectModelBuilder() {
  appendExtraBuilder(buildCurrentAccountModel);

  appendExtraBuilder(buildCurrentManagementModel);

  appendExtraBuilder(buildChannelSqlLogSwitchModel);

  appendExtraBuilder(buildErrorLogModel);

  appendExtraBuilder(buildGeneralLogModel);

  appendExtraBuilder(buildSqlLogModel);

  appendExtraBuilder(buildAccessWayModel);

  appendExtraBuilder(buildPresetRoleModel);

  appendExtraBuilder(buildHostServiceModel);

  appendExtraBuilder(buildHostServiceLogModel);

  appendExtraBuilder(buildSmsLogModel);

  appendExtraBuilder(buildSmsCategoryModel);

  appendExtraBuilder(buildSmsCategoryStatisticModel);

  appendExtraBuilder(buildMasterManagerModel);

  appendExtraBuilder(buildUserModel);

  appendExtraBuilder(buildInternalTesterModel);
}

collectModelBuilder();

export function prepareModel() {}
