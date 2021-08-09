import { history } from 'umi';
import { message } from 'antd';
import { stringify } from 'querystring';

import { accountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from 'antd-management-fast-framework/lib/utils/authority';
import { getPageQuery } from 'antd-management-fast-framework/lib/utils/utils';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-framework/lib/utils/tools';
import { setToken, setSupplierFlag, clearCustomData } from '@/customConfig/storageAssist';
import { defaultSettings } from '@/defaultSettings';

const loginPath = defaultSettings.getLoginPath();

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(accountLogin, payload);

      const data = pretreatmentRemoteSingleData(response);

      if (data.dataSuccess) {
        yield put({
          type: 'changeLoginStatus',
          payload: data,
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== loginPath && !redirect) {
        clearCustomData();

        message.info('退出登录成功！', 0.6).then(() => {
          history.replace({
            pathname: loginPath,
            search: stringify({
              redirect: window.location.href,
            }),
          });
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const d = payload;
      const v = pretreatmentRemoteSingleData(d);

      v.data.userName = v.data.name;
      v.data.id = v.data.areaManagerId;
      v.data.type = 1;
      v.data.role = [];

      const { data } = v;
      const { currentAuthority, token: tokenValue, code, role, supplierFlag } = data;

      setAuthority(currentAuthority);
      setToken(tokenValue);
      setSupplierFlag(supplierFlag);

      return {
        ...state,
        status: code,
        role,
      };
    },
  },
};
