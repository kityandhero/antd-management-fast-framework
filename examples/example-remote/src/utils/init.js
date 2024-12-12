// 此文件将会从模板库自动更新，请勿改动此文件内容。
// 此文件用于初始化相关

import {
  logExecute,
  //  showSimpleInfoNotification
} from 'easy-soft-utility';

import { defaultUserAvatar } from 'antd-management-fast-common';
import {
  configEnvironment,
  setSignInDataPretreatmentHandler,
  setTransferLayoutAvatarHandler,
} from 'antd-management-fast-framework';

import { prepareModel } from '../modelBuilders';

function transferLayoutAvatar({ currentOperator }) {
  const { avatar, loginName, name } = currentOperator;

  return {
    src: avatar || defaultUserAvatar,
    title: name || loginName,
  };
}

function pretreatSignInData({ request, response }) {
  logExecute({ request, response }, 'pretreatSignInData');

  // const { name } = request;

  // // 用于测试的代码
  // if (name === 'admin') {
  //   showSimpleInfoNotification('login with super role');
  // } else {
  //   response.data.currentAuthority = [];

  //   showSimpleInfoNotification('login with none role');
  // }

  return response;
}

export function initializeDvaApplication() {
  prepareModel();

  configEnvironment(() => {
    setSignInDataPretreatmentHandler(pretreatSignInData);

    setTransferLayoutAvatarHandler(transferLayoutAvatar);
  });
}
