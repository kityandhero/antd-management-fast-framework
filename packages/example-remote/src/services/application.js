import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/application/pageList',
    params: parameters,
  });
}

export async function singleListData(parameters) {
  return request({
    api: '/application/singleList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/application/get',
    params: parameters,
  });
}

export async function getPagePathConfigData(parameters) {
  return request({
    api: '/application/getPagePathConfig',
    params: parameters,
  });
}

export async function getWeChatMessageTemplateConfigData(parameters) {
  return request({
    api: '/application/getWeChatMessageTemplateConfig',
    params: parameters,
  });
}

export async function getWeChatMessageTargetPathConfigData(parameters) {
  return request({
    api: '/application/getWeChatMessageTargetPathConfig',
    params: parameters,
  });
}

export async function getArticleNotificationConfigData(parameters) {
  return request({
    api: '/application/getArticleNotificationConfig',
    params: parameters,
  });
}

export async function getCheckInConfigData(parameters) {
  return request({
    api: '/application/getCheckInConfig',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/application/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/application/updateBasicInfo',
    params: parameters,
  });
}

export async function updateWeChatApplicationInfoData(parameters) {
  return request({
    api: '/application/updateWeChatApplicationInfo',
    params: parameters,
  });
}

export async function updateWeChatPayCertificateInfoData(parameters) {
  return request({
    api: '/application/updateWeChatPayCertificateInfo',
    params: parameters,
  });
}

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: '/application/updateKeyValueInfo',
    params: parameters,
  });
}

export async function updateMessageChannelApplicationInfoData(parameters) {
  return request({
    api: '/application/updateMessageChannelApplicationInfo',
    params: parameters,
  });
}

export async function setOwnData(parameters) {
  return request({
    api: '/application/setOwn',
    params: parameters,
  });
}

export async function setStartData(parameters) {
  return request({
    api: '/application/setStart',
    params: parameters,
  });
}

export async function setStopData(parameters) {
  return request({
    api: '/application/setStop',
    params: parameters,
  });
}

export async function testSendWechatUniformMessageData(parameters) {
  return request({
    api: '/application/testSendWechatUniformMessage',
    params: parameters,
  });
}

export async function testSendWechatTemplateMessageData(parameters) {
  return request({
    api: '/application/testSendWechatTemplateMessage',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/application/refreshCache',
    params: parameters,
  });
}

export async function getCustomGlobalDataData(parameters) {
  return request({
    api: '/application/getCustomGlobalData',
    params: parameters,
  });
}

export async function getCustomGlobalDataItemData(parameters) {
  return request({
    api: '/application/getCustomGlobalDataItem',
    params: parameters,
  });
}

export async function addCustomGlobalDataItemData(parameters) {
  return request({
    api: '/application/addCustomGlobalDataItem',
    params: parameters,
  });
}

export async function updateCustomGlobalDataItemData(parameters) {
  return request({
    api: '/application/updateCustomGlobalDataItem',
    params: parameters,
  });
}

export async function removeCustomGlobalDataItemData(parameters) {
  return request({
    api: '/application/removeCustomGlobalDataItem',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/application/pageListOperateLog',
    params: parameters,
  });
}
