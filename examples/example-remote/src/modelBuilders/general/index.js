import {
  buildModel as buildAccessWayModel,
  accessWayTypeCollection,
} from './accessWay';

import {
  buildModel as buildAdministrativeDivisionModel,
  administrativeDivisionTypeCollection,
} from './administrativeDivision';

import {
  buildModel as buildApplicationModel,
  applicationTypeCollection,
} from './application';

import {
  buildModel as buildApplicationNavigationModel,
  applicationNavigationTypeCollection,
} from './applicationNavigation';

import {
  buildModel as buildApplicationSourceModel,
  applicationSourceTypeCollection,
} from './applicationSource';

import {
  buildModel as buildApplicationVersionModel,
  applicationVersionTypeCollection,
} from './applicationVersion';

import {
  buildModel as buildArticleNotificationApplicationModel,
  articleNotificationApplicationTypeCollection,
} from './articleNotificationApplication';

import {
  buildModel as buildBusinessSetModel,
  businessSetTypeCollection,
} from './businessSet';

import {
  buildModel as buildCallCenterModel,
  callCenterTypeCollection,
} from './callCenter';

import {
  buildModel as buildCallCenterCategoryModel,
  callCenterCategoryTypeCollection,
} from './callCenterCategory';

import {
  buildModel as buildChannelModel,
  channelTypeCollection,
} from './channel';

import {
  buildModel as buildChannelExecuteLogSwitchModel,
  channelExecuteLogSwitchTypeCollection,
} from './channelExecuteLogSwitch';

import {
  buildModel as buildChannelSqlLogSwitchModel,
  channelSqlLogSwitchTypeCollection,
} from './channelSqlLogSwitch';

import {
  buildModel as buildCloudStorageModel,
  cloudStorageTypeCollection,
} from './cloudStorage';

import {
  buildModel as buildCurrentAccountModel,
  currentAccountTypeCollection,
} from './currentAccount';

import {
  buildModel as buildCurrentManagementInfrastructureModel,
  currentManagementInfrastructureTypeCollection,
} from './currentManagementInfrastructure';

import {
  buildModel as buildDepartmentModel,
  departmentTypeCollection,
} from './department';

import { buildModel as buildEditorModel, editorTypeCollection } from './editor';

import {
  buildModel as buildEmailSenderAgentModel,
  emailSenderAgentTypeCollection,
} from './emailSenderAgent';

import {
  buildModel as buildErrorLogModel,
  errorLogTypeCollection,
} from './errorLog';

import {
  buildModel as buildExecuteLogModel,
  executeLogTypeCollection,
} from './executeLog';

import {
  buildModel as buildGalleryModel,
  galleryTypeCollection,
} from './gallery';

import {
  buildModel as buildGalleryCategoryModel,
  galleryCategoryTypeCollection,
} from './galleryCategory';

import {
  buildModel as buildGeneralDiscourseModel,
  generalDiscourseTypeCollection,
} from './generalDiscourse';

import {
  buildModel as buildGeneralLogModel,
  generalLogTypeCollection,
} from './generalLog';

import {
  buildModel as buildHostServiceModel,
  hostServiceTypeCollection,
} from './hostService';

import {
  buildModel as buildHostServiceLogModel,
  hostServiceLogTypeCollection,
} from './hostServiceLog';

import {
  buildModel as buildInternalTesterModel,
  internalTesterTypeCollection,
} from './internalTester';

import {
  buildModel as buildKeyValueApplicationModel,
  keyValueApplicationTypeCollection,
} from './keyValueApplication';

import {
  buildModel as buildKeyValueInfrastructureModel,
  keyValueInfrastructureTypeCollection,
} from './keyValueInfrastructure';

import {
  buildModel as buildKeyValueSectionModel,
  keyValueSectionTypeCollection,
} from './keyValueSection';

import {
  buildModel as buildKeyValueWorkflowModel,
  keyValueWorkflowTypeCollection,
} from './keyValueWorkflow';

import {
  buildModel as buildMasterManagerModel,
  masterManagerTypeCollection,
} from './masterManager';

import {
  buildModel as buildMasterManagerLoginLogModel,
  masterManagerLoginLogTypeCollection,
} from './masterManagerLoginLog';

