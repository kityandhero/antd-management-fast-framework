import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import {
  defaultEmptyImage,
  dropdownExpandItemType,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataTabContainer,
  refreshMetaData,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { refreshAllCacheAction } from '../../KeyValueInfrastructure/Assist/action';
import {
  startExecuteDebugAction,
  stopExecuteDebugAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { ExecuteDebugPreviewDrawer } from '../ExecuteDebugPreviewDrawer';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class Setting extends DataTabContainer {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'defaultImage/pageList',
      tab: '默认图片设置',
    },
    {
      key: 'defaultValueInfo',
      tab: '默认值设置',
    },
    {
      key: 'fileStorageInfo',
      tab: '文件存储设置',
    },
    {
      key: 'smsInfo',
      tab: '短信配置',
    },
    {
      key: 'secretKeyInfo',
      tab: '系统密钥配置',
    },
    {
      key: 'flowInfo',
      tab: '流程配置',
    },
    {
      key: 'scoreInfo',
      tab: '积分配置',
    },
    {
      key: 'editorInfo',
      tab: '编辑器配置',
    },
    {
      key: 'diskSpaceMonitoringInfo',
      tab: '磁盘空间监控',
    },
    {
      key: 'architectureInfo',
      tab: '架构配置',
    },
    {
      key: 'otherInfo',
      tab: '其他配置',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      }),
    });
  };

  refreshAllCache = () => {
    refreshAllCacheAction({
      target: this,
      handleData: {},
      successCallback: () => {
        showSimpleSuccessMessage('全部基础配置缓存刷新成功');
      },
    });
  };

  startExecuteDebug = (r) => {
    startExecuteDebugAction({
      target: this,
      handleData: r,
    });
  };

  stopExecuteDebug = (r) => {
    stopExecuteDebugAction({
      target: this,
      handleData: r,
    });
  };

  showExecuteDebugPreviewDrawer = () => {
    ExecuteDebugPreviewDrawer.open();
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const logo = getValueByKey({
      data: metaData,
      key: fieldData.logo.name,
    });

    return { src: logo || defaultEmptyImage };
  };

  establishPageHeaderTitlePrefix = () => {
    return '系统名';
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    return {
      buttons: [
        {
          key: 'refreshMetaData',
          text: '刷新元数据',
          icon: iconBuilder.redo(),
          // eslint-disable-next-line no-unused-vars
          handleButtonClick: ({ handleData }) => {
            refreshMetaData({
              successCallback: () => {
                showSimpleSuccessMessage('元数据刷新成功');
              },
            });
          },
          handleData: metaData,
        },
        {
          key: 'refreshAllCache',
          text: '刷新全部基础配置缓存',
          icon: iconBuilder.redo(),
          handleButtonClick: () => {
            this.refreshAllCache();
          },
          handleData: metaData,
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'startExecuteDebug': {
            that.startExecuteDebug(handleData);
            break;
          }

          case 'stopExecuteDebug': {
            that.stopExecuteDebug(handleData);
            break;
          }

          case 'showExecuteDebugPreviewDrawer': {
            that.showExecuteDebugPreviewDrawer(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage('can not find matched key');
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'startExecuteDebug',
          icon: iconBuilder.playCircle(),
          text: '开始执行调试',
          hidden: !checkHasAuthority(accessWayCollection.super.permission),
          confirm: true,
          title: '即将开始执行调试，确定吗？',
        },
        {
          key: 'stopExecuteDebug',
          icon: iconBuilder.pauseCircle(),
          text: '停止执行调试',
          hidden: !checkHasAuthority(accessWayCollection.super.permission),
          confirm: true,
          title: '即将停止执行调试，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showExecuteDebugPreviewDrawer',
          icon: iconBuilder.read(),
          text: '执行调试信息',
          hidden: !checkHasAuthority(accessWayCollection.super.permission),
        },
      ],
    };
  };

  renderPresetOther = () => {
    return (
      <>
        <ExecuteDebugPreviewDrawer maskClosable />
      </>
    );
  };
}

export default Setting;
