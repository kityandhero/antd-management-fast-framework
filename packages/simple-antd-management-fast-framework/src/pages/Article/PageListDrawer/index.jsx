import React from 'react';
import { connect } from 'umi';
import { Row, Col, List, Avatar, Divider, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import {
  stringIsNullOrWhiteSpace,
  replaceTargetText,
  formatDatetime,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  unlimitedWithStringFlag,
  searchCardConfig,
  columnFacadeMode,
  columnPlaceholder,
  convertCollection,
  listViewConfig,
  cardConfig,
  whetherNumber,
  datetimeFormat,
  formatCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import MultiPageSelectDrawer from 'antd-management-fast-framework/es/framework/DataMultiPageView/MultiPageSelectDrawer';

import { getSexName } from '@/utils/tools';
import { accessWayCollection } from '@/customConfig/config';
import { colorCollection } from '@/customConfig/constants';
import { getArticleRenderTypeName } from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';
import { getArticleStatusName } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import { fieldData, statusCollection } from '../Common/data';

const { Text } = Typography;

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class PageListDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = true;

  componentAuthority = accessWayCollection.article.pageList.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/pageList',
        listViewMode: listViewConfig.viewMode.list,
        tableScroll: { y: 600 },
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  apiDataConvert = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  getPageName = () => {
    return '请选择文章';
  };

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case statusCollection.online:
        result = 'processing';
        break;

      case statusCollection.offline:
        result = 'warning';
        break;

      default:
        result = 'default';
        break;
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemInner = (item, index) => {
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
            stringIsNullOrWhiteSpace(image) ? (
              <Avatar icon={<UserOutlined />} />
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
              <Text>{fieldData.articleId.label}：</Text>
              <Text copyable>{articleId}</Text>
              <Divider type="vertical" />
              <Text>{fieldData.createTime.label}：</Text>
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
      formatValue: (val) => {
        return getArticleRenderTypeName({
          global: this.getGlobal(),
          value: val,
        });
      },
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (val) => {
        return {
          status: this.getStatusBadge(val),
          text: getArticleStatusName({
            global: this.getGlobal(),
            value: val,
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
        return this.renderSelectButton({
          handleData: record,
        });
      },
    },
  ];
}

export default PageListDrawer;
