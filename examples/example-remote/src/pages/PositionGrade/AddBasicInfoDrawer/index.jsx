import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '5dac411b272649ff902f775c90e12e09';

@connect(({ positionGrade, schedulingControl }) => ({
  positionGrade,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority =
    accessWayCollection.positionGrade.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增信息',
      submitApiPath: 'positionGrade/addBasicInfo',
    };
  }

  fillDefaultInitialValues = () => {
    const values = {};

    values[fieldData.sort.name] = 0;

    return values;
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
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
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

export { AddBasicInfoDrawer };
