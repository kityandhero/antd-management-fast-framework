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
  fieldDataFlowCaseNextProcessNotification,
} from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseNextProcessNotificationStatusName,
} from '../../../customSpecialComponents';
import { getFlowCaseNextProcessNotificationStatusBadge } from '../Assist/tools';

const { MultiPage } = DataMultiPageView;

class BaseFlowCaseNextProcessNotificationPageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '流程实例下一审批通知列表',
      paramsKey: accessWayCollection.workflowCase.pageList.paramsKey,
      loadApiPath: 'workflowCase/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseNextProcessNotificationId = (o) => {
    throw new Error(
      'getFlowCaseNextProcessNotificationId need overrode to implement',
    );
  };

  getFlowCaseNextProcessNotificationIdDataTarget = () => {
    throw new Error(
      'getFlowCaseNextProcessNotificationIdDataTarget need overrode to implement',
    );
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const that = this;

    const id = that.getFlowCaseNextProcessNotificationId(handleData);

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        return that.getFlowCaseNextProcessNotificationId(o);
      },
      handler: (d) => {
        const o = d;

        o[fieldDataFlowCaseNextProcessNotification.status.name] = getValueByKey(
          {
            data: remoteData,
            key: fieldDataFlowCaseNextProcessNotification.status.name,
          },
        );

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
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataFlowCaseNextProcessNotification.flowCaseTitle,
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
      dataTarget: fieldDataFlowCaseNextProcessNotification.flowCaseTitle,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessNotification.nextWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget:
        fieldDataFlowCaseNextProcessNotification.nextApproveUserRealName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessNotification.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessNotification.channel,
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
      dataTarget: fieldDataFlowCaseNextProcessNotification.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseNextProcessNotificationStatusBadge(value),
          text: getFlowCaseNextProcessNotificationStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessNotification.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: this.getFlowCaseNextProcessNotificationIdDataTarget(),
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessNotification.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { BaseFlowCaseNextProcessNotificationPageList };
