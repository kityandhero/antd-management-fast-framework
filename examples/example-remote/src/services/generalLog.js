import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/generalLog/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/generalLog/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/generalLog/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeMultiDataApiAddress = '/generalLog/removeMulti';

export async function removeMultiData(parameters) {
  return request({
    api: removeMultiDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress = '/generalLog/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}

export const createTestLogDataApiAddress = '/generalLog/createTestLog';

export async function createTestLogData(parameters) {
  return request({
    api: createTestLogDataApiAddress,
    params: parameters,
  });
}
