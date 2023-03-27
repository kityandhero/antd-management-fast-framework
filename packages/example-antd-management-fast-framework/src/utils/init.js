import {
  compareTimeLessThan,
  setSimulationAuthorizeExtraHandler,
  toNumber,
} from 'easy-soft-utility';

import {
  configEnvironment,
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
    setSimulationAuthorizeExtraHandler(handleSimulationAuthorizeExtra);

    setTransferLayoutAvatarHandler(transferLayoutAvatar);
  });
}
