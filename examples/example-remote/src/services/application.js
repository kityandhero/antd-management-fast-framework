import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/application/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/application/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/application/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const getConfigureDataApiAddress = '/application/getConfigure';

export async function getConfigureData(parameters) {
  return request({
    api: getConfigureDataApiAddress,
    params: parameters,
  });
}

export const getWechatApplicationAccessTokenDataApiAddress =
  '/application/getWechatApplicationAccessToken';

export async function getWechatApplicationAccessTokenData(parameters) {
  return request({
    api: getWechatApplicationAccessTokenDataApiAddress,
    params: parameters,
  });
}

export const getUnlimitedWechatMicroApplicationQrCodeDataApiAddress =
  '/application/getUnlimitedWechatMicroApplicationQrCode';

export async function getUnlimitedWechatMicroApplicationQrCodeData(parameters) {
  return request({
    api: getUnlimitedWechatMicroApplicationQrCodeDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/application/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateWeChatApplicationInfoDataApiAddress =
  '/application/updateWeChatApplicationInfo';

export async function updateWeChatApplicationInfoData(parameters) {
  return request({
    api: updateWeChatApplicationInfoDataApiAddress,
    params: parameters,
  });
}

export const updateWeChatPayCertificateInfoDataApiAddress =
  '/application/updateWeChatPayCertificateInfo';

export async function updateWeChatPayCertificateInfoData(parameters) {
  return request({
    api: updateWeChatPayCertificateInfoDataApiAddress,
    params: parameters,
  });
}

export const updateKeyValueInfoDataApiAddress =
  '/application/updateKeyValueInfo';

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: updateKeyValueInfoDataApiAddress,
    params: parameters,
  });
}

export const updateMessageChannelApplicationInfoDataApiAddress =
  '/application/updateMessageChannelApplicationInfo';

export async function updateMessageChannelApplicationInfoData(parameters) {
  return request({
    api: updateMessageChannelApplicationInfoDataApiAddress,
    params: parameters,
  });
}

export const toggleCustomerAutomaticRegistrationDataApiAddress =
  '/application/toggleCustomerAutomaticRegistration';

export async function toggleCustomerAutomaticRegistrationData(parameters) {
  return request({
    api: toggleCustomerAutomaticRegistrationDataApiAddress,
    params: parameters,
  });
}

export const setStartDataApiAddress = '/application/setStart';

export async function setStartData(parameters) {
  return request({
    api: setStartDataApiAddress,
    params: parameters,
  });
}

export const setStopDataApiAddress = '/application/setStop';

export async function setStopData(parameters) {
  return request({
    api: setStopDataApiAddress,
    params: parameters,
  });
}

export const setOwnDataApiAddress = '/application/setOwn';

export async function setOwnData(parameters) {
  return request({
    api: setOwnDataApiAddress,
    params: parameters,
  });
}

export const testJiGuangSendDeviceDataApiAddress =
  '/application/testJiGuangSendDevice';

export async function testJiGuangSendDeviceData(parameters) {
  return request({
    api: testJiGuangSendDeviceDataApiAddress,
    params: parameters,
  });
}

export const testSendWechatTemplateMessageDataApiAddress =
  '/application/testSendWechatTemplateMessage';

export async function testSendWechatTemplateMessageData(parameters) {
  return request({
    api: testSendWechatTemplateMessageDataApiAddress,
    params: parameters,
  });
}

export const testSendWechatUniformMessageDataApiAddress =
  '/application/testSendWechatUniformMessage';

export async function testSendWechatUniformMessageData(parameters) {
  return request({
    api: testSendWechatUniformMessageDataApiAddress,
    params: parameters,
  });
}

export const testSendSmsCaptchaDataApiAddress =
  '/application/testSendSmsCaptcha';

export async function testSendSmsCaptchaData(parameters) {
  return request({
    api: testSendSmsCaptchaDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/application/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/application/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const uploadVideoDataApiAddress = '/application/uploadVideo';

export async function uploadVideoData(parameters) {
  return request({
    api: uploadVideoDataApiAddress,
    params: parameters,
  });
}

export const uploadAudioDataApiAddress = '/application/uploadAudio';

export async function uploadAudioData(parameters) {
  return request({
    api: uploadAudioDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/application/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}

export const uploadCertificateDataApiAddress = '/application/uploadCertificate';

export async function uploadCertificateData(parameters) {
  return request({
    api: uploadCertificateDataApiAddress,
    params: parameters,
  });
}

export const getCustomGlobalDataDataApiAddress =
  '/application/getCustomGlobalData';

export async function getCustomGlobalDataData(parameters) {
  return request({
    api: getCustomGlobalDataDataApiAddress,
    params: parameters,
  });
}

export const getCustomGlobalDataItemDataApiAddress =
  '/application/getCustomGlobalDataItem';

export async function getCustomGlobalDataItemData(parameters) {
  return request({
    api: getCustomGlobalDataItemDataApiAddress,
    params: parameters,
  });
}

export const addCustomGlobalDataItemDataApiAddress =
  '/application/addCustomGlobalDataItem';

export async function addCustomGlobalDataItemData(parameters) {
  return request({
    api: addCustomGlobalDataItemDataApiAddress,
    params: parameters,
  });
}

export const updateCustomGlobalDataItemDataApiAddress =
  '/application/updateCustomGlobalDataItem';

export async function updateCustomGlobalDataItemData(parameters) {
  return request({
    api: updateCustomGlobalDataItemDataApiAddress,
    params: parameters,
  });
}

export const removeCustomGlobalDataItemDataApiAddress =
  '/application/removeCustomGlobalDataItem';

export async function removeCustomGlobalDataItemData(parameters) {
  return request({
    api: removeCustomGlobalDataItemDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/application/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
