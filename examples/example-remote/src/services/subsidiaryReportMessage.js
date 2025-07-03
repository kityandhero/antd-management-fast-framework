import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/subsidiaryReportMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/subsidiaryReportMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const toggleConfirmDataApiAddress =
  '/subsidiaryReportMessage/toggleConfirm';

export async function toggleConfirmData(parameters) {
  return request({
    api: toggleConfirmDataApiAddress,
    params: parameters,
  });
}

export const repayDataApiAddress = '/subsidiaryReportMessage/repay';

export async function repayData(parameters) {
  return request({
    api: repayDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/subsidiaryReportMessage/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/subsidiaryReportMessage/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/subsidiaryReportMessage/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
