import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { listSelectAction } from '../../../commonAssist/action';
import BaseUpdateRoleModal from '../../../customSpecialComponents/BaseUpdateRoleModal';
import { fieldData } from '../Common/data';

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
      loadApiPath: 'user/get',
      submitApiPath: 'user/changePermission',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    listSelectAction({
      target: this,
      handleData: {
        channel: 200,
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

    const userId = getValueByKey({
      data: externalData,
      key: fieldData.userId.name,
    });

    d.userId = userId;

    return d;
  };

  supplementSubmitRequestParams = (data) => {
    const d = data;

    const { targetKeys, externalData, customData } = this.state;
    const userId = getValueByKey({
      data: externalData,
      key: fieldData.userId.name,
    });

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
