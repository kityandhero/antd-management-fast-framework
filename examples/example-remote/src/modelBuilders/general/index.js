import {
  accessWayTypeCollection,
  buildModel as buildAccessWayModel,
} from './accessWay';
import {
  administrativeDivisionTypeCollection,
  buildModel as buildAdministrativeDivisionModel,
} from './administrativeDivision';
import {
  applicationTypeCollection,
  buildModel as buildApplicationModel,
} from './application';
import {
  applicationCustomerFeedbackTypeCollection,
  buildModel as buildApplicationCustomerFeedbackModel,
} from './applicationCustomerFeedback';
import {
  applicationNavigationTypeCollection,
  buildModel as buildApplicationNavigationModel,
} from './applicationNavigation';
import {
  applicationSourceTypeCollection,
  buildModel as buildApplicationSourceModel,
} from './applicationSource';
import {
  applicationUserFeedbackTypeCollection,
  buildModel as buildApplicationUserFeedbackModel,
} from './applicationUserFeedback';
import {
  applicationVersionTypeCollection,
  buildModel as buildApplicationVersionModel,
} from './applicationVersion';
import {
  articleNotificationApplicationTypeCollection,
  buildModel as buildArticleNotificationApplicationModel,
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
  buildModel as buildCustomerModel,
  customerTypeCollection,
} from './customer';
import {
  buildModel as buildCustomerLoginLogModel,
  customerLoginLogTypeCollection,
} from './customerLoginLog';
import {
  buildModel as buildCustomerWechatApplicationInfoModel,
  customerWechatApplicationInfoTypeCollection,
} from './customerWechatApplicationInfo';
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
  buildModel as buildQuestionnaireQuestionRelationModel,
  questionnaireQuestionRelationTypeCollection,
} from './questionnaireQuestionRelation';
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
import {
  buildModel as buildSubsidiaryComplaintCategoryModel,
  subsidiaryComplaintCategoryTypeCollection,
} from './subsidiaryComplaintCategory';
import {
  buildModel as buildSubsidiaryComplaintMessageModel,
  subsidiaryComplaintMessageTypeCollection,
} from './subsidiaryComplaintMessage';
import {
  buildModel as buildSubsidiaryFeedbackMessageModel,
  subsidiaryFeedbackMessageTypeCollection,
} from './subsidiaryFeedbackMessage';
import {
  buildModel as buildSubsidiaryReportMessageModel,
  subsidiaryReportMessageTypeCollection,
} from './subsidiaryReportMessage';
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
  applicationCustomerFeedbackTypeCollection,
  applicationNavigationTypeCollection,
  applicationSourceTypeCollection,
  applicationUserFeedbackTypeCollection,
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
  customerTypeCollection,
  customerLoginLogTypeCollection,
  customerWechatApplicationInfoTypeCollection,
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
  questionnaireQuestionRelationTypeCollection,
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
  subsidiaryComplaintCategoryTypeCollection,
  subsidiaryComplaintMessageTypeCollection,
  subsidiaryFeedbackMessageTypeCollection,
  subsidiaryReportMessageTypeCollection,
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

  list.push(
    buildAccessWayModel,
    buildAdministrativeDivisionModel,
    buildApplicationModel,
    buildApplicationCustomerFeedbackModel,
    buildApplicationNavigationModel,
    buildApplicationSourceModel,
    buildApplicationUserFeedbackModel,
    buildApplicationVersionModel,
    buildArticleNotificationApplicationModel,
    buildBusinessSetModel,
    buildCallCenterModel,
    buildCallCenterCategoryModel,
    buildChannelModel,
    buildChannelExecuteLogSwitchModel,
    buildChannelSqlLogSwitchModel,
    buildCloudStorageModel,
    buildCurrentAccountModel,
    buildCurrentManagementInfrastructureModel,
    buildCustomerModel,
    buildCustomerLoginLogModel,
    buildCustomerWechatApplicationInfoModel,
    buildDepartmentModel,
    buildEditorModel,
    buildEmailSenderAgentModel,
    buildErrorLogModel,
    buildExecuteLogModel,
    buildGalleryModel,
    buildGalleryCategoryModel,
    buildGeneralDiscourseModel,
    buildGeneralLogModel,
    buildHostServiceModel,
    buildHostServiceLogModel,
    buildInternalTesterModel,
    buildKeyValueApplicationModel,
    buildKeyValueInfrastructureModel,
    buildKeyValueSectionModel,
    buildKeyValueWorkflowModel,
    buildMasterManagerModel,
    buildMasterManagerLoginLogModel,
    buildMetaDataModel,
    buildMongoSlowQueryInfoModel,
    buildOperationLogModel,
    buildOptionPoolModel,
    buildOrganizationModel,
    buildPositionModel,
    buildPositionGradeModel,
    buildPresetRoleModel,
    buildQrCodeModel,
    buildQrCodeCategoryModel,
    buildQuestionModel,
    buildQuestionItemModel,
    buildQuestionnaireModel,
    buildQuestionnaireQuestionRelationModel,
    buildQuestionTagRelationModel,
    buildQueueInfoModel,
    buildSectionModel,
    buildSectionApplicationConfigModel,
    buildSmsCategoryModel,
    buildSmsCategoryStatisticModel,
    buildSmsLogModel,
    buildSmsStatisticModel,
    buildSqlEntityModel,
    buildSqlLogModel,
    buildSubsidiaryModel,
    buildSubsidiaryComplaintCategoryModel,
    buildSubsidiaryComplaintMessageModel,
    buildSubsidiaryFeedbackMessageModel,
    buildSubsidiaryReportMessageModel,
    buildTagModel,
    buildUploadHistoryModel,
    buildUserModel,
    buildUserDepartmentInfoModel,
    buildUserDeviceModel,
    buildUserGeneralDiscourseModel,
    buildUserLoginLogModel,
    buildUserSubsidiaryInfoModel,
    buildUserWechatApplicationInfoModel,
    buildWeChatMessageRecordModel,
    buildWorkflowModel,
    buildWorkflowBranchConditionModel,
    buildWorkflowBranchConditionItemModel,
    buildWorkflowCaseModel,
    buildWorkflowCaseFormAttachmentModel,
    buildWorkflowCaseFormStorageModel,
    buildWorkflowCaseNextProcessApproveModel,
    buildWorkflowCaseNextProcessNotificationModel,
    buildWorkflowCaseNextProcessProgressModel,
    buildWorkflowCaseProcessHistoryModel,
    buildWorkflowCaseUserMonitorConfigurationModel,
    buildWorkflowDebugCaseModel,
    buildWorkflowDebugCaseFormAttachmentModel,
    buildWorkflowDebugCaseFormStorageModel,
    buildWorkflowDebugCaseNextProcessApproveModel,
    buildWorkflowDebugCaseNextProcessNotificationModel,
    buildWorkflowDebugCaseNextProcessProgressModel,
    buildWorkflowDebugCaseProcessHistoryModel,
    buildWorkflowFormDesignModel,
    buildWorkflowLineModel,
    buildWorkflowNodeModel,
    buildWorkflowNodeApproverModel,
    buildWorkflowRangeEffectiveExternalDepartmentRelationModel,
    buildWorkflowRangeEffectiveSubsidiaryRelationModel,
  );

  return list;
}
