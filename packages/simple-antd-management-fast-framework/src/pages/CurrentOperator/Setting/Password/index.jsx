import { connect } from 'umi';

import { formContentConfig } from 'antd-management-fast-framework/es/utils/constants';
import BaseUpdateFormContent from 'antd-management-fast-framework/es/framework/DataForm/BaseUpdateFormContent';

import { fieldData } from '../../Common/data';

@connect(({ currentOperator, loading }) => ({
  currentOperator,
  loading: loading.models.currentOperator,
}))
class Password extends BaseUpdateFormContent {
  loadDataAfterMount = false;

  needSetFormValueAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        submitApiPath: 'currentOperator/changeCurrentPassword',
      },
    };
  }

  getApiData = (props) => {
    const {
      currentOperator: { data },
    } = props;

    return data;
  };

  checkSubmitRequestParams = (o) => {
    if (o.newWord.length < 6) {
      const text = '新密码长度太短，请输入6~32位的新密码！';

      showError(text);

      return false;
    }

    if (o.reNewWord !== o.newWord) {
      const text = '两次密码输入不一致！';

      showError(text);

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

  buildOtherFormProps = () => {
    return {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 21,
      },
    };
  };

  fillFormInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {};

  formContentConfigData = () => {
    const { metaData, processing, dataLoading, avatar } = this.state;

    return {
      list: [
        {
          title: {
            text: '更新密码',
          },
          extra: {
            list: [
              {
                buildType: formContentConfig.cardExtraBuildType.save,
              },
            ],
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.password,
              fieldData: fieldData.originalWord,
              require: true,
            },
            {
              lg: 24,
              type: formContentConfig.contentItemType.password,
              fieldData: fieldData.newWord,
              require: true,
            },
            {
              lg: 24,
              type: formContentConfig.contentItemType.password,
              fieldData: fieldData.reNewWord,
              require: true,
            },
            {
              lg: 24,
              type: formContentConfig.contentItemType.innerComponent,
              fieldData: { label: '' },
              component: this.renderSaveButton({}),
            },
          ],
        },
      ],
    };
  };
}

export default Password;
