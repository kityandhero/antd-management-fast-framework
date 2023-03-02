import { connect } from '@umijs/max';

import {
  convertCollection,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import { columnFacadeMode, listViewConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  getCurrentOperator,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../customConfig/accessWayCollection';
import { getArticleStatusName } from '../../customSpecialComponents/FunctionSupplement/ArticleStatus';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Article/Assist/action';
import { getStatusBadge } from '../Article/Assist/tools';
import { fieldData, statusCollection } from '../Article/Common/data';

import { PageHeaderContent } from './PageHeaderContent';
import ShortcutPanel from './ShortcutPanel';

const { MultiPage } = DataMultiPageView;

@connect(({ article, user, currentOperator, global }) => ({
  article,
  user,
  currentOperator,
  global,
}))
class Index extends MultiPage {
  componentAuthority = accessWayCollection.article.pageList.permission;

  resetDataAfterLoad = false;

  showSearchForm = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageName: '工作台',
      listTitle: '新近文章列表',
      loadApiPath: 'article/pageList',
      tableScroll: { x: 1020 },
      pageSize: 8,
      currentOperator: null,
    };
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    getCurrentOperator({
      successCallback: (data) => {
        that.setState({ currentOperator: data });
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
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

  establishPageContentLayoutSiderConfig = () => {
    return {
      position: 'right',
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增文章',
        handleClick: this.goToAdd,
        hidden: !this.checkAuthority(
          accessWayCollection.article.addBasicInfo.permission,
        ),
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const itemStatus = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      confirm: true,
      title: '将要进行编辑，确定吗？',
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showUpdateBasicInfoDrawer',
          icon: iconBuilder.edit(),
          text: '编辑[侧拉]',
          hidden: !this.checkAuthority(
            accessWayCollection.article.updateBasicInfo.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          hidden: !this.checkAuthority(
            accessWayCollection.article.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: true,
          title: '将要设置为上线，确定吗？',
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          hidden: !this.checkAuthority(
            accessWayCollection.article.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
          confirm: true,
          title: '将要设置为下线，确定吗？',
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !this.checkAuthority(
            accessWayCollection.article.refreshCache.permission,
          ),
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 620,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 80,
      showRichFacade: true,
      facadeConfig: {
        circle: false,
      },
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getArticleStatusName({
            metaData: this.getMetaData(),
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];

  renderPresetPageHeaderContent = () => {
    const { currentOperator } = this.state;

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
      defaultValue: '--',
    });

    return <PageHeaderContent avatar={avatar} name={name} />;
  };

  renderPresetSiderTopArea = () => {
    return <ShortcutPanel />;
  };
}

export default Index;
