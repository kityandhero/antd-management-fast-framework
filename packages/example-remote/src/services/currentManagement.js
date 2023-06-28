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
