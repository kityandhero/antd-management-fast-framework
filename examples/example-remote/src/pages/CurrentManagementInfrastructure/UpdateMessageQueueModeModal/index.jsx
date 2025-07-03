import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormMessageQueueModeSelect } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;
const visibleFlag = '0775733fd71944d582bd5ce995a0f4f8';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class UpdateMessageQueueModeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '配置消息队列模式',
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
      submitApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection
          .updateKeyValueInfo,
      messageQueueMode: '',
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
      messageQueueMode: getValueByKey({
        data: metaData,
        key: fieldData.messageQueueMode.name,
        convert: convertCollection.string,
      }),
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaData, messageQueueMode } = this.state;

    d.tag = getValueByKey({
      data: metaData,
      key: fieldData.messageQueueModeTag.name,
      defaultValue: '',
    });

    d.value = messageQueueMode;

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
    this.setState({ messageQueueMode: toString(v) });
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

    values[fieldData.messageQueueMode.name] = getValueByKey({
      data: metaData,
      key: fieldData.messageQueueMode.name,
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
              component: renderFormMessageQueueModeSelect({
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '仅单体模式建议选择内存消息队列(有助于简化系统部署), 分布式应用请使用外部专用消息队列。',
        },
      ],
    };
  };
}

export { UpdateMessageQueueModeModal };
