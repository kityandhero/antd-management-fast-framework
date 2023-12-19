import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = '1bf9504fe2584fa0a2c2cb99e3f75374';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class UpdateMultiEndModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置是否允许多终点',
      loadApiPath: 'workflow/get',
      submitApiPath: 'workflow/setMultiEnd',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return d;
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
      values[fieldData.whetherAllowMultiEnd.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherAllowMultiEnd.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '140px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.whetherAllowMultiEnd,
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { UpdateMultiEndModal };
