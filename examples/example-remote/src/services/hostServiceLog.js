import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/hostServiceLog/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/hostServiceLog/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/hostServiceLog/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeMultiDataApiAddress = '/hostServiceLog/removeMulti';

export async function removeMultiData(parameters) {
  return request({
    api: removeMultiDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress = '/hostServiceLog/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}

export const createTestLogDataApiAddress = '/hostServiceLog/createTestLog';

export async function createTestLogData(parameters) {
  return request({
    api: createTestLogDataApiAddress,
    params: parameters,
  });
}
