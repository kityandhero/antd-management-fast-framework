import { buildRandomHexColor, toNumber } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { fieldDataFlowCase } from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseStatusName,
} from '../../../customSpecialComponents';
import { getFlowCaseStatusBadge } from '../Assist';

const { MultiPageDrawer } = DataMultiPageView;

class BaseFlowCasePageListWaitApproveDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: '',
      tableScrollX: 1360,
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

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  getFlowCaseIdDataTarget = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  refreshCache = (o) => {
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
          fieldData: fieldDataFlowCase.title,
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
      dataTarget: fieldDataFlowCase.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCase.nextApproveWorkflowNodeName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCase.waitApproveUserRealName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCase.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCase.channel,
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
      dataTarget: fieldDataFlowCase.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseStatusBadge(value),
          text: getFlowCaseStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: this.getFlowCaseIdDataTarget(),
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCase.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { BaseFlowCasePageListWaitApproveDrawer };
