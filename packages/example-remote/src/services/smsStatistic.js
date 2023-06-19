import { request } from 'easy-soft-utility';

export async function getData(parameters) {
  return request({
    api: '/smsStatistic/get',
    params: parameters,
  });
}
