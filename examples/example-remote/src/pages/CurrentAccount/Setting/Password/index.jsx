import { connect } from 'easy-soft-dva';
import { showSimpleErrorMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataForm } from 'antd-management-fast-framework';

import { fieldData } from '../../Common/data';

const { BaseUpdateFormMenu } = DataForm;

@connect(({ currentAccount, schedulingControl }) => ({
  currentAccount,
  schedulingControl,
}))
class Password extends BaseUpdateFormMenu {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      submitApiPath: 'currentAccount/changePassword',
    };
  }

  checkSubmitRequestParams = (o) => {
    if (o.newWord.length < 6) {
      const text = '新密码长度太短,请输入6~32位的新密码!';

      showSimpleErrorMessage(text);

      return false;
    }

    if (o.reNewWord !== o.newWord) {
      const text = '两次密码输入不一致!';

      showSimpleErrorMessage(text);

      return false;
    }

    return true;
  };

  afterCheckSubmitRequestParams = (o) => {
    const d = o;

    delete d.reNewWord;

    return d;
  };

  buildFormLayout = () => {
    return 'horizontal';
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 12,
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
  }) => {};

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          justify: 'center',
          title: {
            text: '更新密码',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 16,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.originalWord,
              require: true,
            },
            {
              lg: 16,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.newWord,
              require: true,
            },
            {
              lg: 16,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.reNewWord,
              require: true,
            },
            {
              lg: 16,
              type: cardConfig.contentItemType.save,
            },
          ],
        },
      ],
    };
  };
}

export default Password;
