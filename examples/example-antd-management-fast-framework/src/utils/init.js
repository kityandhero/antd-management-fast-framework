import {
  compareTimeLessThan,
  logExecute,
  setSimulationAuthorizeExtraHandler,
  showSimpleInfoMessage,
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

  if (name === 'admin') {
    setTimeout(() => {
      showSimpleInfoMessage('login with super role');
    }, 2500);
  } else {
    response.data.currentAuthority = [];

    setTimeout(() => {
      showSimpleInfoMessage('login with none role');
    }, 2500);
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