import {
  buildModel as buildMetaDataModel,
  metaDataTypeCollection,
} from './metaData';

import {
  buildModel as buildMongoSlowQueryInfoModel,
  mongoSlowQueryInfoTypeCollection,
} from './mongoSlowQueryInfo';

import {
  buildModel as buildOperationLogModel,
  operationLogTypeCollection,
} from './operationLog';

import {
  buildModel as buildOptionPoolModel,
  optionPoolTypeCollection,
} from './optionPool';

import {
  buildModel as buildOrganizationModel,
  organizationTypeCollection,
} from './organization';

import {
  buildModel as buildPositionModel,
  positionTypeCollection,
} from './position';

import {
  buildModel as buildPositionGradeModel,
  positionGradeTypeCollection,
} from './positionGrade';

import {
  buildModel as buildPresetRoleModel,
  presetRoleTypeCollection,
} from './presetRole';

import { buildModel as buildQrCodeModel, qrCodeTypeCollection } from './qrCode';

import {
  buildModel as buildQrCodeCategoryModel,
  qrCodeCategoryTypeCollection,
} from './qrCodeCategory';

import {
  buildModel as buildQuestionModel,
  questionTypeCollection,
} from './question';

import {
  buildModel as buildQuestionItemModel,
  questionItemTypeCollection,
} from './questionItem';

import {
  buildModel as buildQuestionnaireModel,
  questionnaireTypeCollection,
} from './questionnaire';

import {
  buildModel as buildQuestionnaireQuestionModel,
  questionnaireQuestionTypeCollection,
} from './questionnaireQuestion';

import {
  buildModel as buildQuestionTagRelationModel,
  questionTagRelationTypeCollection,
} from './questionTagRelation';

import {
  buildModel as buildQueueInfoModel,
  queueInfoTypeCollection,
} from './queueInfo';

import {
  buildModel as buildSectionModel,
  sectionTypeCollection,
} from './section';

import {
  buildModel as buildSectionApplicationConfigModel,
  sectionApplicationConfigTypeCollection,
} from './sectionApplicationConfig';

import {
  buildModel as buildSmsCategoryModel,
  smsCategoryTypeCollection,
} from './smsCategory';

import {
  buildModel as buildSmsCategoryStatisticModel,
  smsCategoryStatisticTypeCollection,
} from './smsCategoryStatistic';

import { buildModel as buildSmsLogModel, smsLogTypeCollection } from './smsLog';

import {
  buildModel as buildSmsStatisticModel,
  smsStatisticTypeCollection,
} from './smsStatistic';

import {
  buildModel as buildSqlEntityModel,
  sqlEntityTypeCollection,
} from './sqlEntity';

import { buildModel as buildSqlLogModel, sqlLogTypeCollection } from './sqlLog';

import {
  buildModel as buildSubsidiaryModel,
  subsidiaryTypeCollection,
} from './subsidiary';

import { buildModel as buildTagModel, tagTypeCollection } from './tag';

import {
  buildModel as buildUploadHistoryModel,
  uploadHistoryTypeCollection,
} from './uploadHistory';

import { buildModel as buildUserModel, userTypeCollection } from './user';

import {
  buildModel as buildUserDepartmentInfoModel,
  userDepartmentInfoTypeCollection,
} from './userDepartmentInfo';

import {
  buildModel as buildUserDeviceModel,
  userDeviceTypeCollection,
} from './userDevice';

import {
  buildModel as buildUserGeneralDiscourseModel,
  userGeneralDiscourseTypeCollection,
} from './userGeneralDiscourse';

import {
  buildModel as buildUserLoginLogModel,
  userLoginLogTypeCollection,
} from './userLoginLog';

import {
  buildModel as buildUserSubsidiaryInfoModel,
  userSubsidiaryInfoTypeCollection,
} from './userSubsidiaryInfo';

import {
  buildModel as buildUserWechatApplicationInfoModel,
  userWechatApplicationInfoTypeCollection,
} from './userWechatApplicationInfo';

import {
  buildModel as buildWeChatMessageRecordModel,
  weChatMessageRecordTypeCollection,
} from './weChatMessageRecord';

import {
  buildModel as buildWorkflowModel,
  workflowTypeCollection,
} from './workflow';

