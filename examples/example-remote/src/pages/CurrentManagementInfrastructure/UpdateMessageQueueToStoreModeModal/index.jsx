import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormMessageQueueToStoreModeSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = '1b50ec8376fa439b8f611f58954e47e3';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class UpdateMessageQueueToStoreModeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '配置消息存储模式',
      loadApiPath: 'currentManagementInfrastructure/get',
      submitApiPath: 'currentManagementInfrastructure/updateKeyValueInfo',
      messageQueueToStoreMode: '',
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
    this.setState({
      messageQueueToStore: getValueByKey({
        data: metaData,
        key: fieldData.messageQueueToStoreMode.name,
        convert: convertCollection.string,
      }),
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaData, messageQueueToStoreMode } = this.state;

    d.tag = getValueByKey({
      data: metaData,
      key: fieldData.messageQueueToStoreModeTag.name,
      defaultValue: '',
    });

    d.value = messageQueueToStoreMode;

    return d;
  };

  buildTitleSubTextPrefix = () => {
    return '当前系统';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
      defaultValue: '未设置系统名称',
    });
  };

  onChange = (v) => {
    this.setState({ messageQueueToStoreMode: toString(v) });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '110px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
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

    values[fieldData.messageQueueToStoreMode.name] = getValueByKey({
      data: metaData,
      key: fieldData.messageQueueToStoreMode.name,
      convert: convertCollection.string,
    });

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormMessageQueueToStoreModeSelect({
                onChange: (event) => {
                  this.onChange(event);
                },
              }),
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { UpdateMessageQueueToStoreModeModal };
