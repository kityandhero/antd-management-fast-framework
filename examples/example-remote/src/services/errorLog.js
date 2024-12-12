import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/errorLog/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/errorLog/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/errorLog/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeMultiDataApiAddress = '/errorLog/removeMulti';

export async function removeMultiData(parameters) {
  return request({
    api: removeMultiDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress = '/errorLog/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}

export const createTestExceptionDataApiAddress =
  '/errorLog/createTestException';

export async function createTestExceptionData(parameters) {
  return request({
    api: createTestExceptionDataApiAddress,
    params: parameters,
  });
}
