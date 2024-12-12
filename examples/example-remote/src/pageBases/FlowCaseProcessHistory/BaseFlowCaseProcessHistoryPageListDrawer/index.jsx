import {
  buildRandomHexColor,
  getValueByKey,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldDataFlowCaseProcessHistory } from '../../../customConfig';
import {
  getChannelName,
  getFlowApproveActionModeName,
  getFlowApproveActionName,
  getFlowCaseProcessHistoryStatusName,
} from '../../../customSpecialComponents';
import { getFlowCaseProcessHistoryStatusBadge } from '../Assist';

const { MultiPageDrawer } = DataMultiPageView;

class BaseFlowCaseProcessHistoryPageListDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: '',
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

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowCaseProcessHistory.flowCaseId.name,
    });

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseProcessHistoryId = (o) => {
    throw new Error('getFlowCaseProcessHistoryId need overrode to implement');
  };

  getFlowCaseProcessHistoryIdDataTarget = () => {
    throw new Error(
      'getFlowCaseProcessHistoryIdDataTarget need overrode to implement',
    );
  };

  // eslint-disable-next-line no-unused-vars
  refreshCache = (item) => {
    throw new Error('refreshCache need overrode to implement');
  };

  checkHasRefreshCacheAuthority = () => {
    throw new Error('checkHasRefreshCacheAuthority need overrode to implement');
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName,
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
      disabled: !this.checkHasRefreshCacheAuthority(),
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
      dataTarget: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveWorkflowNodeTypeNote,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.approveAction,
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
      dataTarget: fieldDataFlowCaseProcessHistory.approveActionMode,
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
      dataTarget: fieldDataFlowCaseProcessHistory.channel,
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
      dataTarget: fieldDataFlowCaseProcessHistory.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseProcessHistoryStatusBadge(value),
          text: getFlowCaseProcessHistoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: this.getFlowCaseProcessHistoryIdDataTarget(),
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseProcessHistory.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { BaseFlowCaseProcessHistoryPageListDrawer };
