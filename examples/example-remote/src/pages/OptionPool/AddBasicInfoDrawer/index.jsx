import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  buildNowTimeFieldItem,
  renderFormBusinessModeSelect,
  renderFormOptionPoolCategorySelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '4e832fba4c164a11a47cfb2aa9d2785b';

@connect(({ optionPool, schedulingControl }) => ({
  optionPool,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  componentAuthority = accessWayCollection.optionPool.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'optionPool/get',
      submitApiPath: 'optionPool/addBasicInfo',
    };
  }

  renderPresetTitle = () => {
    return '新增选项';
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
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormBusinessModeSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormOptionPoolCategorySelect({}),
            },
          ],
          instruction: [
            {
              title: '业务选项说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '社区团购选项仅适用于社区团购业务',
                },
                {
                  text: '一件代发选项仅适用于通过快递等发货渠道的商城',
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

export { AddBasicInfoDrawer };
