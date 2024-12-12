import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowStatusCollection,
} from '../../../customConfig';
import {
  getBusinessModeName,
  getChannelName,
  getFlowEffectiveRangeName,
  getFlowScopeName,
  getFlowStatusName,
  renderSearchBusinessModeSelect,
  renderSearchFlowScopeSelect,
  renderSearchFlowStatusSelect,
} from '../../../customSpecialComponents';
import { AddOfficeAutomationArticleAuditDrawer } from '../AddOfficeAutomationArticleAuditDrawer';
import { AddOfficeAutomationProcessApprovalDrawer } from '../AddOfficeAutomationProcessApprovalDrawer';
import {
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { CreateDuplicateModal } from '../CreateDuplicateModal';
import { UpdateChannelModal } from '../UpdateChannelModal';

const { MultiPage } = DataMultiPageView;

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflow.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '流程列表',
      paramsKey: accessWayCollection.workflow.pageList.paramsKey,
      loadApiPath: 'workflow/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const workflowId = getValueByKey({
      data: handleData,
      key: fieldData.workflowId.name,
    });

    handleItem({
      target,
      value: workflowId,
      compareValueHandler: (o) => {
        const { workflowId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setChannel': {
        this.showUpdateChannelModal(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'showCreateDuplicateModal': {
        this.showCreateDuplicateModal(handleData);
        break;
      }

      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

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

  setEnable = (item) => {
    setEnableAction({
      target: this,
      handleData: item,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (item) => {
    setDisableAction({
      target: this,
      handleData: item,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  remove = (item) => {
    const { metaListData } = this.state;

    const that = this;

    removeAction({
      target: that,
      handleData: item,
      successCallback: ({ target }) => {
        if (metaListData.length === 1) {
          target.refreshDataWithReloadAnimalPrompt({
            prepareRequest: () => {
              that.pageValues.pageNo =
                that.pageValues.pageNo - 1 <= 0
                  ? 1
                  : that.pageValues.pageNo - 1;

              that.pageValues.frontendPageNo =
                that.pageValues.frontendPageNo - 1 <= 0
                  ? 1
                  : that.pageValues.frontendPageNo - 1;
            },
          });
        } else {
          target.refreshDataWithReloadAnimalPrompt({});
        }
      },
    });
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  showUpdateChannelModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      UpdateChannelModal.open();
    });
  };

  afterUpdateChannelModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showAddOfficeAutomationArticleAuditDrawer = () => {
    AddOfficeAutomationArticleAuditDrawer.open();
  };

  afterAddOfficeAutomationArticleAuditDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showAddOfficeAutomationProcessApprovalDrawer = () => {
    AddOfficeAutomationProcessApprovalDrawer.open();
  };

  afterAddOfficeAutomationProcessApprovalDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showCreateDuplicateModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      CreateDuplicateModal.open();
    });
  };

  afterCreateDuplicateModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToEdit = (item) => {
    const workflowId = getValueByKey({
      data: item,
      key: fieldData.workflowId.name,
    });

    this.goToPath(`/flow/workflow/edit/load/${workflowId}/key/basicInfo`);
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.scope.name] = unlimitedWithStringFlag.flag;
    values[fieldData.businessMode.name] = unlimitedWithStringFlag.flag;
    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
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

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '增加审批流程',
        handleClick: this.showAddOfficeAutomationProcessApprovalDrawer,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '增加文章审核流程',
        handleClick: this.showAddOfficeAutomationArticleAuditDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setChannel',
          icon: iconBuilder.edit(),
          text: '设置数据通道',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showCreateDuplicateModal',
          icon: iconBuilder.copy(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.createDuplicate.permission,
          ),
          text: '复制流程',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled: status === flowStatusCollection.enable,
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled: status === flowStatusCollection.disable,
          confirm: true,
          title: '将要设为禁用，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除流程',
          confirm: true,
          title: '将要移除流程，确定吗？',
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
    },
    {
      dataTarget: fieldData.businessMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 29,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.scope,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 44,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowScopeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.effectiveRange,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowEffectiveRangeName({
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
      dataTarget: fieldData.creatorUserRealName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
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
          text: getFlowStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowId,
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

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <AddOfficeAutomationArticleAuditDrawer
          afterOK={this.afterAddOfficeAutomationArticleAuditDrawerOk}
        />

        <AddOfficeAutomationProcessApprovalDrawer
          afterOK={this.afterAddOfficeAutomationProcessApprovalDrawerOk}
        />

        <UpdateChannelModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateChannelModalOk();
          }}
        />

        <CreateDuplicateModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterCreateDuplicateModalOk();
          }}
        />
      </>
    );
  };
}

export default PageList;
