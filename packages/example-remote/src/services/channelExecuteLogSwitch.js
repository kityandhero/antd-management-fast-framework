import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/channelExecuteLogSwitch/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/channelExecuteLogSwitch/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/channelExecuteLogSwitch/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const updateKeyValueInfoDataApiAddress =
  '/channelExecuteLogSwitch/updateKeyValueInfo';

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: updateKeyValueInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/channelExecuteLogSwitch/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
