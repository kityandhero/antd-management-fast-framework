import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'd12f2e7cfa5541b4a49ad8a0adcad0ea';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'user/addBasicInfo',
    };
  }

  getPresetPageTitle = () => {
    return '新增用户';
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
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default AddBasicInfoDrawer;
