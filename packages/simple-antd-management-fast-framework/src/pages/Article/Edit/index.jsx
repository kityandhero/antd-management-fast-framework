import React from 'react';
import { connect } from 'umi';
import {
  UpCircleOutlined,
  DownCircleOutlined,
  ReloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import {
  stringIsNullOrWhiteSpace,
  toDatetime,
  getDerivedStateFromPropsForUrlParams,
  getPathValue,
  toNumber,
  showInfoMessage,
  recordObject,
  notifySuccess,
} from 'antd-management-fast-framework/lib/utils/tools';
import { accessWayCollection } from '@/customConfig/config';

import DataTabContainer from 'antd-management-fast-framework/lib/framework/DataTabContainer';
import IconInfo from 'antd-management-fast-framework/lib/customComponents/IconInfo';

import { setOfflineAction, setOnlineAction, refreshCacheConfirmAction } from '../Assist/action';
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
      pageName: getPathValue(metaData, fieldData.title.name),
    });
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getPathValue(remoteData, fieldData.status.name);

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

        metaData[fieldData.status.name] = getPathValue(remoteData, fieldData.status.name);

        target.setState({ metaData });
      },
    });
  };

  pageHeaderTitlePrefix = () => {
    return '文章';
  };

  pageHeaderAvatar = () => {
    const { metaData } = this.state;

    const image = getPathValue(metaData, fieldData.image.name);

    if (!stringIsNullOrWhiteSpace(image || '')) {
      return { src: image };
    }

    return null;
  };

  buildPageHeaderActionExtraGroup = () => {
    const { metaData, dataLoading, processing } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = toNumber(getPathValue(metaData, fieldData.status.name));

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

  buildPageHeaderActionExtraEllipsis = () => {
    const { metaData, dataLoading, processing } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const status = toNumber(getPathValue(metaData, fieldData.status.name));

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

          case 'click3':
            showInfoMessage({
              message: `click ${key}`,
            });

            notifySuccess(JSON.stringify(handleData));
            break;

          case 'click4':
            showInfoMessage({
              message: `click ${key}`,
            });

            notifySuccess(JSON.stringify(handleData));
            break;

          default:
            break;
        }
      },
      handleData: metaData,
      menuItems: [
        {
          key: 'click1',
          icon: <ReloadOutlined />,
          text: '按钮1',
          hidden: true,
        },
        {
          key: 'click2',
          icon: <ReloadOutlined />,
          text: '按钮2',
          hidden: false,
          disabled: true,
        },
        {
          key: 'click21',
          icon: <ReloadOutlined />,
          text: '按钮21',
          hidden: false,
        },
        {
          key: 'click3',
          icon: <ReloadOutlined />,
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
          key: 'click4',
          withDivider: true,
          uponDivider: true,
          icon: <ReloadOutlined />,
          text: '刷新缓存',
          hidden: !this.checkAuthority(accessWayCollection.article.refreshCache.permission),
        },
      ],
    };
  };

  pageHeaderExtraContentData = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getPathValue(metaData, fieldData.statusNote.name),
      timeLabel: fieldData.createTime.label,
      time:
        metaData === null ? null : toDatetime(getPathValue(metaData, fieldData.createTime.name)),
    };
  };

  pageHeaderContentGridData = () => {
    const { metaData } = this.state;

    const list = [];

    list.push({
      label: fieldData.articleId.label,
      value: getPathValue(metaData, fieldData.articleId.name),
      canCopy: true,
    });

    list.push({
      label: fieldData.renderTypeNote.label,
      value: getPathValue(metaData, fieldData.renderTypeNote.name),
      canCopy: false,
    });

    return list;
  };
}

export default Edit;
