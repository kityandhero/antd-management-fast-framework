import request from 'antd-management-fast-framework/lib/utils/request';

export async function fakeAccountLogin(params) {
  return request({
    api: `/api/login/account`,
    params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request({
    api: `/api/login/captcha?mobile=${mobile}`,
  });
}
