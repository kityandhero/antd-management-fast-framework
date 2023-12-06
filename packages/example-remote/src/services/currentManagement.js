import { request } from 'easy-soft-utility';

export const pageListDefaultImageDataApiAddress =
  '/currentManagement/pageListDefaultImage';

export async function pageListDefaultImageData(parameters) {
  return request({
    api: pageListDefaultImageDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/currentManagement/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/currentManagement/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateFileStorageInfoDataApiAddress =
  '/currentManagement/updateFileStorageInfo';

export async function updateFileStorageInfoData(parameters) {
  return request({
    api: updateFileStorageInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSmsInfoDataApiAddress = '/currentManagement/updateSmsInfo';

export async function updateSmsInfoData(parameters) {
  return request({
    api: updateSmsInfoDataApiAddress,
    params: parameters,
  });
}

export const updateFlowDebugUserIdDataApiAddress =
  '/currentManagement/updateFlowDebugUserId';

export async function updateFlowDebugUserIdData(parameters) {
  return request({
    api: updateFlowDebugUserIdDataApiAddress,
    params: parameters,
  });
}

export const updateSecretKeyInfoDataApiAddress =
  '/currentManagement/updateSecretKeyInfo';

export async function updateSecretKeyInfoData(parameters) {
  return request({
    api: updateSecretKeyInfoDataApiAddress,
    params: parameters,
  });
}

export const updateYonYouKeyInfoDataApiAddress =
  '/currentManagement/updateYonYouKeyInfo';

export async function updateYonYouKeyInfoData(parameters) {
  return request({
    api: updateYonYouKeyInfoDataApiAddress,
    params: parameters,
  });
}

export const updateKeyValueInfoDataApiAddress =
  '/currentManagement/updateKeyValueInfo';

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: updateKeyValueInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshKeyValueCacheDataApiAddress =
  '/currentManagement/refreshKeyValueCache';

export async function refreshKeyValueCacheData(parameters) {
  return request({
    api: refreshKeyValueCacheDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuImageSwitchDataApiAddress =
  '/currentManagement/toggleQiniuImageSwitch';

export async function toggleQiniuImageSwitchData(parameters) {
  return request({
    api: toggleQiniuImageSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuAudioSwitchDataApiAddress =
  '/currentManagement/toggleQiniuAudioSwitch';

export async function toggleQiniuAudioSwitchData(parameters) {
  return request({
    api: toggleQiniuAudioSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuVideoSwitchDataApiAddress =
  '/currentManagement/toggleQiniuVideoSwitch';

export async function toggleQiniuVideoSwitchData(parameters) {
  return request({
    api: toggleQiniuVideoSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleQiniuFileSwitchDataApiAddress =
  '/currentManagement/toggleQiniuFileSwitch';

export async function toggleQiniuFileSwitchData(parameters) {
  return request({
    api: toggleQiniuFileSwitchDataApiAddress,
    params: parameters,
  });
}

export const testSecretKeyDataApiAddress = '/currentManagement/testSecretKey';

export async function testSecretKeyData(parameters) {
  return request({
    api: testSecretKeyDataApiAddress,
    params: parameters,
  });
}
