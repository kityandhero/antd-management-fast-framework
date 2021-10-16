import React from 'react';
import { connect } from 'umi';
import {
  UpCircleOutlined,
  DownCircleOutlined,
  ReloadOutlined,
  LoadingOutlined,
  FormOutlined,
} from '@ant-design/icons';

import {
  stringIsNullOrWhiteSpace,
  toDatetime,
  getDerivedStateFromPropsForUrlParams,
  toNumber,
  showInfoMessage,
  recordObject,
  notifySuccess,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';
import { convertCollection } from 'antd-management-fast-framework/es/utils/constants';
import DataTabContainer from 'antd-management-fast-framework/es/framework/DataTabContainer';
import IconInfo from 'antd-management-fast-framework/es/customComponents/IconInfo';

import { accessWayCollection } from '@/customConfig/config';
import { getArticleStatusName } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';
import { getArticleRenderTypeName } from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';

import { setOfflineAction, setOnlineAction, refreshCacheAction } from '../Assist/action';
import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Edit extends DataTabContainer {
  componentAuthority = accessWayCollection.article.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.article.get.permission),
      tab: '基本信息',
    },
    {
      key: 'mediaInfo',
      show: this.checkAuthority(accessWayCollection.article.updateMediaData.permission),
      tab: '媒体信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '',
        loadApiPath: 'article/get',
        backPath: `/news/article/pageList/key`,
        articleId: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { articleId } = this.state;

    d.articleId = articleId;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    this.setState({
      pageName: getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      }),
    });
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData();
      },
    });
  };

  establishPageHeaderTitlePrefix = () => {
    return '文章';
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
    });

    if (!stringIsNullOrWhiteSpace(image || '')) {
      return { src: image };
    }

    return null;
  };

  establishPageHeaderActionExtraGroupConfig = () => {
    const { metaData, dataLoading, processing } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    const buttons = [
      {
        key: 'setOnline',
        type: 'default',
        size: 'default',
        text: '上架',
        icon: <UpCircleOutlined />,
        handleButtonClick: ({ handleData }) => {
          that.setOnline(handleData);
        },
        hidden: !this.checkAuthority(accessWayCollection.article.setOnline.permission),
        disabled: dataLoading || processing || status === statusCollection.online,
        confirm: {
          title: '设置为上架，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
        },
        handleData: metaData,
        // processing: dataLoading,
        // iconProcessing: <LoadingOutlined />,
      },
      {
        key: 'setOffline',
        type: 'default',
        size: 'default',
        text: '下架',
        icon: <UpCircleOutlined />,
        handleButtonClick: ({ handleData }) => {
          that.setOffline(handleData);
        },
        hidden: !this.checkAuthority(accessWayCollection.article.setOffline.permission),
        disabled: dataLoading || processing || status === statusCollection.offline,
        confirm: {
          title: '设置为下架，确定吗？',
          placement: 'bottomRight',
          okText: '确定',
          cancelText: '取消',
        },
        handleData: metaData,
        // processing: dataLoading,
        // iconProcessing: <LoadingOutlined />,
      },
    ];

    return {
      buttons,
    };
  };

  establishPageHeaderActionExtraEllipsisConfig = () => {
    const { metaData, dataLoading, processing } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      size: 'default',
      placement: 'top',
      title: '更多操作',
      disabled: false,
      hidden: false,
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'click1':
            showInfoMessage({
              message: `click ${key}`,
            });

            notifySuccess(JSON.stringify(handleData));
            break;

          case 'click2':
            showInfoMessage({
              message: `click ${key}`,
            });

            notifySuccess(JSON.stringify(handleData));
            break;

          case 'click21':
            showInfoMessage({
              message: `click ${key}`,
            });

            notifySuccess(JSON.stringify(handleData));
            break;

          case 'click3':
            showInfoMessage({
              message: `click ${key}`,
            });

            notifySuccess(JSON.stringify(handleData));
            break;

          case 'refreshCache':
            that.refreshCache(handleData);
            break;

          default:
            break;
        }
      },
      handleData: metaData,
      menuItems: [
        {
          key: 'click1',
          icon: <FormOutlined />,
          text: '按钮1',
          hidden: true,
        },
        {
          key: 'click2',
          icon: <FormOutlined />,
          text: '按钮2',
          hidden: false,
          disabled: true,
        },
        {
          key: 'click21',
          icon: <FormOutlined />,
          text: '按钮21',
          hidden: false,
        },
        {
          key: 'click3',
          icon: <FormOutlined />,
          text: '按钮2',
          hidden: false,
          disabled: false,
          confirm: {
            title: '确认操作，确定吗？',
            placement: 'bottomRight',
            okText: '确定',
            cancelText: '取消',
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
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getArticleStatusName({
        global: this.getGlobal(),
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
          convert: convertCollection.number,
        }),
      }),
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    const list = [];

    list.push({
      label: fieldData.articleId.label,
      value: getValueByKey({
        data: metaData,
        key: fieldData.articleId.name,
      }),
      canCopy: true,
    });

    list.push({
      label: fieldData.renderTypeNote.label,
      value: getArticleRenderTypeName({
        global: this.getGlobal(),
        value: getValueByKey({
          data: metaData,
          key: fieldData.renderType.name,
        }),
      }),
      canCopy: false,
    });

    return list;
  };
}

export default Edit;
