import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { configItemData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '4b5e279d63b24a909524142862b1f23a';

@connect(({ sectionApplicationConfig, schedulingControl }) => ({
  sectionApplicationConfig,
  schedulingControl,
}))
class AddConfigItemDrawer extends BaseAddDrawer {
  componentAuthority =
    accessWayCollection.sectionApplicationConfig.addConfigItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      submitApiPath: 'sectionApplicationConfig/addConfigItem',
      icon: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.sectionApplicationConfigId = getValueByKey({
      data: externalData,
      key: configItemData.sectionApplicationConfigId.name,
    });

    return d;
  };

  renderPresetTitle = () => {
    return '新增自定义配置项';
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    return initialValues;
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
              fieldData: configItemData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: configItemData.value,
              require: true,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '键名与键值都将以字符串形式存储。',
        },
      ],
    };
  };
}

export { AddConfigItemDrawer };
