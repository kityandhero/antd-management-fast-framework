import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildApplicationModel } from './application';
import { buildModel as buildApplicationNavigationModel } from './applicationNavigation';
import { buildModel as buildApplicationSourceModel } from './applicationSource';
import { buildModel as buildChannelSqlLogSwitchModel } from './channelSqlLogSwitch';
import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentManagementModel } from './currentManagement';
import { buildModel as buildDepartmentModel } from './department';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildGeneralLogModel } from './generalLog';
import { buildModel as buildHostServiceModel } from './hostService';
import { buildModel as buildHostServiceLogModel } from './hostServiceLog';
import { buildModel as buildInternalTesterModel } from './internalTester';
import { buildModel as buildMasterManagerModel } from './masterManager';
import { buildModel as buildOptionPoolModel } from './optionPool';
import { buildModel as buildOrganizationModel } from './organization';
import { buildModel as buildPresetRoleModel } from './presetRole';
import { buildModel as buildSectionModel } from './section';
import { buildModel as buildSectionApplicationConfigModel } from './sectionApplicationConfig';
import { buildModel as buildSmsCategoryModel } from './smsCategory';
import { buildModel as buildSmsCategoryStatisticModel } from './smsCategoryStatistic';
import { buildModel as buildSmsLogModel } from './smsLog';
import { buildModel as buildSqlLogModel } from './sqlLog';
import { buildModel as buildSubsidiaryModel } from './subsidiary';
import { buildModel as buildTagModel } from './tag';
import { buildModel as buildUploadHistoryModel } from './uploadHistory';
import { buildModel as buildUserModel } from './user';
import { buildModel as buildUserYonYouCorrelationModel } from './userYonYouCorrelation';
import { buildModel as buildWeChatMessageRecordModel } from './weChatMessageRecord';
import { buildModel as buildYonYouPushMessageModel } from './yonYouPushMessage';

function collectModelBuilder() {
  appendExtraBuilder(buildCurrentAccountModel);

  appendExtraBuilder(buildCurrentManagementModel);

  appendExtraBuilder(buildChannelSqlLogSwitchModel);

  appendExtraBuilder(buildErrorLogModel);

  appendExtraBuilder(buildGeneralLogModel);

  appendExtraBuilder(buildSqlLogModel);

  appendExtraBuilder(buildUploadHistoryModel);

  appendExtraBuilder(buildAccessWayModel);

  appendExtraBuilder(buildPresetRoleModel);

  appendExtraBuilder(buildHostServiceModel);

  appendExtraBuilder(buildHostServiceLogModel);

  appendExtraBuilder(buildApplicationSourceModel);

  appendExtraBuilder(buildApplicationModel);

  appendExtraBuilder(buildApplicationNavigationModel);

  appendExtraBuilder(buildSmsLogModel);

  appendExtraBuilder(buildSmsCategoryModel);

  appendExtraBuilder(buildSmsCategoryStatisticModel);

  appendExtraBuilder(buildMasterManagerModel);

  appendExtraBuilder(buildUserModel);

  appendExtraBuilder(buildUserYonYouCorrelationModel);

  appendExtraBuilder(buildInternalTesterModel);

  appendExtraBuilder(buildWeChatMessageRecordModel);

  appendExtraBuilder(buildTagModel);

  appendExtraBuilder(buildOptionPoolModel);

  appendExtraBuilder(buildSubsidiaryModel);

  appendExtraBuilder(buildDepartmentModel);

  appendExtraBuilder(buildOrganizationModel);

  appendExtraBuilder(buildSectionModel);

  appendExtraBuilder(buildSectionApplicationConfigModel);

  appendExtraBuilder(buildYonYouPushMessageModel);
}

collectModelBuilder();

export function prepareModel() {}
