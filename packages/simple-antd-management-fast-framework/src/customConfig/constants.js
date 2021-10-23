export const unknownLabel = '未知';

export const amapkey = 'bff966857f8311eb68ea03dcbac869ad';

export const goodsTypeCollection = {
  product: 1,
  simpleTicket: 2,
  lineTicket: 3,
};

export const colorCollection = {
  checkCircleColor: '#52c41a',
  closeCircleColor: '#ec8402',
  price: '#267cb7',
};

export const couponScopeCollection = {
  unknown: -1,
  unlimited: 0,
  rank: 1,
  goods: 2,
  multipleGoods: 3,
};

export const couponSceneCollection = {
  customerTake: 0,
  giveAfterBuy: 2,
  distributedToSharer: 3,
  distributedToShareVisitor: 4,
};

export const defaultPoint = [113.672108, 34.749387];

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
