import { request } from 'antd-management-fast-common/es/utils/requestAssistor';

export async function signInData(params) {
  return request({
    api: '/entrance/signIn',
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        token: 'e03c9a65-6537-4a44-acf4-bbf472fdd0fe',
        name: '张三',
        currentAuthority: ['super'],
      },
    },
  });
}

export async function signUpData(params) {
  return request({
    api: `/entrance/signUp`,
    params,
  });
}

export async function getCaptchaData(mobile) {
  return request({
    api: `/entrance/captcha?mobile=${mobile}`,
  });
}

export async function signOutData(params) {
  return request({
    api: `/entrance/signOut`,
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
