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
    return '新增用户信息';
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.realName,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.phone,
              require: false,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此功能仅用于添加用户基本信息, 如需配置登录账户，请使用『添加用户登录账户』功能, 或者在添加完基本资料后再配置登陆账户。',
        },
      ],
    };
  };
}

export default AddBasicInfoDrawer;
