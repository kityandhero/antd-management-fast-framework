import { Avatar, Divider, List, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  columnPlaceholder,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/config';
import { colorCollection } from '../../../customConfig/constants';
import { getArticleRenderTypeName } from '../../../customSpecialComponents/FunctionSupplement/ArticleRenderType';
import { getArticleStatusName } from '../../../customSpecialComponents/FunctionSupplement/ArticleStatus';
import { fieldData, statusCollection } from '../Common/data';

const { Text } = Typography;
const { MultiPageSelectDrawer } = DataMultiPageView;

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class PageListDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.article.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      loadApiPath: 'article/pageList',
      listViewMode: listViewConfig.viewMode.list,
      tableScroll: { y: 600 },
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  getPresetPageName = () => {
    return '请选择文章';
  };

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case statusCollection.online: {
        result = 'processing';
        break;
      }

      case statusCollection.offline: {
        result = 'warning';
        break;
      }

      default: {
        result = 'default';
        break;
      }
    }

    return result;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const articleId = getValueByKey({
      data: item,
      key: fieldData.articleId.name,
    });

    const image = getValueByKey({
      data: item,
      key: fieldData.image.name,
    });

    const title = getValueByKey({
      data: item,
      key: fieldData.title.name,
    });

    const createTime = getValueByKey({
      data: item,
      key: fieldData.createTime.name,
      format: formatCollection.datetime,
    });

    return (
      <>
        <List.Item.Meta
          avatar={
            checkStringIsNullOrWhiteSpace(image) ? (
              <Avatar icon={iconBuilder.user()} />
            ) : (
              <Avatar src={image} />
            )
          }
          title={
            <>
              <Text>{title}</Text>
            </>
          }
          description={
            <>
              <Text>{fieldData.articleId.label}:</Text>
              <Text copyable>{articleId}</Text>
              <Divider type="vertical" />
              <Text>{fieldData.createTime.label}:</Text>
              <Text>{createTime}</Text>
            </>
          }
        />
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 780,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.renderType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfig: {
        color: colorCollection.price,
      },
      formatValue: (value) => {
        return getArticleRenderTypeName({
          metaData: this.getMetaData(),
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: this.getStatusBadge(value),
          text: getArticleStatusName({
            metaData: this.getMetaData(),
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.articleId,
      width: 140,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    columnPlaceholder,
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      render: (text, record) => {
        return this.renderPresetSelectButton({
          handleData: record,
        });
      },
    },
  ];
}

export default PageListDrawer;
