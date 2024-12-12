import {
  buildRandomHexColor,
  checkInCollection,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  fieldDataFlowCase,
  flowCaseStatusCollection,
} from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseStatusName,
} from '../../../customSpecialComponents';
import { getFlowCaseStatusBadge } from '../Assist/tools';

const { MultiPageDrawer } = DataMultiPageView;

class BaseFlowCasePageListUnderwayDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  columnOperateWidth = 140;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: '',
      tableScrollX: 1400,
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

    d[fieldDataFlowCase.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.workflowId.name,
    });

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'forceEnd': {
        this.forceEnd(handleData);

        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  getFlowCaseIdDataTarget = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  refreshCache = (o) => {
    throw new Error('refreshCache need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  forceEnd = (o) => {
    throw new Error('forceEnd need overrode to implement');
  };

  afterForceEnd = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  checkHasRefreshCacheAuthority = () => {
    throw new Error('checkHasRefreshCacheAuthority need overrode to implement');
  };

  checkHasForceEndAuthority = () => {
    throw new Error('checkHasForceEndAuthority need overrode to implement');
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
    const status = getValueByKey({
      data: record,
      key: fieldDataFlowCase.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !this.checkHasRefreshCacheAuthority(),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      confirm: true,
      title: '即将刷新缓存，确定吗？',
      items: [
        {
          key: 'forceEnd',
          icon: iconBuilder.stop(),
          text: '强制结束',
          disabled: !this.checkHasForceEndAuthority(),
          hidden: !checkInCollection(
            [
              flowCaseStatusCollection.submitApproval,
              flowCaseStatusCollection.inApprovalProcess,
            ],
            status,
          ),
          confirm: true,
          title: '将要强制结束审批（即该次审批作废），确定吗？',
        },
      ],
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
      dataTarget: fieldDataFlowCase.userRealName,
      width: 140,
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
      dataTarget: fieldDataFlowCase.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCase.workflowId,
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

BaseFlowCasePageListUnderwayDrawer.defaultProps = {
  ...MultiPageDrawer.defaultProps,
  width: 1200,
};

export { BaseFlowCasePageListUnderwayDrawer };
