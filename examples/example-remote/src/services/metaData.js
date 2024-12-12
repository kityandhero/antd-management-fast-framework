import { request } from 'easy-soft-utility';

export const getDataApiAddress = '/metaData/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}
