import {
  configEnvironment,
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

export function initializeDvaApplication() {
  prepareModel();

  configEnvironment(() => {
    setTransferLayoutAvatarHandler(transferLayoutAvatar);
  });
}
