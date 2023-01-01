import { connect } from 'umi';

import {
  convertCollection,
  extraBuildType,
  iconCollection,
  tabBarCollection,
} from 'antd-management-fast-common/es/utils/constants';
import {
  getDerivedStateFromPropsForUrlParams,
  getValueByKey,
  notifySuccess,
  showInfoMessage,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-common/es/utils/tools';

import { accessWayCollection } from '@/customConfig/config';
import DataTabContainerSupplement from '@/customSpecialComponents/DataTabContainerSupplement';
import { getArticleRenderTypeName } from '@/customSpecialComponents/FunctionSupplement/ArticleRenderType';
import { getArticleStatusName } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParamsForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Edit extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.article.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      show: this.checkAuthority(accessWayCollection.article.get.permission),
      tab: '基本信息',
    },
    {
      key: 'contentInfo',
      show: this.checkAuthority(accessWayCollection.article.get.permission),
      tab: '图文H5信息',
    },
    {
      key: 'mediaInfo',
      show: this.checkAuthority(
        accessWayCollection.article.updateMediaData.permission,
      ),
      tab: '媒体信息',
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
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

  apiDataConvert = (props) => {
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
  doOtherAfterLoadSuccess = ({
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
  }) => {
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

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    const list = [];

    if ((metaData || null) == null) {
      return list;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const statusNote = getArticleStatusName({
      global: this.getGlobal(),
      value: status,
    });

    return [
      {
        color: 'red',
        text: statusNote,
        hidden: status !== statusCollection.offline,
      },
      {
        color: 'green',
        text: statusNote,
        hidden: status !== statusCollection.online,
      },
    ];
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.iconInfo,
          icon: iconCollection.infoCircle,
          text: '一些说明',
        },
        {
          buildType: extraBuildType.button,
          icon: iconCollection.form,
          text: '按钮',
          handleClick: () => {},
        },
      ],
    };
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setOnline',
          type: 'default',
          size: 'default',
          text: '上架',
          icon: iconCollection.upCircle,
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !this.checkAuthority(
            accessWayCollection.article.setOnline.permission,
          ),
          disabled:
            this.checkInProgress() || status === statusCollection.online,
          confirm: {
            title: '设置为上架，确定吗？',
            placement: 'bottomRight',
            okText: '确定',
            cancelText: '取消',
          },
          handleData: metaData,
          // processing: dataLoading,
          // iconProcessing: iconCollection.loading,
        },
        {
          key: 'setOffline',
          type: 'default',
          size: 'default',
          text: '下架',
          icon: iconCollection.upCircle,
          handleButtonClick: ({ handleData }) => {
            that.setOffline(handleData);
          },
          hidden: !this.checkAuthority(
            accessWayCollection.article.setOffline.permission,
          ),
          disabled:
            this.checkInProgress() || status === statusCollection.offline,
          confirm: {
            title: '设置为下架，确定吗？',
            placement: 'bottomRight',
            okText: '确定',
            cancelText: '取消',
          },
          handleData: metaData,
          // processing: dataLoading,
          // iconProcessing: iconCollection.loading,
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    // const status = getValueByKey({
    //   data: metaData,
    //   key: fieldData.status.name,
    //   convert: convertCollection.number,
    // });

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
      items: [
        {
          key: 'click1',
          icon: iconCollection.form,
          text: '按钮1',
          hidden: true,
        },
        {
          key: 'click2',
          icon: iconCollection.form,
          text: '按钮2',
          hidden: false,
          disabled: true,
        },
        {
          key: 'click21',
          icon: iconCollection.form,
          text: '按钮21',
          hidden: false,
        },
        {
          key: 'click3',
          icon: iconCollection.form,
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
          icon: iconCollection.reload,
          text: '刷新缓存',
          hidden: !this.checkAuthority(
            accessWayCollection.article.refreshCache.permission,
          ),
          confirm: {
            title: '将要刷新缓存，确定吗？',
          },
        },
      ],
    };
  };

  establishTabBarExtraContentRightConfig = () => {
    const { metaData } = this.state;

    return {
      buildType: tabBarCollection.extraBuildType.dropdown,
      icon: iconCollection.form,
      size: 'small',
      text: '扩展菜单',
      handleData: metaData,
      hidden: false,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleButtonClick: ({ handleData }) => {
        showInfoMessage({
          message: '已点击',
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'extraBarAction1':
            showInfoMessage({
              message: `click ${key}`,
            });

            break;

          case 'extraBarAction2':
            showInfoMessage({
              message: `click ${key}`,
            });

            break;

          case 'extraBarAction3':
            showInfoMessage({
              message: `click ${key}`,
            });

            break;
        }
      },
      items: [
        {
          key: 'extraBarAction1',
          icon: iconCollection.form,
          text: '按钮1',
          hidden: false,
          confirm: {
            title: `即将点击按钮，确定吗？`,
          },
        },
        {
          key: 'extraBarAction2',
          icon: iconCollection.form,
          text: '按钮2',
          hidden: false,
        },
        {
          key: 'extraBarAction3',
          icon: iconCollection.form,
          text: '按钮3',
          hidden: true,
          confirm: {
            title: `即将点击按钮3，确定吗？`,
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

    return [
      {
        label: fieldData.articleId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.articleId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.renderTypeNote.label,
        value: getArticleRenderTypeName({
          global: this.getGlobal(),
          value: getValueByKey({
            data: metaData,
            key: fieldData.renderType.name,
          }),
        }),
      },
    ];
  };
}

export default Edit;
