import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { listSelectAction } from '../../../commonAssist/action';
import BaseUpdateRoleModal from '../../../customSpecialComponents/BaseUpdateRoleModal';
import { fieldData } from '../Common/data';

const visibleFlag = '353c1120acee4829aa8c78c497ed2d15';

@connect(({ presetRole, masterManager, schedulingControl }) => ({
  presetRole,
  masterManager,
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
      loadApiPath: 'masterManager/get',
      submitApiPath: 'masterManager/changePermission',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    listSelectAction({
      target: this,
      handleData: {
        channel: 100,
      },
      successCallback: ({ target, remoteListData }) => {
        const customData = remoteListData;

        target.setState({ customData });
      },
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    const masterManagerId = getValueByKey({
      data: externalData,
      key: fieldData.masterManagerId.name,
    });

    d.masterManagerId = masterManagerId;

    return d;
  };

  supplementSubmitRequestParams = (data) => {
    const d = data;

    const { targetKeys, externalData, customData } = this.state;

    const masterManagerId = getValueByKey({
      data: externalData,
      key: fieldData.masterManagerId.name,
    });

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
