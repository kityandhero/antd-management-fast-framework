import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getCurrentOperatorCache,
  getGuid,
  getValueByKey,
  handleItem,
} from 'easy-soft-utility';

import { columnFacadeMode, listViewConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  getCurrentOperator,
} from 'antd-management-fast-framework';

import { TestComponent } from '../../components/TestComponent';
import { accessWayCollection } from '../../customConfig';
import { getSimpleStatusName } from '../../customSpecialComponents';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Simple/Assist/action';
import { getStatusBadge } from '../Simple/Assist/tools';
import { fieldData, statusCollection } from '../Simple/Common/data';

import { PageHeaderContent } from './PageHeaderContent';
import ShortcutPanel from './ShortcutPanel';

const { MultiPage } = DataMultiPageView;

@connect(({ simple, user, currentOperator, schedulingControl }) => ({
  simple,
  user,
  currentOperator,
  schedulingControl,
}))
class Index extends MultiPage {
  componentAuthority = accessWayCollection.simple.pageList.permission;

  resetDataAfterLoad = false;

  showSearchForm = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '工作台',
      listTitle: '新近列表',
      loadApiPath: 'simple/pageList',
      tableScrollX: 1020,
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
    const simpleId = getValueByKey({
      data: remoteData,
      key: fieldData.simpleId.name,
    });

    handleItem({
      target,
      value: simpleId,
      compareValueHandler: (o) => {
        const { simpleId: v } = o;

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
    this.goToPath(`/simple/addBasicInfo`);
  };

  goToEdit = (record) => {
    const { simpleId } = record;

    this.goToPath(`/simple/edit/load/${simpleId}/key/basicInfo`);
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishPageHeaderSubTitle = () => {
    return '在这里可以快速开展任务作业';
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
        hidden: !checkHasAuthority(
          accessWayCollection.simple.addBasicInfo.permission,
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
          hidden: !checkHasAuthority(
            accessWayCollection.simple.updateBasicInfo.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: true,
          title: '将要设置为上线，确定吗？',
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          hidden: !checkHasAuthority(
            accessWayCollection.simple.setOffline.permission,
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
          hidden: !checkHasAuthority(
            accessWayCollection.simple.refreshCache.permission,
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
          text: getSimpleStatusName({
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

  // establishPageHeaderContentParagraphConfig = () => {
  //   return {
  //     paragraph:
  //       '经过上述讨论， 文章标题，到底应该如何实现。 总结的来说， 一般来说， 这样看来， 佚名在不经意间这样说过，感激每一个新的挑战，因为它会锻造你的意志和品格。这句话语虽然很短，但令我浮想联翩。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 就我个人来说，文章标题对我的意义，不能不说非常重大。 我们不得不面对一个非常尴尬的事实，那就是， 克劳斯·莫瑟爵士曾经提到过，教育需要花费钱，而无知也是一样。这不禁令我深思。',
  //   };
  // };

  establishPageHeaderContentComponentConfig = () => {
    const currentOperator = getCurrentOperatorCache();

    const avatar = getValueByKey({
      data: currentOperator,
      key: 'avatar',
    });

    const name = getValueByKey({
      data: currentOperator,
      key: 'name',
      defaultValue: '--',
    });

    return {
      component: <PageHeaderContent avatar={avatar} name={name} />,
    };
  };

  establishSiderTopAreaConfig = () => {
    return (
      <>
        <TestComponent text={getGuid()} />
        <ShortcutPanel />
      </>
    );
  };
}

export default Index;
