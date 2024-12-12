import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  getValueByKey,
  pretreatmentRequestParameters,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import { columnFacadeMode, listViewConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { getChannelName } from '../../../customSpecialComponents';
import { PageListDrawer } from '../../ChannelSqlLogSwitch/PageListDrawer';
import {
  createTestLogAction,
  removeAction,
  removeAllAction,
  removeMultiAction,
} from '../Assist/action';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ sqlLog, schedulingControl }) => ({
  sqlLog,
  schedulingControl,
}))
class Index extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'SQL日志列表',
      paramsKey: accessWayCollection.sqlLog.pageList.paramsKey,
      loadApiPath: 'sqlLog/pageList',
      tableScrollX: 2200,
      dateRangeFieldName: '发生时段',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeMulti = () => {
    let submitData = this.initLoadRequestParams() || {};

    submitData = pretreatmentRequestParameters(submitData || {});

    submitData = this.supplementLoadRequestParams(submitData || {});

    const checkResult = this.checkLoadRequestParams(submitData || {});

    if (!checkResult) {
      return;
    }

    removeMultiAction({
      target: this,
      handleData: submitData,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeAll = () => {
    removeAllAction({
      target: this,
      handleData: {},
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  createTestLog = () => {
    createTestLogAction({
      target: this,
      handleData: {},
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showPreviewDrawer = (record) => {
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  showSwitchDrawer = () => {
    PageListDrawer.open();
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'dashed',
        icon: iconBuilder.message(),
        text: '创建测试日志',
        handleClick: this.createTestLog,
        confirm: true,
        title: '即将创建测试日志，该功能仅用于测试队列，确定吗？',
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'dashed',
        icon: iconBuilder.delete(),
        text: '批量删除',
        handleClick: this.removeMulti,
        confirm: true,
        title: '即将根据搜索条件批量删除日志，确定吗？',
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'dashed',
        icon: iconBuilder.delete(),
        text: '全量删除',
        handleClick: this.removeAll,
        confirm: true,
        title: '即将删除全部日志，确定吗？',
      },
      {
        buildType: listViewConfig.dataContainerExtraActionBuildType.divider,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        icon: iconBuilder.swap(),
        text: '日志开关',
        handleClick: this.showSwitchDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.form(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '删除日志',
          confirm: true,
          title: '即将删除日志，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.commandString,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },

    {
      dataTarget: fieldData.executeType,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.startMilliseconds,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.durationMilliseconds,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.firstFetchDurationMilliseconds,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.errored,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value) => {
        return toNumber(value) === 1 ? '执行失败' : '执行成功';
      },
    },
    {
      dataTarget: fieldData.flag,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.sqlLogId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.triggerChannel,
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
      dataTarget: fieldData.collectMode,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 21,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.collectModeNote.name,
        });
      },
    },
    {
      dataTarget: fieldData.databaseChannel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PageListDrawer maskClosable />

        <PreviewDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default Index;
