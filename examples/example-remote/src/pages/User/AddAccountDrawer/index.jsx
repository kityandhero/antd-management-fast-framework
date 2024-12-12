import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;
const visibleFlag = '2e9a47872684498f82f9b69990d93283';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class AddAccountDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'user/addBasicInfoWithLoginInfo',
    };
  }

  getPresetPageTitle = () => {
    return '新增登录账户';
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '账户名',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.loginName,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.realName,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.phone,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '登录密码',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.password,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.passwordVerify,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default AddAccountDrawer;
