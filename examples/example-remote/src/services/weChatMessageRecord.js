import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/weChatMessageRecord/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/weChatMessageRecord/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/weChatMessageRecord/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeMultiDataApiAddress = '/weChatMessageRecord/removeMulti';

export async function removeMultiData(parameters) {
  return request({
    api: removeMultiDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress = '/weChatMessageRecord/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}
