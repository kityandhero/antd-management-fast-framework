import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/executeLog/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/executeLog/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/executeLog/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeMultiDataApiAddress = '/executeLog/removeMulti';

export async function removeMultiData(parameters) {
  return request({
    api: removeMultiDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress = '/executeLog/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}

export const createTestLogDataApiAddress = '/executeLog/createTestLog';

export async function createTestLogData(parameters) {
  return request({
    api: createTestLogDataApiAddress,
    params: parameters,
  });
}
