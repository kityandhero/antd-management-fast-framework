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
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseStatusName,
  renderSearchBusinessModeSelect,
  renderSearchFlowScopeSelect,
  renderSearchFlowStatusSelect,
} from '../../../customSpecialComponents';
import { refreshCacheAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflowCase.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '流程实例列表',
      paramsKey: accessWayCollection.workflowCase.pageList.paramsKey,
      loadApiPath: 'workflowCase/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);

        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  goToEdit = (item) => {
    const workflowCaseId = getValueByKey({
      data: item,
      key: fieldData.workflowCaseId.name,
    });

    this.goToPath(
      `/flow/workflowCase/edit/load/${workflowCaseId}/key/basicInfo`,
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowScopeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchBusinessModeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowStatusSelect({}),
        },
        {
          lg: 4,
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
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          withDivider: true,
          uponDivider: true,
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
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.userRealName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
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
          text: getFlowCaseStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowCaseId,
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

export default PageList;