import {
  buildModel as buildWorkflowBranchConditionModel,
  workflowBranchConditionTypeCollection,
} from './workflowBranchCondition';

import {
  buildModel as buildWorkflowBranchConditionItemModel,
  workflowBranchConditionItemTypeCollection,
} from './workflowBranchConditionItem';

import {
  buildModel as buildWorkflowCaseModel,
  workflowCaseTypeCollection,
} from './workflowCase';

import {
  buildModel as buildWorkflowCaseFormAttachmentModel,
  workflowCaseFormAttachmentTypeCollection,
} from './workflowCaseFormAttachment';

import {
  buildModel as buildWorkflowCaseFormStorageModel,
  workflowCaseFormStorageTypeCollection,
} from './workflowCaseFormStorage';

import {
  buildModel as buildWorkflowCaseNextProcessApproveModel,
  workflowCaseNextProcessApproveTypeCollection,
} from './workflowCaseNextProcessApprove';

import {
  buildModel as buildWorkflowCaseNextProcessNotificationModel,
  workflowCaseNextProcessNotificationTypeCollection,
} from './workflowCaseNextProcessNotification';

import {
  buildModel as buildWorkflowCaseNextProcessProgressModel,
  workflowCaseNextProcessProgressTypeCollection,
} from './workflowCaseNextProcessProgress';

import {
  buildModel as buildWorkflowCaseProcessHistoryModel,
  workflowCaseProcessHistoryTypeCollection,
} from './workflowCaseProcessHistory';

import {
  buildModel as buildWorkflowCaseUserMonitorConfigurationModel,
  workflowCaseUserMonitorConfigurationTypeCollection,
} from './workflowCaseUserMonitorConfiguration';

import {
  buildModel as buildWorkflowDebugCaseModel,
  workflowDebugCaseTypeCollection,
} from './workflowDebugCase';

import {
  buildModel as buildWorkflowDebugCaseFormAttachmentModel,
  workflowDebugCaseFormAttachmentTypeCollection,
} from './workflowDebugCaseFormAttachment';

import {
  buildModel as buildWorkflowDebugCaseFormStorageModel,
  workflowDebugCaseFormStorageTypeCollection,
} from './workflowDebugCaseFormStorage';

import {
  buildModel as buildWorkflowDebugCaseNextProcessApproveModel,
  workflowDebugCaseNextProcessApproveTypeCollection,
} from './workflowDebugCaseNextProcessApprove';

import {
  buildModel as buildWorkflowDebugCaseNextProcessNotificationModel,
  workflowDebugCaseNextProcessNotificationTypeCollection,
} from './workflowDebugCaseNextProcessNotification';

import {
  buildModel as buildWorkflowDebugCaseNextProcessProgressModel,
  workflowDebugCaseNextProcessProgressTypeCollection,
} from './workflowDebugCaseNextProcessProgress';

import {
  buildModel as buildWorkflowDebugCaseProcessHistoryModel,
  workflowDebugCaseProcessHistoryTypeCollection,
} from './workflowDebugCaseProcessHistory';

import {
  buildModel as buildWorkflowFormDesignModel,
  workflowFormDesignTypeCollection,
} from './workflowFormDesign';

import {
  buildModel as buildWorkflowLineModel,
  workflowLineTypeCollection,
} from './workflowLine';

import {
  buildModel as buildWorkflowNodeModel,
  workflowNodeTypeCollection,
} from './workflowNode';

import {
  buildModel as buildWorkflowNodeApproverModel,
  workflowNodeApproverTypeCollection,
} from './workflowNodeApprover';

import {
  buildModel as buildWorkflowRangeEffectiveExternalDepartmentRelationModel,
  workflowRangeEffectiveExternalDepartmentRelationTypeCollection,
} from './workflowRangeEffectiveExternalDepartmentRelation';

import {
  buildModel as buildWorkflowRangeEffectiveSubsidiaryRelationModel,
  workflowRangeEffectiveSubsidiaryRelationTypeCollection,
} from './workflowRangeEffectiveSubsidiaryRelation';

