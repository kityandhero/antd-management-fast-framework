import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildUpdateTimeAndOperatorFieldItem } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'de3e599adef944fb892b16cc766a150c';

@connect(({ businessSet, schedulingControl }) => ({
  businessSet,
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
      pageTitle: '编辑业务信息',
      loadApiPath: 'businessSet/get',
      submitApiPath: 'businessSet/updateBasicInfo',
    };
  }

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const sourceMode = getValueByKey({
      data: metaData,
      key: fieldData.sourceMode.name,
    });

    this.setState({
      submitApiPath:
        sourceMode === whetherNumber.no
          ? 'businessSet/updateSort'
          : 'businessSet/updateBasicInfo',
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.businessSetId = getValueByKey({
      data: externalData,
      key: fieldData.businessSetId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.businessSetId = getValueByKey({
      data: externalData,
      key: fieldData.businessSetId.name,
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

      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.value.name] = getValueByKey({
        data: metaData,
        key: fieldData.value.name,
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

    const sourceMode = getValueByKey({
      data: metaData,
      key: fieldData.sourceMode.name,
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
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              hidden: sourceMode === whetherNumber.no,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.title,
              hidden: sourceMode !== whetherNumber.no,
              value: getValueByKey({
                data: metaData,
                key: fieldData.title.name,
                convert: convertCollection.string,
              }),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              hidden: sourceMode === whetherNumber.no,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.name,
              hidden: sourceMode !== whetherNumber.no,
              value: getValueByKey({
                data: metaData,
                key: fieldData.name.name,
                convert: convertCollection.string,
              }),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.value,
              hidden: sourceMode === whetherNumber.no,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.value,
              hidden: sourceMode !== whetherNumber.no,
              value: getValueByKey({
                data: metaData,
                key: fieldData.value.name,
                convert: convertCollection.string,
              }),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介信息',
          },
          hidden: sourceMode === whetherNumber.no,
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
