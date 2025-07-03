import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'e73ea97e53b04db7a86677651140240a';
@connect(({ subsidiaryComplaintCategory, schedulingControl }) => ({
  subsidiaryComplaintCategory,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑类别信息',
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintCategoryTypeCollection.get,
      submitApiPath:
        modelTypeCollection.subsidiaryComplaintCategoryTypeCollection
          .updateBasicInfo,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.subsidiaryComplaintCategoryId = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintCategoryId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.subsidiaryComplaintCategoryId = getValueByKey({
      data: externalData,
      key: fieldData.subsidiaryComplaintCategoryId.name,
    });

    return d;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.template.name] = getValueByKey({
        data: metaData,
        key: fieldData.template.name,
      });

      values[fieldData.firstParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.firstParamMaxLength.name,
      });

      values[fieldData.secondParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.secondParamMaxLength.name,
      });

      values[fieldData.threeParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.threeParamMaxLength.name,
      });

      values[fieldData.fourParamMaxLength.name] = getValueByKey({
        data: metaData,
        key: fieldData.fourParamMaxLength.name,
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

    const flag = getValueByKey({
      data: metaData,
      key: fieldData.flag.name,
      convert: convertCollection.number,
    });

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
              hidden: flag > 0,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.name,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
              }),
              hidden: flag === 0,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '具有系统特征值的分类为系统内置, 部分数据不允许编辑',
        },
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
