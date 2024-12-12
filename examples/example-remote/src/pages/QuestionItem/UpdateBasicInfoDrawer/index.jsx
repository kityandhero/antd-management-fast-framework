import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '99f3c3f512ab4e8ab9418eb3bc114a78';
const {
  Whether: { renderFormWhetherSelect },
} = FunctionSupplement;

@connect(({ questionItem, schedulingControl }) => ({
  questionItem,
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
      pageTitle: '编辑选项信息',
      loadApiPath: 'questionItem/get',
      submitApiPath: 'questionItem/updateBasicInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.questionItemId = getValueByKey({
      data: externalData,
      key: fieldData.questionItemId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.questionItemId = getValueByKey({
      data: externalData,
      key: fieldData.questionItemId.name,
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
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.whetherCorrect.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherCorrect.name,
        convert: convertCollection.string,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
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
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormWhetherSelect({
                name: fieldData.whetherCorrect.name,
                label: fieldData.whetherCorrect.label,
                helper: fieldData.whetherCorrect.helper,
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: true,
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
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 2 }),
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
