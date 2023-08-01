import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { supplementApplicationId } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'f4d8db4cdc7e4bd1abf7530107391ae1';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class TestSendWechatTemplateMessageModal extends BaseUpdateModal {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试发送微信公众号模板消息',
      loadApiPath: 'application/get',
      submitApiPath: 'application/testSendWechatTemplateMessage',
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
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '80px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: {
                label: '目标用户',
                name: 'userId',
                helper: '请输入要发送给的目标用户的标识',
              },
              value: '',
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
          text: '如果应为为小程序类型,则通过查询绑定的公众号用户数据进行转发，如果对应的用户数据不存在，则将转发失败',
        },
      ],
    };
  };
}

export { TestSendWechatTemplateMessageModal };
