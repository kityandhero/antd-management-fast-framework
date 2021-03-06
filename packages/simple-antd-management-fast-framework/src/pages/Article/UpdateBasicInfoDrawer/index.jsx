import { connect } from 'umi';

import BaseUpdateDrawer from 'antd-management-fast-framework/es/framework/DataDrawer/BaseUpdateDrawer';
import {
  cardConfig,
  formatCollection,
  iconCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import { getValueByKey } from 'antd-management-fast-framework/es/utils/tools';

import { accessWayCollection } from '@/customConfig/accessWayCollection';

import { fieldData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseUpdateDrawer {
  componentAuthority = accessWayCollection.article.updateBasicInfo.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/get',
        submitApiPath: 'article/updateBasicInfo',
        imageUrl: '',
        appHeadImage: '',
      },
    };
  }

  apiDataConvert = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.articleId = getValueByKey({
      data: externalData,
      key: fieldData.articleId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.articleId = getValueByKey({
      data: externalData,
      key: fieldData.articleId.name,
    });

    return d;
  };

  renderTitle = () => {
    return '??????????????????';
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          title: {
            icon: iconCollection.contacts,
            text: '????????????',
          },
          hasExtra: true,
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
          ],
          instruction: {
            title: '??????????????????',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '????????????????????????1',
              },
              {
                text: '????????????????????????2',
              },
            ],
          },
        },
        {
          title: {
            icon: iconCollection.contacts,
            text: '????????????',
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
          instruction: [
            {
              title: '??????????????????1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '????????????????????????1',
                },
                {
                  text: '????????????????????????2',
                },
              ],
            },
            {
              title: '??????????????????2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '????????????????????????1',
                },
                {
                  text: '????????????????????????2',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconCollection.contacts,
            text: '????????????',
          },
          spinning,
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '????????????',
      list: [
        {
          text: '?????????????????????????????????????????????????????????',
        },
        {
          text: '?????????????????????????????????????????????????????????',
        },
      ],
    };
  };
}

export default Index;
