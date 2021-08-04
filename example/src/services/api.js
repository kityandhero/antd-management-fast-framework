import { stringify } from 'qs';
import moment from 'moment';
import { request } from 'antd-management-fast-framework/lib/utils/requestAssistor';

export async function queryProjectNotice() {
  return request({
    api: '/api/project/notice',
  });
}

export async function queryActivities() {
  return request({
    api: '/api/activities',
  });
}

export async function queryRule(params) {
  return request({
    api: `/api/rule?${stringify(params)}`,
  });
}

export async function removeRule(params) {
  return request({
    api: `/api/rule`,
    params: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request({
    api: `/api/rule`,
    params: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request({
    api: `/api/rule`,
    params: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request({
    api: `/api/forms`,
    params,
  });
}

export async function fakeChartData() {
  // if (transferToVirtualAccess()) {
  const visitData = [];
  const beginDay = new Date().getTime();

  const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
  for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY[i],
    });
  }

  const visitData2 = [];
  const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
  for (let i = 0; i < fakeY2.length; i += 1) {
    visitData2.push({
      x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
      y: fakeY2[i],
    });
  }

  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200,
    });
  }
  const searchData = [];
  for (let i = 0; i < 50; i += 1) {
    searchData.push({
      index: i + 1,
      keyword: `搜索关键词-${i}`,
      count: Math.floor(Math.random() * 1000),
      range: Math.floor(Math.random() * 100),
      status: Math.floor((Math.random() * 10) % 2),
    });
  }
  const salesTypeData = [
    {
      x: '家用电器',
      y: 4544,
    },
    {
      x: '食用酒水',
      y: 3321,
    },
    {
      x: '个护健康',
      y: 3113,
    },
    {
      x: '服饰箱包',
      y: 2341,
    },
    {
      x: '母婴产品',
      y: 1231,
    },
    {
      x: '其他',
      y: 1231,
    },
  ];

  const salesTypeDataOnline = [
    {
      x: '家用电器',
      y: 244,
    },
    {
      x: '食用酒水',
      y: 321,
    },
    {
      x: '个护健康',
      y: 311,
    },
    {
      x: '服饰箱包',
      y: 41,
    },
    {
      x: '母婴产品',
      y: 121,
    },
    {
      x: '其他',
      y: 111,
    },
  ];

  const salesTypeDataOffline = [
    {
      x: '家用电器',
      y: 99,
    },
    {
      x: '食用酒水',
      y: 188,
    },
    {
      x: '个护健康',
      y: 344,
    },
    {
      x: '服饰箱包',
      y: 255,
    },
    {
      x: '其他',
      y: 65,
    },
  ];

  const offlineData = [];
  for (let i = 0; i < 10; i += 1) {
    offlineData.push({
      name: `Stores ${i}`,
      cvr: Math.ceil(Math.random() * 9) / 10,
    });
  }
  const offlineChartData = [];
  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  const radarOriginData = [
    {
      name: '个人',
      ref: 10,
      koubei: 8,
      output: 4,
      contribute: 5,
      hot: 7,
    },
    {
      name: '团队',
      ref: 3,
      koubei: 9,
      output: 6,
      contribute: 3,
      hot: 1,
    },
    {
      name: '部门',
      ref: 4,
      koubei: 1,
      output: 6,
      contribute: 5,
      hot: 7,
    },
  ];

  const radarData = [];
  const radarTitleMap = {
    ref: '引用',
    koubei: '口碑',
    output: '产量',
    contribute: '贡献',
    hot: '热度',
  };
  radarOriginData.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key !== 'name') {
        radarData.push({
          name: item.name,
          label: radarTitleMap[key],
          value: item[key],
        });
      }
    });
  });

  return request({
    api: `/api/fake_chart_data`,
    virtualSuccessResponse: {
      data: {
        visitData,
        visitData2,
        salesData,
        searchData,
        offlineData,
        offlineChartData,
        salesTypeData,
        salesTypeDataOnline,
        salesTypeDataOffline,
        radarData,
      },
    },
  });
}

export async function queryTags() {
  return request({
    api: `/api/tags`,
  });
}

export async function queryBasicProfile() {
  return request({
    api: `/api/profile/basic`,
  });
}

export async function queryAdvancedProfile() {
  return request({
    api: `/api/profile/advanced`,
  });
}

export async function queryFakeList(params) {
  return request({
    api: `/api/fake_list?${stringify(params)}`,
  });
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;

  return request({
    api: `/api/fake_list?count=${count}`,
    params: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;

  return request({
    api: `/api/fake_list?count=${count}`,
    params: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;

  return request({
    api: `/api/fake_list?count=${count}`,
    params: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function accountLogin(params) {
  return request({
    api: '/entrance/signIn',
    params,
    virtualSuccessResponse: {
      data: {
        name: '张三量',
        currentAuthority: ['super'],
      },
    },
    virtualNeedAuthorize: false,
  });

  // const url = `${getApiVersion()}/entrance/signIn`;

  // if (transferToVirtualAccess(url)) {
  //   const result = await apiVirtualAccess((resolve) => {
  //     setTimeout(() => {
  //       const {
  //         password,
  //         userName,
  //         //  type
  //       } = params;

  //       if (password === '888888' && userName === 'admin') {
  //         resolve(
  //           apiVirtualSuccessData({
  //             data: {
  //               data: {
  //                 // id: 1,
  //                 // token: '059b1900-7d7b-40aa-872f-197d04b03385',
  //                 // userName: 'admin',
  //                 // type,
  //                 // role: [],
  //                 currentAuthority: ['admin'],
  //                 // menuAuthorityIds: '1',
  //                 name: '张晓辉',
  //                 city: '152',
  //                 type: 1,
  //                 token: '3415136134125',
  //               },
  //             },
  //             needAuthorize: false,
  //           }),
  //         );
  //       } else if (password === '123456' && userName === 'user') {
  //         resolve(
  //           apiVirtualSuccessData({
  //             data: {
  //               data: {
  //                 // id: 2,
  //                 // token: 'a9f98dab-00c1-4929-b79f-bacd1a7846d0',
  //                 // userName: 'user',
  //                 // type,
  //                 // role: [],
  //                 currentAuthority: ['user'],
  //                 // menuAuthorityIds: '1',
  //                 name: '张烟',
  //                 city: '152',
  //                 type: 1,
  //                 token: '4567357242135',
  //               },
  //             },
  //             needAuthorize: false,
  //           }),
  //         );
  //       } else {
  //         resolve(apiVirtualFailData(1001, '用户名不存在或密码错误', false));
  //       }
  //     }, 800);
  //   });

  //   return result;
  // }

  // return request(url, {
  //   method: 'POST',
  //   data: params,
  // });
}

export async function fakeRegister(params) {
  return request({
    api: `/api/register`,
    params,
  });
}

export async function queryNotices() {
  return request({
    api: `/Manager/ListNotice`,
  });
}

export async function getFakeCaptcha(mobile) {
  return request({
    api: `/api/captcha?mobile=${mobile}`,
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
