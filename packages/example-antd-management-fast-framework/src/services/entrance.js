import { request, requestMode } from 'easy-soft-utility';

export async function signInData(parameters) {
  return request({
    api: '/entrance/signIn',
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: {
        token: 'e03c9a65-6537-4a44-acf4-bbf472fdd0fe',
        name: '张三',
        currentAuthority: ['super'],
      },
    },
  });
}

export async function signUpData(parameters) {
  return request({
    api: `/entrance/signUp`,
    params: parameters,
  });
}

export async function getCaptchaData(mobile) {
  return request({
    api: `/entrance/captcha?mobile=${mobile}`,
  });
}

export async function signOutData(parameters) {
  return request({
    api: `/entrance/signOut`,
    params: parameters,
  });
}
