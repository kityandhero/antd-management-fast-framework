import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflow/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflow/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addOfficeAutomationArticleAuditDataApiAddress =
  '/workflow/addOfficeAutomationArticleAudit';

export async function addOfficeAutomationArticleAuditData(parameters) {
  return request({
    api: addOfficeAutomationArticleAuditDataApiAddress,
    params: parameters,
  });
}

export const addOfficeAutomationProcessApprovalDataApiAddress =
  '/workflow/addOfficeAutomationProcessApproval';

export async function addOfficeAutomationProcessApprovalData(parameters) {
  return request({
    api: addOfficeAutomationProcessApprovalDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/workflow/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setCaseNameTemplateDataApiAddress =
  '/workflow/setCaseNameTemplate';

export async function setCaseNameTemplateData(parameters) {
  return request({
    api: setCaseNameTemplateDataApiAddress,
    params: parameters,
  });
}

export const setSmsTemplateDataApiAddress = '/workflow/setSmsTemplate';

export async function setSmsTemplateData(parameters) {
  return request({
    api: setSmsTemplateDataApiAddress,
    params: parameters,
  });
}

export const toggleApplicantSignSwitchDataApiAddress =
  '/workflow/toggleApplicantSignSwitch';

export async function toggleApplicantSignSwitchData(parameters) {
  return request({
    api: toggleApplicantSignSwitchDataApiAddress,
    params: parameters,
  });
}

export const setDefaultApplicantStatementDataApiAddress =
  '/workflow/setDefaultApplicantStatement';

export async function setDefaultApplicantStatementData(parameters) {
  return request({
    api: setDefaultApplicantStatementDataApiAddress,
    params: parameters,
  });
}

export const toggleAttentionSignSwitchDataApiAddress =
  '/workflow/toggleAttentionSignSwitch';

export async function toggleAttentionSignSwitchData(parameters) {
  return request({
    api: toggleAttentionSignSwitchDataApiAddress,
    params: parameters,
  });
}

export const setDefaultAttentionUserDataApiAddress =
  '/workflow/setDefaultAttentionUser';

export async function setDefaultAttentionUserData(parameters) {
  return request({
    api: setDefaultAttentionUserDataApiAddress,
    params: parameters,
  });
}

export const setDefaultAttentionStatementDataApiAddress =
  '/workflow/setDefaultAttentionStatement';

export async function setDefaultAttentionStatementData(parameters) {
  return request({
    api: setDefaultAttentionStatementDataApiAddress,
    params: parameters,
  });
}

export const setDebugApproverModeDataApiAddress =
  '/workflow/setDebugApproverMode';

export async function setDebugApproverModeData(parameters) {
  return request({
    api: setDebugApproverModeDataApiAddress,
    params: parameters,
  });
}

export const setDebugUserModeDataApiAddress = '/workflow/setDebugUserMode';

export async function setDebugUserModeData(parameters) {
  return request({
    api: setDebugUserModeDataApiAddress,
    params: parameters,
  });
}

export const setDebugUserIdDataApiAddress = '/workflow/setDebugUserId';

export async function setDebugUserIdData(parameters) {
  return request({
    api: setDebugUserIdDataApiAddress,
    params: parameters,
  });
}

export const setChannelDataApiAddress = '/workflow/setChannel';

export async function setChannelData(parameters) {
  return request({
    api: setChannelDataApiAddress,
    params: parameters,
  });
}

export const openMultibranchDataApiAddress = '/workflow/openMultibranch';

export async function openMultibranchData(parameters) {
  return request({
    api: openMultibranchDataApiAddress,
    params: parameters,
  });
}

export const openMultiEndDataApiAddress = '/workflow/openMultiEnd';

export async function openMultiEndData(parameters) {
  return request({
    api: openMultiEndDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/workflow/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/workflow/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const createDuplicateDataApiAddress = '/workflow/createDuplicate';

export async function createDuplicateData(parameters) {
  return request({
    api: createDuplicateDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflow/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflow/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/workflow/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
