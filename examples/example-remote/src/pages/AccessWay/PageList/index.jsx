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
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  renderSearchManagementChannelSelect,
} from '../../../customSpecialComponents';
import { ActionMapDrawer } from '../ActionMapDrawer';
import { refreshCacheAction, testPermissionAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { ModelConfigFileContentDrawer } from '../ModelConfigFileContentDrawer';
import { NonePermissionActionMapDrawer } from '../NonePermissionActionMapDrawer';
import { PageListAssemblyVerifyDrawer } from '../PageListAssemblyVerifyDrawer';
import { PermissionActionMapDrawer } from '../PermissionActionMapDrawer';
import { PermissionActionUniqueDrawer } from '../PermissionActionUniqueDrawer';
import { PermissionFileContentDrawer } from '../PermissionFileContentDrawer';

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

  showActionMapDrawer = () => {
    ActionMapDrawer.open();
  };

  showPermissionActionMapDrawer = () => {
    PermissionActionMapDrawer.open();
  };

  showNonePermissionActionMapDrawer = () => {
    NonePermissionActionMapDrawer.open();
  };

  showPermissionActionUniqueDrawer = () => {
    PermissionActionUniqueDrawer.open();
  };

  showPageListAssemblyVerifyDrawer = () => {
    PageListAssemblyVerifyDrawer.open();
  };

  showModelConfigFileContentDrawer = () => {
    ModelConfigFileContentDrawer.open();
  };

  showPermissionFileContentDrawer = () => {
    PermissionFileContentDrawer.open();
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.swap(),
          text: '测试权限接口',
          confirm: true,
          title: '即将测试权限接口，该操作较为耗时，确定执行吗?',
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

  establishExtraActionGroupConfig = () => {
    const that = this;

    return {
      buttons: [
        {
          key: 'showActionMap',
          type: 'default',
          size: 'small',
          text: '显示 Action Map',
          icon: iconBuilder.inbox(),
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.getActionMap.permission,
          ),
          handleButtonClick: () => {
            that.showActionMapDrawer();
          },
          disabled: this.checkInProgress(),
        },
        {
          key: 'showPermissionActionMap',
          type: 'default',
          size: 'small',
          text: '显示鉴权 Action Map',
          icon: iconBuilder.inbox(),
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.getPermissionActionMap.permission,
          ),
          handleButtonClick: () => {
            that.showPermissionActionMapDrawer();
          },
          disabled: this.checkInProgress(),
        },
        {
          key: 'showNonePermissionActionMap',
          type: 'default',
          size: 'small',
          text: '显示无需鉴权 Action Map',
          icon: iconBuilder.inbox(),
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.getNonePermissionActionMap.permission,
          ),
          handleButtonClick: () => {
            that.showNonePermissionActionMapDrawer();
          },
          disabled: this.checkInProgress(),
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const that = this;

    return {
      disabled: this.checkInProgress(),
      size: 'small',
      // eslint-disable-next-line no-unused-vars
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'showModelConfigFileContent': {
            that.showModelConfigFileContentDrawer();
            break;
          }

          case 'showPermissionFileContent': {
            that.showPermissionFileContentDrawer();
            break;
          }

          default: {
            break;
          }
        }
      },
      items: [
        {
          key: 'showModelConfigFileContent',
          icon: iconBuilder.read(),
          text: '查看前端Model配置文件',
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.getModelConfigFileContent.permission,
          ),
        },
        {
          key: 'showPermissionFileContent',
          icon: iconBuilder.read(),
          text: '查看前端权限文件',
          hidden: !checkHasAuthority(
            accessWayCollection.accessWay.getPermissionFileContent.permission,
          ),
        },
      ],
    };
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
        <ActionMapDrawer maskClosable />

        <PermissionActionMapDrawer maskClosable />

        <NonePermissionActionMapDrawer maskClosable />

        <PermissionActionUniqueDrawer maskClosable />

        <PermissionFileContentDrawer maskClosable />

        <ModelConfigFileContentDrawer maskClosable />

        <PageListAssemblyVerifyDrawer maskClosable />
      </>
    );
  };
}

export default PageList;
