import { logExecute, showSimpleInfoNotification } from 'easy-soft-utility';

import {
  configEnvironment,
  setSignInDataPretreatmentHandler,
  setTransferLayoutAvatarHandler,
} from 'antd-management-fast-framework';

import { prepareModel } from '../modelBuilders';

function transferLayoutAvatar({ currentOperator }) {
  const { avatar, name } = currentOperator;

  return {
    src: avatar,
    title: name,
  };
}

function pretreatSignInData({ request, response }) {
  logExecute('pretreatSignInData');

  const { name } = request;

  console.log({ name });

  if (name === 'admin') {
    showSimpleInfoNotification('login with super role');
  } else {
    response.data.currentAuthority = [];

    showSimpleInfoNotification('login with none role');
  }

  return response;
}

export function initializeDvaApplication() {
  prepareModel();

  configEnvironment(() => {
    setSignInDataPretreatmentHandler(pretreatSignInData);

    setTransferLayoutAvatarHandler(transferLayoutAvatar);
  });
}