export const modelTypeCollection = {
  accessWayTypeCollection,
  administrativeDivisionTypeCollection,
  applicationTypeCollection,
  applicationNavigationTypeCollection,
  applicationSourceTypeCollection,
  applicationVersionTypeCollection,
  articleNotificationApplicationTypeCollection,
  businessSetTypeCollection,
  callCenterTypeCollection,
  callCenterCategoryTypeCollection,
  channelTypeCollection,
  channelExecuteLogSwitchTypeCollection,
  channelSqlLogSwitchTypeCollection,
  cloudStorageTypeCollection,
  currentAccountTypeCollection,
  currentManagementInfrastructureTypeCollection,
  departmentTypeCollection,
  editorTypeCollection,
  emailSenderAgentTypeCollection,
  errorLogTypeCollection,
  executeLogTypeCollection,
  galleryTypeCollection,
  galleryCategoryTypeCollection,
  generalDiscourseTypeCollection,
  generalLogTypeCollection,
  hostServiceTypeCollection,
  hostServiceLogTypeCollection,
  internalTesterTypeCollection,
  keyValueApplicationTypeCollection,
  keyValueInfrastructureTypeCollection,
  keyValueSectionTypeCollection,
  keyValueWorkflowTypeCollection,
  masterManagerTypeCollection,
  masterManagerLoginLogTypeCollection,
  metaDataTypeCollection,
  mongoSlowQueryInfoTypeCollection,
  operationLogTypeCollection,
  optionPoolTypeCollection,
  organizationTypeCollection,
  positionTypeCollection,
  positionGradeTypeCollection,
  presetRoleTypeCollection,
  qrCodeTypeCollection,
  qrCodeCategoryTypeCollection,
  questionTypeCollection,
  questionItemTypeCollection,
  questionnaireTypeCollection,
  questionnaireQuestionTypeCollection,
  questionTagRelationTypeCollection,
  queueInfoTypeCollection,
  sectionTypeCollection,
  sectionApplicationConfigTypeCollection,
  smsCategoryTypeCollection,
  smsCategoryStatisticTypeCollection,
  smsLogTypeCollection,
  smsStatisticTypeCollection,
  sqlEntityTypeCollection,
  sqlLogTypeCollection,
  subsidiaryTypeCollection,
  tagTypeCollection,
  uploadHistoryTypeCollection,
  userTypeCollection,
  userDepartmentInfoTypeCollection,
  userDeviceTypeCollection,
  userGeneralDiscourseTypeCollection,
  userLoginLogTypeCollection,
  userSubsidiaryInfoTypeCollection,
  userWechatApplicationInfoTypeCollection,
  weChatMessageRecordTypeCollection,
  workflowTypeCollection,
  workflowBranchConditionTypeCollection,
  workflowBranchConditionItemTypeCollection,
  workflowCaseTypeCollection,
  workflowCaseFormAttachmentTypeCollection,
  workflowCaseFormStorageTypeCollection,
  workflowCaseNextProcessApproveTypeCollection,
  workflowCaseNextProcessNotificationTypeCollection,
  workflowCaseNextProcessProgressTypeCollection,
  workflowCaseProcessHistoryTypeCollection,
  workflowCaseUserMonitorConfigurationTypeCollection,
  workflowDebugCaseTypeCollection,
  workflowDebugCaseFormAttachmentTypeCollection,
  workflowDebugCaseFormStorageTypeCollection,
  workflowDebugCaseNextProcessApproveTypeCollection,
  workflowDebugCaseNextProcessNotificationTypeCollection,
  workflowDebugCaseNextProcessProgressTypeCollection,
  workflowDebugCaseProcessHistoryTypeCollection,
  workflowFormDesignTypeCollection,
  workflowLineTypeCollection,
  workflowNodeTypeCollection,
  workflowNodeApproverTypeCollection,
  workflowRangeEffectiveExternalDepartmentRelationTypeCollection,
  workflowRangeEffectiveSubsidiaryRelationTypeCollection,
};

