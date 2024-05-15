import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormSmsCategoryFlagSelect } from '../../../customSpecialComponents';
import { supplementApplicationId } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = 'b14ff2d31dc541ef8655d9c045121c8b';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class TestSendSmsCaptchaModal extends BaseUpdateModal {
  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试发送短信验证码',
      loadApiPath: 'application/get',
      submitApiPath: 'application/testSendSmsCaptcha',
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
              type: cardConfig.contentItemType.component,
              component: renderFormSmsCategoryFlagSelect({
                helper: '请选择验证码类别',
              }),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: {
                label: '手机号码',
                name: 'phone',
                helper: '请输入要发送给的手机号码',
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

export { TestSendSmsCaptchaModal };
