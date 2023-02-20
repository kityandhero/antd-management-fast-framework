import { request } from 'easy-soft-utility';

export default async function queryError(code) {
  return request({
    api: `/api/${code}`,
  });
}
