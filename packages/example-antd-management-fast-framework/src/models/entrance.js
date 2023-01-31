// import { message } from 'antd';

// import { getPageQuery } from 'antd-management-fast-common';
// import { flushLocalStorage } from 'easy-soft-utility';

import {
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common';

// import {
//   queryStringify,
//   redirectToPath,
// } from 'antd-management-fast-common';
// import { defaultSettings } from '../defaultSettings';
import { getCaptchaData, signInData, signOutData } from '../services/entrance';

// const entrancePath = defaultSettings.getEntrancePath();

export default {
  namespace: 'entrance',

  state: {
    ...tacitlyState,
  },

  effects: {
    *signIn({ payload, alias }, { call, put }) {
      const response = yield call(signInData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getCaptchaData, payload);
    },
    *signOut() {
      const response = yield call(signOutData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;

      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      // if (window.location.pathname !== entrancePath && !redirect) {
      //   flushLocalStorage();

      //   message.info('退出登录成功！', 0.6).then(() => {
      //     redirectToPath({
      //       pathname: entrancePath,
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
