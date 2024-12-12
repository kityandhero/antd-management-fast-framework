import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  handleItem,
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
  accessWayCollection,
  fieldDataFlowCaseNextProcessProgress,
} from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseNextProcessProgressStatusName,
} from '../../../customSpecialComponents';
import { getFlowCaseNextProcessProgressStatusBadge } from '../Assist/tools';

const { MultiPageDrawer } = DataMultiPageView;

class BaseFlowCaseNextProcessProgressPageListDrawer extends MultiPageDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 1180,
      pageTitle: '流程实例列表',
      loadApiPath: '',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldDataFlowCaseNextProcessProgress.flowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowCaseNextProcessProgress.flowCaseId.name,
      defaultValue: '',
    });

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseNextProcessProgressId = (o) => {
    throw new Error(
      'getFlowCaseNextProcessProgressId need overrode to implement',
    );
  };

  getFlowCaseNextProcessProgressIdDataTarget = () => {
    throw new Error(
      'getFlowCaseNextProcessProgressIdDataTarget need overrode to implement',
    );
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const that = this;

    const id = that.getFlowCaseNextProcessProgressId(handleData);

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        return that.getFlowCaseNextProcessProgressId(o);
      },
      handler: (d) => {
        const o = d;

        o[fieldDataFlowCaseNextProcessProgress.status.name] = getValueByKey({
          data: remoteData,
          key: fieldDataFlowCaseNextProcessProgress.status.name,
        });

        return d;
      },
    });
  };

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

  // eslint-disable-next-line no-unused-vars
  refreshCache = (item) => {
    throw new Error('refreshCache need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  preview = (item) => {
    throw new Error('preview need overrode to implement');
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataFlowCaseNextProcessProgress.flowCaseTitle,
        },
        {
          lg: 12,
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
      dataTarget: fieldDataFlowCaseNextProcessProgress.nextWorkflowNodeName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessProgress.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessProgress.channel,
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
      dataTarget: fieldDataFlowCaseNextProcessProgress.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseNextProcessProgressStatusBadge(value),
          text: getFlowCaseNextProcessProgressStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessProgress.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: this.getFlowCaseNextProcessProgressIdDataTarget(),
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessProgress.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { BaseFlowCaseNextProcessProgressPageListDrawer };
