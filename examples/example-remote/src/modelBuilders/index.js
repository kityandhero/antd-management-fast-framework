import { appendExtraBuilder } from 'easy-soft-utility';

import { buildModel as buildAccessWayModel } from './accessWay';
import { buildModel as buildAdministrativeDivisionModel } from './administrativeDivision';
import { buildModel as buildApplicationModel } from './application';
import { buildModel as buildApplicationNavigationModel } from './applicationNavigation';
import { buildModel as buildApplicationSourceModel } from './applicationSource';
import { buildModel as buildApplicationVersionModel } from './applicationVersion';
import { buildModel as buildArticleNotificationApplicationModel } from './articleNotificationApplication';
import { buildModel as buildChannelExecuteLogSwitchModel } from './channelExecuteLogSwitch';
import { buildModel as buildChannelSqlLogSwitchModel } from './channelSqlLogSwitch';
import { buildModel as buildCloudStorageModel } from './cloudStorage';
import { buildModel as buildCurrentAccountModel } from './currentAccount';
import { buildModel as buildCurrentManagementModel } from './currentManagement';
import { buildModel as buildDepartmentModel } from './department';
import { buildModel as buildEditorModel } from './editor';
import { buildModel as buildErrorLogModel } from './errorLog';
import { buildModel as buildExecuteLogModel } from './executeLog';
import { buildModel as buildGeneralLogModel } from './generalLog';
import { buildModel as buildGovernmentAffairManagerModel } from './governmentAffairManager';
import { buildModel as buildGovernmentAffairManagerRoleModel } from './governmentAffairManagerRole';
import { buildModel as buildHostServiceModel } from './hostService';
import { buildModel as buildHostServiceLogModel } from './hostServiceLog';
import { buildModel as buildInternalTesterModel } from './internalTester';
import { buildModel as buildMasterManagerModel } from './masterManager';
import { buildModel as buildMetaDataModel } from './metaData';
import { buildModel as buildOptionPoolModel } from './optionPool';
import { buildModel as buildOrganizationModel } from './organization';
import { buildModel as buildPresetRoleModel } from './presetRole';
import { buildModel as buildSectionModel } from './section';
import { buildModel as buildSectionApplicationConfigModel } from './sectionApplicationConfig';
import { buildModel as buildSmsCategoryModel } from './smsCategory';
import { buildModel as buildSmsCategoryStatisticModel } from './smsCategoryStatistic';
import { buildModel as buildSmsLogModel } from './smsLog';
import { buildModel as buildSmsStatisticModel } from './smsStatistic';
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
import { buildModel as buildWorkflowBranchConditionModel } from './workflowBranchCondition';
import { buildModel as buildWorkflowBranchConditionItemModel } from './workflowBranchConditionItem';
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
  appendExtraBuilder(buildAccessWayModel);

  appendExtraBuilder(buildAdministrativeDivisionModel);

  appendExtraBuilder(buildApplicationModel);

  appendExtraBuilder(buildApplicationNavigationModel);

  appendExtraBuilder(buildApplicationSourceModel);

  appendExtraBuilder(buildApplicationVersionModel);

  appendExtraBuilder(buildArticleNotificationApplicationModel);

  appendExtraBuilder(buildChannelExecuteLogSwitchModel);

  appendExtraBuilder(buildChannelSqlLogSwitchModel);

  appendExtraBuilder(buildCloudStorageModel);

  appendExtraBuilder(buildCurrentAccountModel);

  appendExtraBuilder(buildCurrentManagementModel);

  appendExtraBuilder(buildDepartmentModel);

  appendExtraBuilder(buildEditorModel);

  appendExtraBuilder(buildErrorLogModel);

  appendExtraBuilder(buildExecuteLogModel);

  appendExtraBuilder(buildGeneralLogModel);

  appendExtraBuilder(buildGovernmentAffairManagerModel);

  appendExtraBuilder(buildGovernmentAffairManagerRoleModel);

  appendExtraBuilder(buildHostServiceModel);

  appendExtraBuilder(buildHostServiceLogModel);

  appendExtraBuilder(buildInternalTesterModel);

  appendExtraBuilder(buildMasterManagerModel);

  appendExtraBuilder(buildMetaDataModel);

  appendExtraBuilder(buildOptionPoolModel);

  appendExtraBuilder(buildOrganizationModel);

  appendExtraBuilder(buildPresetRoleModel);

  appendExtraBuilder(buildSectionModel);

  appendExtraBuilder(buildSectionApplicationConfigModel);

  appendExtraBuilder(buildSmsCategoryModel);

  appendExtraBuilder(buildSmsCategoryStatisticModel);

  appendExtraBuilder(buildSmsLogModel);

  appendExtraBuilder(buildSmsStatisticModel);

  appendExtraBuilder(buildSqlLogModel);

  appendExtraBuilder(buildSubsidiaryModel);

  appendExtraBuilder(buildTagModel);

  appendExtraBuilder(buildUploadHistoryModel);

  appendExtraBuilder(buildUserModel);

  appendExtraBuilder(buildUserDepartmentInfoModel);

  appendExtraBuilder(buildUserDeviceModel);

  appendExtraBuilder(buildUserSubsidiaryInfoModel);

  appendExtraBuilder(buildUserYonYouCorrelationModel);

  appendExtraBuilder(buildWeChatMessageRecordModel);

  appendExtraBuilder(buildWorkflowModel);

  appendExtraBuilder(buildWorkflowBranchConditionModel);

  appendExtraBuilder(buildWorkflowBranchConditionItemModel);

  appendExtraBuilder(buildWorkflowCaseModel);

  appendExtraBuilder(buildWorkflowCaseFormAttachmentModel);

  appendExtraBuilder(buildWorkflowCaseFormStorageModel);

  appendExtraBuilder(buildWorkflowCaseProcessHistoryModel);

  appendExtraBuilder(buildWorkflowDebugCaseModel);

  appendExtraBuilder(buildWorkflowDebugCaseFormAttachmentModel);

  appendExtraBuilder(buildWorkflowDebugCaseFormStorageModel);

  appendExtraBuilder(buildWorkflowDebugCaseProcessHistoryModel);

  appendExtraBuilder(buildWorkflowFormDesignModel);

  appendExtraBuilder(buildWorkflowLineModel);

  appendExtraBuilder(buildWorkflowNodeModel);

  appendExtraBuilder(buildWorkflowNodeApproverModel);

  appendExtraBuilder(
    buildWorkflowRangeEffectiveExternalDepartmentRelationModel,
  );

  appendExtraBuilder(buildWorkflowRangeEffectiveSubsidiaryRelationModel);

  appendExtraBuilder(buildYonYouImportHistoryModel);

  appendExtraBuilder(buildYonYouPushMessageModel);
}

collectModelBuilder();

export function prepareModel() {}
