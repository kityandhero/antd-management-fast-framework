import BaseUpdateFormContent from 'antd-management-fast-framework/es/framework/DataForm/BaseUpdateFormContent';
import { cardConfig } from 'antd-management-fast-framework/es/utils/constants';
import { showError } from 'antd-management-fast-framework/es/utils/tools';
import { connect } from 'umi';
import { fieldData } from '../../Common/data';

@connect(({ currentOperator, loading }) => ({
  currentOperator,
  loading: loading.models.currentOperator,
}))
class Password extends BaseUpdateFormContent {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

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

  apiDataConvert = (props) => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {};

  establishCardCollectionConfig = () => {
    const { processing, dataLoading } = this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          justify: 'center',
          title: {
            text: '更新密码',
          },
          spinning,
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
