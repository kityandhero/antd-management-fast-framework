import { request, requestMode } from 'easy-soft-utility';

export async function singleListData() {
  return request({
    api: `/notice/singleList`,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      list: [],
    },
  });
}

export async function changeNoticeReadData() {
  return request({
    api: `/notice/getCurrent`,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {},
    },
  });
}

export async function clearNoticeData() {
  return request({
    api: `/notice/clearNotice`,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {},
    },
  });
}
