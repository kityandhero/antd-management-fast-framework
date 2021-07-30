import { corsTarget } from '../../lib/utils/tools';

import { pageConfig as pageConfigSource } from './pageConfig';
import { accessWayCollection as accessWayCollectionSource } from './accessWayCollection';

export const amapkey = 'bff966857f8311eb68ea03dcbac869ad';

export const goodsTypeCollection = {
  product: 1,
  simpleTicket: 2,
  lineTicket: 3,
};

export const colorCollection = {
  checkCircleColor: '#52c41a',
  closeCircleColor: '#ec8402',
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

export const formNameCollection = {
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '数据的创建时间',
  },
  customOperate: {
    label: '操作',
    name: 'operateName',
    helper: '',
  },
};

export const priceColor = '#267cb7';

export const defaultPoint = [113.672108, 34.749387];

export function getApiVersion() {
  // const  version= "v1";
  const version = 'beta';

  const path = `/${version}`;

  return path;
}

export function corsTargetWithApiVersion() {
  const path = `${corsTarget()}${getApiVersion()}`;

  return path;
}

export function showSelectLanguage() {
  return false;
}

export function showLogoInLoginView() {
  return true;
}

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
