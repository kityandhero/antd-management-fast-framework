import { request } from 'antd-management-fast-framework/es/utils/requestAssistor';

export async function showAnalysisData(params) {
  return request({
    api: `/dashboard/showAnalysis`,
    params,
  });
}

export async function getSaleCountData(params) {
  return request({
    api: `/dashboard/getSaleCount`,
    params,
  });
}

export async function getSaleAmountData(params) {
  return request({
    api: `/dashboard/getSaleAmount`,
    params,
  });
}

export async function getGoodsCountData(params) {
  return request({
    api: `/dashboard/getGoodsCount`,
    params,
  });
}

export async function getAreaAccountBalanceData(params) {
  return request({
    api: `/dashboard/getAreaAccountBalance`,
    params,
  });
}

export async function getReplenishmentStatisticData(params) {
  return request({
    api: `/dashboard/getReplenishmentStatistic`,
    params,
  });
}

export async function getSaleAmountRangeData(params) {
  return request({
    api: `/dashboard/getSaleAmountRange`,
    params,
  });
}

export async function getSaleCountRangeData(params) {
  return request({
    api: `/dashboard/getSaleCountRange`,
    params,
  });
}

export async function getSearchData(params) {
  return request({
    api: `/dashboard/getSearch`,
    params,
  });
}

export async function getRankStatisticData(params) {
  return request({
    api: `/dashboard/getRankStatistic`,
    params,
  });
}

export async function getStoreStatisticData(params) {
  return request({
    api: `/dashboard/getStoreStatistic`,
    params,
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
