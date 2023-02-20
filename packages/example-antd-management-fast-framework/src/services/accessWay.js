import { request, requestMode } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: `/accessWay/pageList`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      extra: {
        pageNo: 1,
        pageSize: 10,
        total: 1,
      },
      list: [
        {
          accessWayId: '4562025121544235',
          name: '模块1',
          relativePath: '/page/url1',
          guidTag: 'a2777e86-1f8a-43d3-98c8-4eaadf2a3774',
          channel: '745826',
          channelNote: '渠道1',
          status: 1,
          statusNote: '上线',
          createTime: '2021-08-21 15:41:23',
        },
        {
          accessWayId: '145236987121',
          name: '模块2',
          relativePath: '/page/url2',
          guidTag: '6b7b0996-3441-4401-9781-96fdc2937fc0',
          channel: '1256324',
          channelNote: '渠道2',
          status: 0,
          statusNote: '下线',
          createTime: '2021-08-20 08:44:28',
        },
      ],
    },
  });
}

export async function getData(parameters) {
  return request({
    api: `/accessWay/get`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        accessWayId: '145236987121',
        name: '模块1',
        relativePath: '/page/url1',
        guidTag: 'a2777e86-1f8a-43d3-98c8-4eaadf2a3774',
        channel: '745826',
        channelNote: '渠道1',
        status: 1,
        statusNote: '上线',
        createTime: '2021-08-21 15:41:23',
      },
    },
  });
}

export async function setOnlineData(parameters) {
  return request({
    api: `/accessWay/setOnline`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        accessWayId: '145236987121',
        status: 1,
      },
    },
  });
}

export async function setOfflineData(parameters) {
  return request({
    api: `/accessWay/setOffline`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        accessWayId: '145236987121',
        status: 0,
      },
    },
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: `/accessWay/refreshCache`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {
        accessWayId: '145236987121',
        status: 0,
      },
    },
  });
}
