import { request } from 'easy-soft-utility';

export const changeCollectionDataApiAddress =
  '/governmentAffairManagerRole/changeCollection';

export async function changeCollectionData(parameters) {
  return request({
    api: changeCollectionDataApiAddress,
    params: parameters,
  });
}
