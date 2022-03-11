import { request } from 'antd-management-fast-framework/es/utils/requestAssistor';

export async function singleListData() {
  return request({
    api: `/notice/singleList`,
    virtualSuccessResponse: {
      list: [],
    },
  });
}

export async function changeNoticeReadData() {
  return request({
    api: `/notice/getCurrent`,
    virtualSuccessResponse: {
      data: {},
    },
  });
}

export async function clearNoticeData() {
  return request({
    api: `/notice/clearNotice`,
    virtualSuccessResponse: {
      data: {},
    },
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
