import { request } from 'easy-soft-utility';

export async function getData(parameters) {
  return request({
    api: '/currentManagement/get',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/currentManagement/updateBasicInfo',
    params: parameters,
  });
}

export async function updateFileStorageInfoData(parameters) {
  return request({
    api: '/currentManagement/updateFileStorageInfo',
    params: parameters,
  });
}

export async function updateSmsInfoData(parameters) {
  return request({
    api: '/currentManagement/updateSmsInfo',
    params: parameters,
  });
}

export async function toggleQiniuImageSwitchData(parameters) {
  return request({
    api: '/currentManagement/toggleQiniuImageSwitch',
    params: parameters,
  });
}

export async function toggleQiniuAudioSwitchData(parameters) {
  return request({
    api: '/currentManagement/toggleQiniuAudioSwitch',
    params: parameters,
  });
}

export async function toggleQiniuVideoSwitchData(parameters) {
  return request({
    api: '/currentManagement/toggleQiniuVideoSwitch',
    params: parameters,
  });
}

export async function toggleQiniuFileSwitchData(parameters) {
  return request({
    api: '/currentManagement/toggleQiniuFileSwitch',
    params: parameters,
  });
}
