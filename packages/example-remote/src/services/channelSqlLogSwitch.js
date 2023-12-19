import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/channelSqlLogSwitch/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/channelSqlLogSwitch/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/channelSqlLogSwitch/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const updateKeyValueInfoDataApiAddress =
  '/channelSqlLogSwitch/updateKeyValueInfo';

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: updateKeyValueInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/channelSqlLogSwitch/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
