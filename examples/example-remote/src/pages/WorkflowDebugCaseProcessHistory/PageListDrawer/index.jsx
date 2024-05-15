import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  getFlowApproveActionModeName,
  getFlowApproveActionName,
  getFlowCaseProcessHistoryStatusName,
} from '../../../customSpecialComponents';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '771ca30eb9dd44c490230701e49fb99d';

@connect(({ workflowDebugCaseProcessHistory, schedulingControl }) => ({
  workflowDebugCaseProcessHistory,
  schedulingControl,
}))
class WorkflowDebugCaseProcessHistoryPageListDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowDebugCaseProcessHistory.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试流程审批记录列表',
      loadApiPath: 'workflowDebugCaseProcessHistory/pageList',
      tableScrollX: 1300,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.flowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
    });

    return d;
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.approveWorkflowNodeName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowDebugCaseProcessHistory.refreshCache
          .permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: record,
      confirm: true,
      title: '即将刷新缓存，确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.approveWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.approveWorkflowNodeTypeNote,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.approveAction,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 2 + 21,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowApproveActionName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.approveActionMode,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: value * 2 + 15,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowApproveActionModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.channel,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 47,
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
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getFlowCaseProcessHistoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowDebugCaseProcessHistoryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { WorkflowDebugCaseProcessHistoryPageListDrawer };
