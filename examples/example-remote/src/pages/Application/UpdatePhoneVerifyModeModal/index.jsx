import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormPhoneVerifyModeSelect } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { supplementApplicationId } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;
const visibleFlag = '3e3c5b52ed96476bb52898de72d6b451';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class UpdatePhoneVerifyModeModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '配置手机验证方式',
      loadApiPath: modelTypeCollection.applicationTypeCollection.getConfigure,
      submitApiPath:
        modelTypeCollection.applicationTypeCollection.updateKeyValueInfo,
      phoneVerifyMode: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    let d = supplementApplicationId(o, this.props);

    return d;
  };

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
      phoneVerifyMode: getValueByKey({
        data: metaData,
        key: fieldData.phoneVerifyMode.name,
        convert: convertCollection.string,
      }),
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { metaData, phoneVerifyMode } = this.state;

    d[fieldData.applicationId.name] = getValueByKey({
      data: metaData,
      key: fieldData.applicationId.name,
      defaultValue: '',
    });

    d.tag = getValueByKey({
      data: metaData,
      key: fieldData.phoneVerifyModeTag.name,
      defaultValue: '',
    });

    d.value = phoneVerifyMode;

    return d;
  };

  buildTitleSubTextPrefix = () => {
    return '当前应用';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
      defaultValue: '未设置应用名称',
    });
  };

  onChange = (v) => {
    this.setState({ phoneVerifyMode: toString(v) });
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
      values[fieldData.phoneVerifyMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.phoneVerifyMode.name,
        convert: convertCollection.string,
      });
    }

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
              component: renderFormPhoneVerifyModeSelect({
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
          text: '配置手机号码有效性的验证途径, 用于前端开发的相关逻辑控制。',
        },
      ],
    };
  };
}

export { UpdatePhoneVerifyModeModal };
