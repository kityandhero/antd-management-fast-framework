import React from 'react';
import { connect } from 'umi';
import {
  FormOutlined,
  PlusOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
} from '@ant-design/icons';

import { toNumber, getPathValue } from 'antd-management-fast-framework/lib/utils/tools';
import {
  unlimitedWithStringFlag,
  searchFormContentConfig,
  columnFacadeMode,
  columnPlaceholder,
} from 'antd-management-fast-framework/lib/utils/constants';
import { handleItem } from 'antd-management-fast-framework/lib/utils/actionAssist';
import MultiPage from 'antd-management-fast-framework/lib/framework/DataMultiPageView/MultiPage';
import { buildDropdown } from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { accessWayCollection, pageConfig } from '@/customConfig/config';
import { colorCollection } from '@/customConfig/constants';
import {
  getArticleRenderTypeName,
  renderSearchArticleRenderTypeSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';
import {
  getArticleStatusName,
  renderSearchArticleStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import { setOfflineConfirmAction, setOnlineConfirmAction } from '../Assist/action';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.article.pageList;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '文章列表',
        paramsKey: pageConfig.article.pageList.paramsKey,
        loadApiPath: 'article/pageList',
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

  getStatusBadge = (v) => {
    let result = 'default';

    switch (v) {
      case 10:
        result = 'success';
        break;

      case 0:
        result = 'warning';
        break;

      default:
        result = 'default';
        break;
    }

    return result;
  };

  handleMenuClick = ({ key, record }) => {
    switch (key) {
      case 'setOnline':
        this.setOnline(record);
        break;

      case 'setOffline':
        this.setOffline(record);
        break;

      default:
        break;
    }
  };

  handleItemStatus = ({ target, record, remoteData }) => {
    const articleId = getPathValue(record, fieldData.articleId.name);

    handleItem({
      target,
      dataId: articleId,
      compareDataIdHandler: (o) => {
        const { articleId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getPathValue(remoteData, fieldData.status.name);

        return d;
      },
    });
  };

  setOnline = (r) => {
    setOnlineConfirmAction({
      target: this,
      record: r,
      successCallback: ({ target, record, remoteData }) => {
        target.handleItemStatus({ target, record, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineConfirmAction({
      target: this,
      record: r,
      successCallback: ({ target, record, remoteData }) => {
        target.handleItemStatus({ target, record, remoteData });
      },
    });
  };

  goToAdd = () => {
    this.goToPath(`/news/article/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { articleId } = record;

    this.goToPath(`/news/article/edit/load/${articleId}/key/basicInfo`);
  };

  renderSimpleFormInitialValues = () => {
    const values = {};

    values[fieldData.renderType.name] = unlimitedWithStringFlag.key;
    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  searchFormContentConfigData = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.component,
          component: renderSearchArticleRenderTypeSelect({
            global: this.getGlobal(),
          }),
        },
        {
          lg: 12,
          type: searchFormContentConfig.contentItemType.component,
          component: this.renderSimpleFormRangePickerCore(dateRangeFieldName),
        },
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.component,
          component: renderSearchArticleStatusSelect({
            global: this.getGlobal(),
          }),
        },
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.component,
          component: this.renderSimpleFormButtonCore(),
        },
      ],
    };
  };

  buildExtraButtonList = () => {
    return [
      {
        type: 'primary',
        icon: <PlusOutlined />,
        text: '新增文章',
        onClick: this.goToAdd,
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo),
      },
    ];
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
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    columnPlaceholder,
    {
      dataTarget: fieldData.customOperate,
      width: 106,
      fixed: 'right',
      render: (text, r) => {
        const itemStatus = toNumber(getPathValue(r, fieldData.status.name));

        return buildDropdown({
          size: 'small',
          text: '编辑',
          icon: <FormOutlined />,
          handleButtonClick: ({ record }) => {
            this.goToEdit(record);
          },
          record: r,
          handleMenuClick: ({ key, record }) => {
            this.handleMenuClick({ key, record });
          },
          menuItems: [
            {
              key: 'setOnline',
              icon: <PlayCircleTwoTone twoToneColor={colorCollection.closeCircleColor} />,
              text: '设为上线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOnline),
              disabled: itemStatus === statusCollection.online,
            },
            {
              key: 'setOffline',
              icon: <PauseCircleTwoTone twoToneColor={colorCollection.closeCircleColor} />,
              text: '设为下线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOffline),
              disabled: itemStatus === statusCollection.offline,
            },
          ],
        });
      },
    },
  ];
}

export default PageList;
