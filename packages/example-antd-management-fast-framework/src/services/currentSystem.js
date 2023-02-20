import { request } from 'easy-soft-utility';

export async function getData(parameters) {
  return request({
    api: `/CurrentSystem/get`,
    params: parameters,
  });
}
