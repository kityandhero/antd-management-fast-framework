import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  getHostServiceStatusName,
  renderSearchHostServiceStatusSelect,
} from '../../../customSpecialComponents';
import {
  refreshAllStatusAction,
  setRestartAction,
  setStartAction,
  setStopAction,
} from '../Assist/action';
import { parseUrlParametersForSetState } from '../Assist/config';
import { getStatusBadge, showOperateMessage } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ hostService, schedulingControl }) => ({
  hostService,
  schedulingControl,
}))
class PageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      paramsKey: accessWayCollection.hostService.pageList.paramsKey,
      pageTitle: '驻守服务列表',
      loadApiPath: 'hostService/pageList',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setStart': {
        this.setStart(handleData);

        break;
      }

      case 'setStop': {
        this.setStop(handleData);

        break;
      }

      case 'setRestart': {
        this.setRestart(handleData);

        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  setStart = (r) => {
    setStartAction({
      target: this,
      handleData: r,
      successCallback: () => {
        showOperateMessage();
      },
    });
  };

  setStop = (r) => {
    setStopAction({
      target: this,
      handleData: r,
      successCallback: () => {
        showOperateMessage();
      },
    });
  };

  setRestart = (r) => {
    setRestartAction({
      target: this,
      handleData: r,
      successCallback: () => {
        showOperateMessage();
      },
    });
  };

  refreshAllStatus = (r) => {
    refreshAllStatusAction({
      target: this,
      handleData: r,
      successCallback: () => {
        showOperateMessage();
      },
    });
  };

  goToEdit = (record) => {
    const hostServiceId = getValueByKey({
      data: record,
      key: fieldData.hostServiceId.name,
    });

    this.goToPath(
      `/services/hostService/edit/load/${hostServiceId}/key/changeRecord/pageList`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchHostServiceStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'dosh',
        icon: iconBuilder.reload(),
        text: '重新获取服务状态',
        handleClick: this.refreshAllStatus,
        disabled: this.checkInProgress(),
        confirm: true,
        title: '即将重新获取服务状态，该操作较为耗时，确定执行吗？',
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const itemStatus = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    // const itemServiceChannel = getValueByKey({
    //   data: record,
    //   key: fieldData.serviceChannel.name,
    //   convert: convertCollection.number,
    // });

    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setStart',
          icon: iconBuilder.playCircle(),
          text: '启动服务',
          disabled: itemStatus === statusCollection.start,
          // hidden: itemServiceChannel === daemonServiceChannel,
          confirm: true,
          title: '即将启动服务，确定吗？',
        },
        {
          key: 'setStop',
          icon: iconBuilder.pauseCircle(),
          text: '停止服务',
          disabled: itemStatus === statusCollection.stop,
          // hidden: itemServiceChannel === daemonServiceChannel,
          confirm: true,
          title: '即将停止服务，确定吗？',
        },
        {
          key: 'setRestart',
          icon: iconBuilder.redo(),
          text: '重启服务',
          // hidden: itemServiceChannel === daemonServiceChannel,
          confirm: true,
          title: '即将重启服务，确定吗？',
        },
      ],
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
      dataTarget: fieldData.serviceChannel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.hostServiceId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.updateTime,
      width: 150,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getHostServiceStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.channel,
      width: 220,
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
  ];
}

export default PageList;
