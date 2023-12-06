import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildApplicationModel } from './application';
import { buildModel as buildApplicationNavigationModel } from './applicationNavigation';
import { buildModel as buildApplicationSourceModel } from './applicationSource';
import { buildModel as buildApplicationVersionModel } from './applicationVersion';
import { buildModel as buildChannelExecuteLogSwitchModel } from './channelExecuteLogSwitch';
import { buildModel as buildChannelSqlLogSwitchModel } from './channelSqlLogSwitch';
import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentManagementModel } from './currentManagement';
import { buildModel as buildDepartmentModel } from './department';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildExecuteLogModel } from './executeLog';
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
import { buildModel as buildUserDepartmentInfoModel } from './userDepartmentInfo';
import { buildModel as buildUserDeviceModel } from './userDevice';
import { buildModel as buildUserSubsidiaryInfoModel } from './userSubsidiaryInfo';
import { buildModel as buildUserYonYouCorrelationModel } from './userYonYouCorrelation';
import { buildModel as buildWeChatMessageRecordModel } from './weChatMessageRecord';
import { buildModel as buildWorkflowModel } from './workflow';
import { buildModel as buildWorkflowCaseModel } from './workflowCase';
import { buildModel as buildWorkflowCaseFormAttachmentModel } from './workflowCaseFormAttachment';
import { buildModel as buildWorkflowCaseFormStorageModel } from './workflowCaseFormStorage';
import { buildModel as buildWorkflowCaseProcessHistoryModel } from './workflowCaseProcessHistory';
import { buildModel as buildWorkflowDebugCaseModel } from './workflowDebugCase';
import { buildModel as buildWorkflowDebugCaseFormAttachmentModel } from './workflowDebugCaseFormAttachment';
import { buildModel as buildWorkflowDebugCaseFormStorageModel } from './workflowDebugCaseFormStorage';
import { buildModel as buildWorkflowDebugCaseProcessHistoryModel } from './workflowDebugCaseProcessHistory';
import { buildModel as buildWorkflowFormDesignModel } from './workflowFormDesign';
import { buildModel as buildWorkflowLineModel } from './workflowLine';
import { buildModel as buildWorkflowNodeModel } from './workflowNode';
import { buildModel as buildWorkflowNodeApproverModel } from './workflowNodeApprover';
import { buildModel as buildWorkflowRangeEffectiveExternalDepartmentRelationModel } from './workflowRangeEffectiveExternalDepartmentRelation';
import { buildModel as buildWorkflowRangeEffectiveSubsidiaryRelationModel } from './workflowRangeEffectiveSubsidiaryRelation';
import { buildModel as buildYonYouImportHistoryModel } from './yonYouImportHistory';
import { buildModel as buildYonYouPushMessageModel } from './yonYouPushMessage';

function collectModelBuilder() {
  appendExtraBuilder(buildCurrentAccountModel);

  appendExtraBuilder(buildCurrentManagementModel);

  appendExtraBuilder(buildChannelSqlLogSwitchModel);

  appendExtraBuilder(buildChannelExecuteLogSwitchModel);

  appendExtraBuilder(buildErrorLogModel);

  appendExtraBuilder(buildGeneralLogModel);

  appendExtraBuilder(buildExecuteLogModel);

  appendExtraBuilder(buildSqlLogModel);

  appendExtraBuilder(buildUploadHistoryModel);

  appendExtraBuilder(buildAccessWayModel);

  appendExtraBuilder(buildPresetRoleModel);

  appendExtraBuilder(buildHostServiceModel);

  appendExtraBuilder(buildHostServiceLogModel);

  appendExtraBuilder(buildApplicationSourceModel);

  appendExtraBuilder(buildApplicationModel);

  appendExtraBuilder(buildApplicationNavigationModel);

  appendExtraBuilder(buildApplicationVersionModel);

  appendExtraBuilder(buildSmsLogModel);

  appendExtraBuilder(buildSmsCategoryModel);

  appendExtraBuilder(buildSmsCategoryStatisticModel);

  appendExtraBuilder(buildMasterManagerModel);

  appendExtraBuilder(buildUserModel);

  appendExtraBuilder(buildUserSubsidiaryInfoModel);

  appendExtraBuilder(buildUserYonYouCorrelationModel);

  appendExtraBuilder(buildUserDeviceModel);

  appendExtraBuilder(buildInternalTesterModel);

  appendExtraBuilder(buildWeChatMessageRecordModel);

  appendExtraBuilder(buildTagModel);

  appendExtraBuilder(buildOptionPoolModel);

  appendExtraBuilder(buildSubsidiaryModel);

  appendExtraBuilder(buildDepartmentModel);

  appendExtraBuilder(buildUserDepartmentInfoModel);

  appendExtraBuilder(buildOrganizationModel);

  appendExtraBuilder(buildSectionModel);

  appendExtraBuilder(buildSectionApplicationConfigModel);

  appendExtraBuilder(buildYonYouPushMessageModel);

  appendExtraBuilder(buildYonYouImportHistoryModel);

  appendExtraBuilder(buildWorkflowModel);

  appendExtraBuilder(buildWorkflowNodeModel);

  appendExtraBuilder(buildWorkflowNodeApproverModel);

  appendExtraBuilder(buildWorkflowLineModel);

  appendExtraBuilder(buildWorkflowFormDesignModel);

  appendExtraBuilder(buildWorkflowRangeEffectiveSubsidiaryRelationModel);

  appendExtraBuilder(
    buildWorkflowRangeEffectiveExternalDepartmentRelationModel,
  );

  appendExtraBuilder(buildWorkflowCaseModel);

  appendExtraBuilder(buildWorkflowCaseFormStorageModel);

  appendExtraBuilder(buildWorkflowCaseFormAttachmentModel);

  appendExtraBuilder(buildWorkflowCaseProcessHistoryModel);

  appendExtraBuilder(buildWorkflowDebugCaseModel);

  appendExtraBuilder(buildWorkflowDebugCaseProcessHistoryModel);

  appendExtraBuilder(buildWorkflowDebugCaseFormStorageModel);

  appendExtraBuilder(buildWorkflowDebugCaseFormAttachmentModel);
}

collectModelBuilder();

export function prepareModel() {}
