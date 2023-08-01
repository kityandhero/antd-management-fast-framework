import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseUpdateRoleModal from '../../../customSpecialComponents/BaseUpdateRoleModal';

const visibleFlag = 'f4df1383ab594341b1034714ec52fb46';

@connect(({ presetRole, user, schedulingControl }) => ({
  presetRole,
  user,
  schedulingControl,
}))
class UpdateRoleModal extends BaseUpdateRoleModal {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'user/changePermission',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;
    const { selectData } = {
      selectData: {},
      ...externalData,
    };

    const { userId } = {
      userId: '',
      ...selectData,
    };

    d.channel = 200;
    d.userId = userId;

    return d;
  };

  supplementSubmitRequestParams = (data) => {
    const d = data;

    const { targetKeys, externalData, customData } = this.state;
    const { selectData } = {
      selectData: {},
      ...externalData,
    };
    const { userId } = {
      userId: '',
      ...selectData,
    };

    d.userId = userId;

    const presetList = [];

    for (const key of targetKeys) {
      for (const r of customData || []) {
        if (r.key === key) {
          presetList.push(key);
        }
      }
    }

    d.presetCollection = (presetList || []).join(',');

    return d;
  };
}

export { UpdateRoleModal };
