import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/subsidiaryComplaintMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/subsidiaryComplaintMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const toggleConfirmDataApiAddress =
  '/subsidiaryComplaintMessage/toggleConfirm';

export async function toggleConfirmData(parameters) {
  return request({
    api: toggleConfirmDataApiAddress,
    params: parameters,
  });
}

export const repayDataApiAddress = '/subsidiaryComplaintMessage/repay';

export async function repayData(parameters) {
  return request({
    api: repayDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/subsidiaryComplaintMessage/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/subsidiaryComplaintMessage/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/subsidiaryComplaintMessage/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
