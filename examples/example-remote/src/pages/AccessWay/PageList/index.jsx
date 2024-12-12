import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  extraBuildType,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  renderSearchManagementChannelSelect,
} from '../../../customSpecialComponents';
import { refreshCacheAction, testPermissionAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { PageListAssemblyVerifyDrawer } from '../PageListAssemblyVerifyDrawer';
import { PermissionActionUniqueDrawer } from '../PermissionActionUniqueDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ accessWay, schedulingControl }) => ({
  accessWay,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.accessWay.pageList.paramsKey,
      pageTitle: '模块列表',
      loadApiPath: 'accessWay/pageList',
    };
  }

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  testPermission = () => {
    testPermissionAction({
      target: this,
      handleData: {},
    });
  };

  showPermissionActionUniqueDrawer = () => {
    PermissionActionUniqueDrawer.open();
  };

  showPageListAssemblyVerifyDrawer = () => {
    PageListAssemblyVerifyDrawer.open();
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.swap(),
          text: '同步权限数据',
          confirm: true,
          title: '即将同步权限数据，该操作较为耗时，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.testPermissionAction.permission,
          ),
          handleClick: () => {
            this.testPermission();
          },
        },
        {
          buildType: extraBuildType.divider,
        },
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.schedule(),
          text: '测试权限唯一性',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.testPermissionActionUnique.permission,
          ),
          handleClick: () => {
            this.showPermissionActionUniqueDrawer();
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.schedule(),
          text: '校验权限数据',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.pageListAssemblyVerify.permission,
          ),
          handleClick: () => {
            this.showPageListAssemblyVerifyDrawer();
          },
        },
      ],
    };
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.channel.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchManagementChannelSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.cloudStorage.refreshCache.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: item,
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.relativePath,
      width: 300,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.expand,
      width: 340,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.channel,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 31,
          }),
        };
      },
      formatValue: (value) => {
        return getChannelName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.guidTag,
      width: 120,
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
  ];

  renderPresetOther = () => {
    return (
      <>
        <PermissionActionUniqueDrawer maskClosable />

        <PageListAssemblyVerifyDrawer maskClosable />
      </>
    );
  };
}

export default PageList;
