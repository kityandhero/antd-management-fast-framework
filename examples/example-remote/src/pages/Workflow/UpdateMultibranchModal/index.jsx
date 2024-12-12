import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'e05cdc39baf6415ea18bb83f75d06cd2';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class UpdateMultibranchModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '启用多分支模式',
      loadApiPath: 'workflow/get',
      submitApiPath: 'workflow/openMultibranch',
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
      values[fieldData.whetherAllowMultibranch.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherAllowMultibranch.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '120px',
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
      list: [],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '开启多分支模式后不可关闭。',
        },
      ],
    };
  };
}

export { UpdateMultibranchModal };
