import {
  buildRandomHexColor,
  getValueByKey,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  getFlowNodeStatusName,
  getFlowNodeTypeName,
  renderSearchWorkflowNodeStatusSelect,
} from '../../../customSpecialComponents';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

class BaseNodePageListSelectDrawer extends MultiPageSelectDrawer {
  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 440,
      loadApiPath: 'workflowNode/pageList',
    };
  }

  // eslint-disable-next-line no-unused-vars
  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.label,
    });

    return {
      ...o,
      workflowId: workflowId,
    };
  };

  getPageName = () => {
    return '流程节点列表';
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.type.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchWorkflowNodeStatusSelect({}),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
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
      formatValue: (value) => {
        return value === 0 ? '' : value;
      },
    },
    {
      dataTarget: fieldData.type,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 10,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowNodeTypeName({
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
          text: getFlowNodeStatusName({
            value: value,
          }),
        };
      },
    },
  ];
}

export { BaseNodePageListSelectDrawer };
