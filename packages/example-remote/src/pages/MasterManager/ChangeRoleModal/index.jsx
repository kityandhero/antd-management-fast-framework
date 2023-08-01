import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseUpdateRoleModal from '../../../customSpecialComponents/BaseUpdateRoleModal';

const visibleFlag = '353c1120acee4829aa8c78c497ed2d15';

@connect(({ presetRole, masterManager, schedulingControl }) => ({
  presetRole,
  masterManager,
  schedulingControl,
}))
class UpdateRoleModal extends BaseUpdateRoleModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'masterManager/get',
      submitApiPath: 'masterManager/changePermission',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;
    const { selectData } = {
      selectData: {},
      ...externalData,
    };

    const { masterManagerId } = {
      masterManagerId: '',
      ...selectData,
    };

    d.channel = 100;
    d.masterManagerId = masterManagerId;

    return d;
  };

  supplementSubmitRequestParams = (data) => {
    const d = data;

    const { targetKeys, externalData, customData } = this.state;
    const { selectData } = {
      selectData: {},
      ...externalData,
    };
    const { masterManagerId } = {
      masterManagerId: '',
      ...selectData,
    };

    d.masterManagerId = masterManagerId;

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
