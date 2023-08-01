import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/yonYouPushMessage/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/yonYouPushMessage/get',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/yonYouPushMessage/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/yonYouPushMessage/pageListOperateLog',
    params: parameters,
  });
}
