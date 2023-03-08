// import { message } from 'antd';

// import { getPageQuery } from 'antd-management-fast-common';
// import { flushLocalStorage } from 'easy-soft-utility';

import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

// import {
//   queryStringify,
//   redirectToPath,
// } from 'antd-management-fast-common';
// import { defaultSettings } from '../defaultSettings';
import { getCaptchaData, signInData, signOutData } from '../services/entrance';

// const entranceApi = defaultSettings.getEntranceApi();

export function buildEntranceModel() {
  return {
    namespace: 'entrance',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *signIn({ payload, alias }, { call, put }) {
        const response = yield call(signInData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *getCaptcha({ payload }, { call }) {
        yield call(getCaptchaData, payload);
      },
      *signOut({ payload, alias }, { call, put }) {
        const response = yield call(signOutData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;

        // const { redirect } = getPageQuery(); // Note: There may be security issues, please note

        // if (window.location.pathname !== entranceApi && !redirect) {
        //   flushLocalStorage();

        //   message.info('退出登录成功！', 0.6).then(() => {
        //     redirectToPath({
        //       pathname: entranceApi,
        //       search: queryStringify({
        //         redirect: window.location.href,
        //       }),
        //     });
        //   });
        // }
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
