import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { UpdateModuleModalBase } from '../../../customSpecialComponents';

const visibleFlag = '5f433a998d7c4c72a790d3299331ba2f';

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class UpdateModuleModal extends UpdateModuleModalBase {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '更新权限设置',
      submitApiPath: 'presetRole/updateModule',
    };
  }
}

export { UpdateModuleModal };
