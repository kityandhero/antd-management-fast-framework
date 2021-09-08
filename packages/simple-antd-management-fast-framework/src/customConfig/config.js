import { accessWayCollection as accessWayCollectionSource } from './accessWayCollection';

export const accessWayCollection = accessWayCollectionSource || {};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
