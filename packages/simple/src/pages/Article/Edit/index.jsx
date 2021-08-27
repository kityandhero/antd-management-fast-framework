import React from 'react';
import { connect } from 'umi';
import { UpCircleOutlined, DownCircleOutlined, ReloadOutlined } from '@ant-design/icons';

import {
  stringIsNullOrWhiteSpace,
  toDatetime,
  getDerivedStateFromPropsForUrlParams,
  getPathValue,
  toNumber,
  showInfoMessage,
  recordObject,
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
      record: r,
      successCallback: ({ target }) => {
        target.reloadData();
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      record: r,
      successCallback: ({ target }) => {
        target.reloadData();
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

  pageHeaderActionExtraGroup = () => {
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
        size: 'small',
        text: '上架',
        icon: <UpCircleOutlined />,
        handleClick: (r) => {
          showInfoMessage({
            message: '上架',
          });

          showInfoMessage({
            message: JSON.stringify(r),
          });
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
        processing: dataLoading,
        iconProcessing: <LoadingOutlined />,
      },
      {
        key: 'setOffline',
        type: 'default',
        size: 'small',
        text: '下架',
        icon: <UpCircleOutlined />,
        handleClick: (r) => {
          showInfoMessage({
            message: '下架',
          });

          showInfoMessage({
            message: JSON.stringify(r),
          });
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
        processing: dataLoading,
        iconProcessing: <LoadingOutlined />,
      },
    ];

    return {
      buttons,
    };
  };

  pageHeaderActionExtraEllipsis = () => {
    const { metaData, dataLoading, processing } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    const menuItems = {
      dropdownProps: {
        disabled: dataLoading || processing || metaData == null,
      },
      menuProps: {
        onClick: (e) => {
          const { key } = e;

          switch (key) {
            case 'refreshCacheConfirm':
              refreshCacheConfirmAction({ target: that, record: metaData });
              break;

            default:
              break;
          }
        },
      },
      items: [
        {
          key: 'refreshCacheConfirm',
          children: <IconInfo icon={<ReloadOutlined />} text="刷新缓存" />,
        },
      ],
    };

    return {
      key: undefined,
      size: 'default',
      placement: 'top',
      title: '更多操作',
      disabled: false,
      hidden: false,
      handleMenuClick: (e) => {
        recordObject(e);
      },
      menuItems: [
        {
          key: 'refreshCacheConfirm',
          icon: <ReloadOutlined />,
          text: '按钮1',
          hidden: true,
        },
        {
          key: 'refreshCacheConfirm',
          icon: <ReloadOutlined />,
          text: '按钮2',
          hidden: false,
          disabled: true,
        },
        {
          key: 'refreshCacheConfirm',
          icon: <ReloadOutlined />,
          text: '刷新缓存',
          hidden: !this.checkAuthority(accessWayCollection.article.refreshCache.permission),
          disabled: itemStatus === statusCollection.offline,
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
