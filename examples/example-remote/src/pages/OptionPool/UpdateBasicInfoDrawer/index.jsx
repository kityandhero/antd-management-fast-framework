import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  buildUpdateTimeAndOperatorFieldItem,
  renderFormBusinessModeSelect,
  renderFormOptionPoolCategorySelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'a08a4e2b112141a99351d39e314e3354';

@connect(({ optionPool, schedulingControl }) => ({
  optionPool,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.optionPool.updateBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'optionPool/get',
      submitApiPath: 'optionPool/updateBasicInfo',
      imageUrl: '',
      appHeadImage: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.optionPoolId = getValueByKey({
      data: externalData,
      key: fieldData.optionPoolId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.optionPoolId = getValueByKey({
      data: externalData,
      key: fieldData.optionPoolId.name,
    });

    return d;
  };

  renderPresetTitle = () => {
    return '编辑选项信息';
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.category.name] = getValueByKey({
        data: metaData,
        key: fieldData.category.name,
        convert: convertCollection.string,
      });

      values[fieldData.businessMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.businessMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
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
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 2 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
