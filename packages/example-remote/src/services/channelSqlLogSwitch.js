import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/channelSqlLogSwitch/pageList',
    params: parameters,
  });
}

export async function updateKeyValueInfoData(parameters) {
  return request({
    api: '/channelSqlLogSwitch/updateKeyValueInfo',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/channelSqlLogSwitch/refreshCache',
    params: parameters,
  });
}