export function listModelBuilder() {
  const list = [];

  list.push(buildAccessWayModel);

  list.push(buildAdministrativeDivisionModel);

  list.push(buildApplicationModel);

  list.push(buildApplicationNavigationModel);

  list.push(buildApplicationSourceModel);

  list.push(buildApplicationVersionModel);

  list.push(buildArticleNotificationApplicationModel);

  list.push(buildBusinessSetModel);

  list.push(buildCallCenterModel);

  list.push(buildCallCenterCategoryModel);

  list.push(buildChannelModel);

  list.push(buildChannelExecuteLogSwitchModel);

  list.push(buildChannelSqlLogSwitchModel);

  list.push(buildCloudStorageModel);

  list.push(buildCurrentAccountModel);

  list.push(buildCurrentManagementInfrastructureModel);

  list.push(buildDepartmentModel);

  list.push(buildEditorModel);

  list.push(buildEmailSenderAgentModel);

  list.push(buildErrorLogModel);

  list.push(buildExecuteLogModel);

  list.push(buildGalleryModel);

  list.push(buildGalleryCategoryModel);

  list.push(buildGeneralDiscourseModel);

  list.push(buildGeneralLogModel);

  list.push(buildHostServiceModel);

  list.push(buildHostServiceLogModel);

  list.push(buildInternalTesterModel);

  list.push(buildKeyValueApplicationModel);

  list.push(buildKeyValueInfrastructureModel);

  list.push(buildKeyValueSectionModel);

  list.push(buildKeyValueWorkflowModel);

  list.push(buildMasterManagerModel);

  list.push(buildMasterManagerLoginLogModel);

  list.push(buildMetaDataModel);

  list.push(buildMongoSlowQueryInfoModel);

  list.push(buildOperationLogModel);

  list.push(buildOptionPoolModel);

  list.push(buildOrganizationModel);

  list.push(buildPositionModel);

  list.push(buildPositionGradeModel);

  list.push(buildPresetRoleModel);

  list.push(buildQrCodeModel);

  list.push(buildQrCodeCategoryModel);

  list.push(buildQuestionModel);

  list.push(buildQuestionItemModel);

  list.push(buildQuestionnaireModel);

  list.push(buildQuestionnaireQuestionModel);

  list.push(buildQuestionTagRelationModel);

  list.push(buildQueueInfoModel);

  list.push(buildSectionModel);

  list.push(buildSectionApplicationConfigModel);

  list.push(buildSmsCategoryModel);

  list.push(buildSmsCategoryStatisticModel);

  list.push(buildSmsLogModel);

  list.push(buildSmsStatisticModel);

  list.push(buildSqlEntityModel);

  list.push(buildSqlLogModel);

  list.push(buildSubsidiaryModel);

  list.push(buildTagModel);

  list.push(buildUploadHistoryModel);

  list.push(buildUserModel);

  list.push(buildUserDepartmentInfoModel);

  list.push(buildUserDeviceModel);

  list.push(buildUserGeneralDiscourseModel);

  list.push(buildUserLoginLogModel);

  list.push(buildUserSubsidiaryInfoModel);

  list.push(buildUserWechatApplicationInfoModel);

  list.push(buildWeChatMessageRecordModel);

  list.push(buildWorkflowModel);

  list.push(buildWorkflowBranchConditionModel);

  list.push(buildWorkflowBranchConditionItemModel);

  list.push(buildWorkflowCaseModel);

  list.push(buildWorkflowCaseFormAttachmentModel);

  list.push(buildWorkflowCaseFormStorageModel);

  list.push(buildWorkflowCaseNextProcessApproveModel);

  list.push(buildWorkflowCaseNextProcessNotificationModel);

  list.push(buildWorkflowCaseNextProcessProgressModel);

  list.push(buildWorkflowCaseProcessHistoryModel);

  list.push(buildWorkflowCaseUserMonitorConfigurationModel);

  list.push(buildWorkflowDebugCaseModel);

  list.push(buildWorkflowDebugCaseFormAttachmentModel);

  list.push(buildWorkflowDebugCaseFormStorageModel);

  list.push(buildWorkflowDebugCaseNextProcessApproveModel);

  list.push(buildWorkflowDebugCaseNextProcessNotificationModel);

  list.push(buildWorkflowDebugCaseNextProcessProgressModel);

  list.push(buildWorkflowDebugCaseProcessHistoryModel);

  list.push(buildWorkflowFormDesignModel);

  list.push(buildWorkflowLineModel);

  list.push(buildWorkflowNodeModel);

  list.push(buildWorkflowNodeApproverModel);

  list.push(buildWorkflowRangeEffectiveExternalDepartmentRelationModel);

  list.push(buildWorkflowRangeEffectiveSubsidiaryRelationModel);

  return list;
}
