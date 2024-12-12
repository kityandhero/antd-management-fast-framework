import {
  buildRandomHexColor,
  showSimpleErrorMessage,
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

const { MultiPage } = DataMultiPageView;

class BaseFlowCaseProcessHistoryPageList extends MultiPage {
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: '',
      tableScrollX: 1300,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  getFlowCaseIdDataTarget = () => {
    throw new Error('getFlowCaseIdDataTarget need overrode to implement');
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

  checkGetAuthority = () => {
    throw new Error('checkGetAuthority need overrode to implement');
  };

  checkHasRefreshCacheAuthority = () => {
    throw new Error('checkHasRefreshCacheAuthority need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  preview = (item) => {
    throw new Error('preview need overrode to implement');
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataFlowCaseProcessHistory.flowCaseTitle,
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
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !this.checkGetAuthority(),
      handleButtonClick: ({ handleData }) => {
        this.preview(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataFlowCaseProcessHistory.flowCaseTitle,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
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
      dataTarget: fieldDataFlowCaseProcessHistory.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: this.getFlowCaseProcessHistoryIdDataTarget(),
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

export { BaseFlowCaseProcessHistoryPageList };
