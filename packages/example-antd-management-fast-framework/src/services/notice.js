import { request } from 'antd-management-fast-common/es/utils/requestAssistor';

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
