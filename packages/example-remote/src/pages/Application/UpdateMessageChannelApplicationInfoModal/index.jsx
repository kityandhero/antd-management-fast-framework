import { connect } from 'easy-soft-dva';
import { getValueByKey, isArray } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { supplementApplicationId } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = '201f09aef72641158b1b3a42c585547d';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class UpdateMessageChannelApplicationInfoModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '转发微信消息',
      loadApiPath: 'application/singleList',
      submitApiPath: 'application/updateMessageChannelApplicationInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    let d = supplementApplicationId(o, this.props);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    let d = supplementApplicationId(o, this.props);

    return d;
  };

  buildTitleSubTextPrefix = () => {
    return '应用';
  };

  buildTitleSubText = () => {
    const { externalData } = this.props;
    const { name } = { name: '', ...externalData };

    return name;
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
    const { externalData } = this.props;
    const { messageChannelApplicationId } = {
      messageChannelApplicationId: '0',
      ...externalData,
    };
    const values = {};

    values[fieldData.messageChannelApplicationId.name] = `${
      messageChannelApplicationId || '0'
    }`;

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaListData } = this.state;

    const list = (isArray(metaListData) ? metaListData : []).map((o) => {
      return {
        flag: getValueByKey({
          data: o,
          key: fieldData.applicationId.name,
        }),
        name: getValueByKey({
          data: o,
          key: fieldData.name.name,
        }),
      };
    });

    list.unshift({
      flag: '0',
      name: '不关联',
    });

    return {
      list: [
        {
          formItemLayout: {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.messageChannelApplicationId,
              listData: list,
              dataConvert: convertOptionOrRadioData,
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
          text: '转发消息是指将消息通过指定的转发应用发出, 用户在两个应用上的数据必须能查询关联到,否则将发送失败。',
        },
      ],
    };
  };
}

export { UpdateMessageChannelApplicationInfoModal };
