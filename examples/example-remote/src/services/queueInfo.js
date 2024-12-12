import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/queueInfo/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/queueInfo/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/queueInfo/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const tryStartAllDataApiAddress = '/queueInfo/tryStartAll';

export async function tryStartAllData(parameters) {
  return request({
    api: tryStartAllDataApiAddress,
    params: parameters,
  });
}

export const trySendDataApiAddress = '/queueInfo/trySend';

export async function trySendData(parameters) {
  return request({
    api: trySendDataApiAddress,
    params: parameters,
  });
}

export const tryPeekDataApiAddress = '/queueInfo/tryPeek';

export async function tryPeekData(parameters) {
  return request({
    api: tryPeekDataApiAddress,
    params: parameters,
  });
}

export const tryDequeueDataApiAddress = '/queueInfo/tryDequeue';

export async function tryDequeueData(parameters) {
  return request({
    api: tryDequeueDataApiAddress,
    params: parameters,
  });
}

export const tryPurgeDataApiAddress = '/queueInfo/tryPurge';

export async function tryPurgeData(parameters) {
  return request({
    api: tryPurgeDataApiAddress,
    params: parameters,
  });
}
