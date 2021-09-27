import React from 'react';
import { connect } from 'umi';
import {
  FormOutlined,
  PlusOutlined,
  PlayCircleTwoTone,
  PauseCircleTwoTone,
  ConsoleSqlOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import {
  toNumber,
  showInfoMessage,
  getValueByKey,
} from 'antd-management-fast-framework/lib/utils/tools';
import {
  unlimitedWithStringFlag,
  searchFormContentConfig,
  columnFacadeMode,
  columnPlaceholder,
  convertCollection,
} from 'antd-management-fast-framework/lib/utils/constants';
import { handleItem } from 'antd-management-fast-framework/lib/utils/actionAssist';
import MultiPage from 'antd-management-fast-framework/lib/framework/DataMultiPageView/MultiPage';
import { buildDropdownButton } from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';
import { colorCollection, priceColor } from '@/customConfig/constants';
import {
  getArticleRenderTypeName,
  renderSearchArticleRenderTypeSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';
import {
  getArticleStatusName,
  renderSearchArticleStatusSelect,
} from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import { setOfflineAction, setOnlineAction, refreshCacheAction } from '../Assist/action';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.article.pageList.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showSelect: true,
        pageName: '文章列表',
        paramsKey: accessWayCollection.article.pageList.paramsKey,
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
      case 1:
        result = 'processing';
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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setOnline':
        this.setOnline(handleData);
        break;

      case 'setOffline':
        this.setOffline(handleData);
        break;

      case 'refreshCache':
        this.refreshCache(handleData);
        break;

      default:
        break;
    }
  };

  handleItemStatus = ({ target, record, remoteData }) => {
    const articleId = getValueByKey({
      data: remoteData,
      key: fieldData.articleId.name,
    });

    handleItem({
      target,
      dataId: articleId,
      compareDataIdHandler: (o) => {
        const { articleId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  goToAdd = () => {
    this.goToPath(`/news/article/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { articleId } = record;

    this.goToPath(`/news/article/edit/load/${articleId}/key/basicInfo`);
  };

  buildToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: this.renderGeneralButton({
            text: '按钮1',
            onClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            onClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            onClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮4',
            onClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            confirm: {
              placement: 'topRight',
              title: '将要进行操作，确定吗？',
              okText: '确定',
              cancelText: '取消',
            },
          }),
        },
      ],
    };
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
        hidden: !this.checkAuthority(accessWayCollection.article.addBasicInfo.permission),
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
      facadeConfig: {
        color: priceColor,
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
        const itemStatus = getValueByKey({
          data: r,
          key: fieldData.status.name,
          convert: convertCollection.number,
        });

        return buildDropdownButton({
          size: 'small',
          text: '编辑',
          icon: <FormOutlined />,
          handleButtonClick: ({ handleData }) => {
            this.goToEdit(handleData);
          },
          handleData: r,
          handleMenuClick: ({ key, handleData }) => {
            this.handleMenuClick({ key, handleData });
          },
          menuItems: [
            {
              key: 'setOnline',
              icon: <PlayCircleTwoTone twoToneColor={colorCollection.closeCircleColor} />,
              text: '设为上线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOnline.permission),
              disabled: itemStatus === statusCollection.online,
              confirm: {
                title: '将要设置为上线，确定吗？',
              },
            },
            {
              key: 'setOffline',
              icon: <PauseCircleTwoTone twoToneColor={colorCollection.closeCircleColor} />,
              text: '设为下线',
              hidden: !this.checkAuthority(accessWayCollection.article.setOffline.permission),
              disabled: itemStatus === statusCollection.offline,
              confirm: {
                title: '将要设置为下线，确定吗？',
              },
            },
            {
              key: 'refreshCache',
              withDivider: true,
              uponDivider: true,
              icon: <ReloadOutlined />,
              text: '刷新缓存',
              hidden: !this.checkAuthority(accessWayCollection.article.refreshCache.permission),
              confirm: {
                title: '将要刷新缓存，确定吗？',
              },
            },
          ],
        });
      },
    },
  ];

  buildHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
      ],
    };
  };
}

export default PageList;
