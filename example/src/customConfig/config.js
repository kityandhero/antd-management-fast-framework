import { pageConfig as pageConfigSource } from './pageConfig';
import { accessWayCollection as accessWayCollectionSource } from './accessWayCollection';

export const accessWayCollection = accessWayCollectionSource || {};

export const pageConfig = pageConfigSource || {};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
