import { request } from 'easy-soft-utility';

export const pageListDefaultImageDataApiAddress =
  '/currentManagementInfrastructure/pageListDefaultImage';

export async function pageListDefaultImageData(parameters) {
  return request({
    api: pageListDefaultImageDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/currentManagementInfrastructure/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/currentManagementInfrastructure/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateFileStorageInfoDataApiAddress =
  '/currentManagementInfrastructure/updateFileStorageInfo';

export async function updateFileStorageInfoData(parameters) {
  return request({
    api: updateFileStorageInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSmsInfoDataApiAddress =
  '/currentManagementInfrastructure/updateSmsInfo';

export async function updateSmsInfoData(parameters) {
  return request({
    api: updateSmsInfoDataApiAddress,
    params: parameters,
  });
}

export const updateFlowDebugUserIdDataApiAddress =
  '/currentManagementInfrastructure/updateFlowDebugUserId';

export async function updateFlowDebugUserIdData(parameters) {
  return request({
    api: updateFlowDebugUserIdDataApiAddress,
    params: parameters,
  });
}

export const updateSecretKeyInfoDataApiAddress =
  '/currentManagementInfrastructure/updateSecretKeyInfo';

export async function updateSecretKeyInfoData(parameters) {
  return request({
    api: updateSecretKeyInfoDataApiAddress,
    params: parameters,
  });
}

export const updateKeyValueInfoDataApiAddress =
  '/currentManagementInfrastructure/updateKeyValueInfo';

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: updateKeyValueInfoDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuImageSwitchDataApiAddress =
  '/currentManagementInfrastructure/toggleQiniuImageSwitch';

export async function toggleQiniuImageSwitchData(parameters) {
  return request({
    api: toggleQiniuImageSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuAudioSwitchDataApiAddress =
  '/currentManagementInfrastructure/toggleQiniuAudioSwitch';

export async function toggleQiniuAudioSwitchData(parameters) {
  return request({
    api: toggleQiniuAudioSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuVideoSwitchDataApiAddress =
  '/currentManagementInfrastructure/toggleQiniuVideoSwitch';

export async function toggleQiniuVideoSwitchData(parameters) {
  return request({
    api: toggleQiniuVideoSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuFileSwitchDataApiAddress =
  '/currentManagementInfrastructure/toggleQiniuFileSwitch';

export async function toggleQiniuFileSwitchData(parameters) {
  return request({
    api: toggleQiniuFileSwitchDataApiAddress,
    params: parameters,
  });
}

export const testDiskSpaceMonitoringConfigDataApiAddress =
  '/currentManagementInfrastructure/testDiskSpaceMonitoringConfig';

export async function testDiskSpaceMonitoringConfigData(parameters) {
  return request({
    api: testDiskSpaceMonitoringConfigDataApiAddress,
    params: parameters,
  });
}

export const testDiskSpaceMonitoringEmailDataApiAddress =
  '/currentManagementInfrastructure/testDiskSpaceMonitoringEmail';

export async function testDiskSpaceMonitoringEmailData(parameters) {
  return request({
    api: testDiskSpaceMonitoringEmailDataApiAddress,
    params: parameters,
  });
}

export const testSecretKeyDataApiAddress =
  '/currentManagementInfrastructure/testSecretKey';

export async function testSecretKeyData(parameters) {
  return request({
    api: testSecretKeyDataApiAddress,
    params: parameters,
  });
}

export const refreshFrontEndApplicationConfigDataApiAddress =
  '/currentManagementInfrastructure/refreshFrontEndApplicationConfig';

export async function refreshFrontEndApplicationConfigData(parameters) {
  return request({
    api: refreshFrontEndApplicationConfigDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress =
  '/currentManagementInfrastructure/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
