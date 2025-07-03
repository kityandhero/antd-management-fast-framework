import { Checkbox } from 'antd';

import { connect } from 'easy-soft-dva';

import { cardConfig, drawerConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;
const visibleFlag = '0d26b8fcba6a48d2b944717c75704180';
@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
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
      submitApiPath: modelTypeCollection.smsCategoryTypeCollection.addBasicInfo,
    };
  }

  subjoinDataOnAfterOK = () => {
    return {
      message: '这是一个增补数据, 将附加到 afterOk 方法中进行调用',
    };
  };

  buildBottomBarInnerLeftItemConfigList = () => {
    return [
      {
        buildType: drawerConfig.bottomBarBuildType.component,
        component: (
          <Checkbox style={{ marginLeft: '4px' }}>保存后跳转详情页</Checkbox>
        ),
      },
    ];
  };

  getPresetPageTitle = () => {
    return '新增分类';
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
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.template,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.firstParamMaxLength,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.secondParamMaxLength,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.threeParamMaxLength,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.fourParamMaxLength,
              require: false,
            },
          ],
          instruction: [
            {
              title: '功能说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '参数最大长度最大值为100, 当设置为0时, 表示不限制长度.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default AddBasicInfoDrawer;
