import { request } from 'easy-soft-utility';

export const uploadImageDataApiAddress = '/editor/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
