import { request } from 'antd-management-fast-framework/lib/utils/requestAssistor';

export async function pageListData(params) {
  return request({
    api: `/accessWay/pageList`,
    params,
    virtualSuccessResponse: {
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      list: [],
    },
  });
}

export async function getData(params) {
  return request({
    api: `/accessWay/get`,
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
