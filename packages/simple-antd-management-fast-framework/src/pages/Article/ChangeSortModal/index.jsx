import BaseUpdateModal from 'antd-management-fast-framework/es/framework/DataModal/BaseUpdateModal';
import { cardConfig, convertCollection } from 'antd-management-fast-framework/es/utils/constants';
import { getValueByKey } from 'antd-management-fast-framework/es/utils/tools';
import { connect } from 'umi';
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

  apiDataConvert = (props) => {
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

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '60px',
      },
      wrapperCol: {
        flex: 'auto',
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

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
            },
          ],
        },
      ],
    };
  };
}

export default ChangeSortModal;
