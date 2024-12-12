import { formatCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import { fieldDataFlowCase } from '../../../customConfig';

const { BaseUpdateDrawer } = DataDrawer;

class BaseFlowCaseUpdateBasicInfoDrawer extends BaseUpdateDrawer {
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: '',
      submitApiPath: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  renderPresetTitle = () => {
    return '更新流程实例基础信息';
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
      values[fieldDataFlowCase.title.name] = getValueByKey({
        data: metaData,
        key: fieldDataFlowCase.title.name,
      });

      values[fieldDataFlowCase.description.name] = getValueByKey({
        data: metaData,
        key: fieldDataFlowCase.description.name,
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
            text: '名称',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldDataFlowCase.title,
              require: true,
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
              fieldData: fieldDataFlowCase.description,
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
              type: cardConfig.contentItemType.onlyShowInputDatetime,
              fieldData: fieldDataFlowCase.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCase.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInputDatetime,
              fieldData: fieldDataFlowCase.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldDataFlowCase.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
          ],
        },
      ],
    };
  };
}

export { BaseFlowCaseUpdateBasicInfoDrawer };
