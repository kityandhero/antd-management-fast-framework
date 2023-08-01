import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { supplementApplicationId } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'da9e038b0e1a4a7eb45ec2e27eaccae7';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class TestSendWechatUniformMessageModal extends BaseUpdateModal {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试发送微信统一服务消息',
      loadApiPath: 'application/get',
      submitApiPath: 'application/testSendWechatUniformMessage',
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
          text: '统一服务消息仅能通过小程序类应用发送。',
        },
      ],
    };
  };
}

export { TestSendWechatUniformMessageModal };
