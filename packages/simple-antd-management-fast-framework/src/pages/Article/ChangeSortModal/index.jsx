import { connect } from 'umi';

import { getValueByKey } from 'antd-management-fast-framework/lib/utils/tools';
import {
  formContentConfig,
  convertCollection,
} from 'antd-management-fast-framework/lib/utils/constants';
import BaseUpdateModal from 'antd-management-fast-framework/lib/framework/DataModal/BaseUpdateModal';

import { fieldData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class ChangeSortModal extends BaseUpdateModal {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '排序值设置',
        loadApiPath: 'article/get',
        submitApiPath: 'article/updateSort',
      },
    };
  }

  getGlobal = () => {
    const { global } = this.props;

    return global || null;
  };

  getApiData = (props) => {
    const {
      article: { data },
    } = props;
    return data;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { articleId } = externalData;

    d.articleId = articleId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    let articleId = '';

    if ((externalData || null) != null) {
      articleId = externalData.articleId || '';
    }

    d.articleId = articleId;

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData,
  ) => {
    return `排序值更新成功。`;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.title.name,
    });
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
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
        convert: convertCollection.number,
      });
    }

    return values;
  };

  formContentConfigData = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
            },
          ],
        },
      ],
    };
  };
}

export default ChangeSortModal;
