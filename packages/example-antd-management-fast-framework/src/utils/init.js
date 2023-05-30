import {
  compareTimeLessThan,
  logExecute,
  setSimulationAuthorizeExtraHandler,
  showSimpleInfoNotification,
  toNumber,
} from 'easy-soft-utility';

import {
  configEnvironment,
  setSignInDataPretreatmentHandler,
  setTransferLayoutAvatarHandler,
} from 'antd-management-fast-framework';

import { prepareModel } from '../modelBuilders';

import { getTokenDeadline } from './tokenDeadline';

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

function handleSimulationAuthorizeExtra() {
  const tokenDeadline = toNumber(getTokenDeadline());

  if (tokenDeadline <= 0) {
    return false;
  }

  const result = compareTimeLessThan(new Date(), tokenDeadline);

  return result;
}

export function initializeDvaApplication() {
  prepareModel();

  configEnvironment(() => {
    setSignInDataPretreatmentHandler(pretreatSignInData);

    setSimulationAuthorizeExtraHandler(handleSimulationAuthorizeExtra);

    setTransferLayoutAvatarHandler(transferLayoutAvatar);
  });
}
