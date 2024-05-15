import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/userDepartmentInfo/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/userDepartmentInfo/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/userDepartmentInfo/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setPrimaryDataApiAddress = '/userDepartmentInfo/setPrimary';

export async function setPrimaryData(parameters) {
  return request({
    api: setPrimaryDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/userDepartmentInfo/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/userDepartmentInfo/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
