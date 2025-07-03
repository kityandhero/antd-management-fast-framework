import { Table } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyObject,
  isNull,
  showSimpleErrorMessage,
  toString,
  whetherNumber,
  zeroString,
} from 'easy-soft-utility';

import {
  cardConfig,
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildDropdown, iconBuilder } from 'antd-management-fast-component';
import {
  nodeApply,
  nodeAttention,
} from 'antd-management-fast-design-playground';
import { Flow, FlowProcessHistory } from 'antd-management-fast-flow';

import { FilePreviewDrawer } from '../../../../components';
import {
  accessWayCollection,
  emptySignet,
  fieldDataFlowCase,
  flowCaseStatusCollection,
  flowDebugApproverModeCollection,
  flowNodeTypeCollection,
} from '../../../../customConfig';
import { getChannelName } from '../../../../customSpecialComponents';
import {
  adjustFlowCaseDataToState,
  buildColumnsCarbonCopyNotification,
  buildColumnsCaseLatestApprove,
  buildColumnsNextProcessApprove,
  buildColumnsNextProcessNotification,
  convertProcessHistoryItemData,
  convertProcessHistoryNextData,
} from '../../../../pageBases';
import { PageListSubsidiarySelectActionDrawer } from '../../../Subsidiary/PageListSelectActionDrawer';
import {
  archiveAction,
  cancelArchiveAction,
  closeCancelApproveSwitchAction,
  closeResetAllApproveSwitchAction,
  forceEndAction,
  openCancelApproveSwitchAction,
  openResetAllApproveSwitchAction,
  setSubsidiaryIdAction,
  submitApprovalAction,
  toggleEmergencyAction,
} from '../../../WorkflowDebugCase/Assist/action';
import { fieldData } from '../../../WorkflowDebugCase/Common/data';
import { WorkflowDebugCasePageListLatestApproveDrawer } from '../../../WorkflowDebugCase/PageListLatestApproveDrawer';
import { WorkflowDebugCasePageListWaitApproveDrawer } from '../../../WorkflowDebugCase/PageListWaitApproveDrawer';
import { ProcessChainDrawer } from '../../../WorkflowDebugCase/ProcessChainDrawer';
import { SetApplicantStatementDrawer } from '../../../WorkflowDebugCase/SetApplicantStatementDrawer';
import { SetAttentionStatementDrawer } from '../../../WorkflowDebugCase/SetAttentionStatementDrawer';
import { SetAttentionUserDrawer } from '../../../WorkflowDebugCase/SetAttentionUserDrawer';
import { UpdateBasicInfoDrawer } from '../../../WorkflowDebugCase/UpdateBasicInfoDrawer';
import { fieldData as fieldDataWorkflowDebugCaseCarbonCopyNotification } from '../../../WorkflowDebugCaseCarbonCopyNotification/Common/data';
import { FormDrawer } from '../../../WorkflowDebugCaseFormStorage/FormDrawer';
import { fieldData as fieldDataWorkflowDebugCaseLatestApprove } from '../../../WorkflowDebugCaseLatestApprove/Common/data';
import { fieldData as fieldDataWorkflowDebugCaseNextProcessApprove } from '../../../WorkflowDebugCaseNextProcessApprove/Common/data';
import {
  refreshCacheAction as refreshNextProcessNotificationCacheAction,
  sendNextProcessNotificationAction,
} from '../../../WorkflowDebugCaseNextProcessNotification/Assist/action';
import { fieldData as fieldDataWorkflowDebugCaseNextProcessNotification } from '../../../WorkflowDebugCaseNextProcessNotification/Common/data';
import { WorkflowDebugCaseNextProcessNotificationPreviewDrawer } from '../../../WorkflowDebugCaseNextProcessNotification/PreviewDrawer';
import { WorkflowDebugCaseNextProcessProgressPreviewDrawer } from '../../../WorkflowDebugCaseNextProcessProgress/PreviewDrawer';
import {
  cancelApproveAction,
  resetAllApproveAction,
} from '../../../WorkflowDebugCaseProcessHistory/Assist/action';
import { WorkflowDebugCaseProcessHistoryPageListDrawer } from '../../../WorkflowDebugCaseProcessHistory/PageListDrawer';
import { PassModal } from '../../../WorkflowDebugCaseProcessHistory/PassModal';
import { RefuseModal } from '../../../WorkflowDebugCaseProcessHistory/RefuseModal';
import { DataSchemaDrawer } from '../../../WorkflowFormDesign/DataSchemaDrawer';
import { FlowDebugCaseFormDocumentDrawer } from '../../../WorkflowFormDesign/FlowDebugCaseFormDocumentDrawer';
import { fieldData as fieldDataWorkflowNode } from '../../../WorkflowNode/Common/data';
import { WorkflowNodeDetailDrawer } from '../../../WorkflowNode/DetailDrawer';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../../WorkflowNodeApprover/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { TabPageBase } from '../../TabPageBase';
import { UpdateDebugApproverModeModal } from '../../UpdateDebugApproverModeModal';
import { UpdateDebugUserDrawer } from '../../UpdateDebugUserDrawer';
import { UpdateDebugUserModeModal } from '../../UpdateDebugUserModeModal';

@connect(
  ({
    workflow,
    workflowDebugCase,
    workflowDebugCaseProcessHistory,
    schedulingControl,
  }) => ({
    workflow,
    workflowDebugCase,
    workflowDebugCaseProcessHistory,
    schedulingControl,
  }),
)
class DebugCaseInfo extends TabPageBase {
  componentAuthority =
    accessWayCollection.workflowDebugCase.getByWorkflow.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowDebugCase/getByWorkflow',
      workflowId: null,
      listApprove: [],
      listProcessHistory: [],
      nodeList: [],
      edgeList: [],
      currentNextProcessNotification: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const { nodeList, edgeList, listApprove, listProcessHistory } =
      adjustFlowCaseDataToState(metaData, {
        approveBatchNumber: 0,
        whetherFilterBatchNumber: false,
      });

    this.setState({
      nodeList: [...nodeList],
      edgeList: [...edgeList],
      listProcessHistory: [...listProcessHistory],
      listApprove: [...listApprove],
    });
  };

  submitApproval = (o) => {
    submitApprovalAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  openCancelApproveSwitch = (o) => {
    openCancelApproveSwitchAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  closeCancelApproveSwitch = (o) => {
    closeCancelApproveSwitchAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  openResetAllApproveSwitch = (o) => {
    openResetAllApproveSwitchAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  closeResetAllApproveSwitch = (o) => {
    closeResetAllApproveSwitchAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  cancelApprove = (o) => {
    cancelApproveAction({
      target: this,
      handleData: {
        flowCaseId: getValueByKey({
          data: o,
          key: fieldData.workflowDebugCaseId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  forceEnd = (o) => {
    forceEndAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  toggleEmergency = (r) => {
    toggleEmergencyAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  archive = (o) => {
    archiveAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  cancelArchive = (o) => {
    cancelArchiveAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  resetAllApprove = (o) => {
    resetAllApproveAction({
      target: this,
      handleData: {
        flowCaseId: getValueByKey({
          data: o,
          key: fieldData.workflowDebugCaseId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  refreshNextProcessNotificationCache = (o) => {
    refreshNextProcessNotificationCacheAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  sendNextProcessNotification = (o) => {
    sendNextProcessNotificationAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  setSubsidiaryId = (o) => {
    const { metaData } = this.state;

    setSubsidiaryIdAction({
      target: this,
      handleData: {
        workflowDebugCaseId: getValueByKey({
          data: metaData,
          key: fieldData.workflowDebugCaseId.name,
          convert: convertCollection.string,
        }),
        subsidiaryId: getValueByKey({
          data: o,
          key: fieldData.subsidiaryId.name,
          convert: convertCollection.string,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  getApplicantConfig = () => {
    const { metaData } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.applicantUserSignet.name,
      convert: convertCollection.string,
    });

    const listApply = [
      {
        ...nodeApply,
        title: applicantStatementTitle,
        note: applicantStatementContent,
        ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: applicantUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldData.applicantTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showApply: applicantSignSwitch === whetherNumber.yes,
      listApply,
    };
  };

  getAttentionConfig = () => {
    const { metaData } = this.state;

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldData.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldData.attentionUserSignet.name,
      convert: convertCollection.string,
    });

    const listAttention = [
      {
        ...nodeAttention,
        title: attentionStatementTitle,
        note: attentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: attentionUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldData.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  showUpdateBasicInfoDrawer = () => {
    UpdateBasicInfoDrawer.open();
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.reloadData({});
  };

  showSetApplicantStatementDrawer = () => {
    SetApplicantStatementDrawer.open();
  };

  afterSetApplicantStatementDrawerOk = () => {
    this.reloadData({});
  };

  showSetAttentionUserDrawer = () => {
    SetAttentionUserDrawer.open();
  };

  afterSetAttentionUserDrawerOk = () => {
    this.reloadData({});
  };

  showSetAttentionStatementDrawer = () => {
    SetAttentionStatementDrawer.open();
  };

  afterSetAttentionStatementDrawerOk = () => {
    this.reloadData({});
  };

  showPassModal = () => {
    PassModal.open();
  };

  afterPassModalOK = () => {
    this.reloadData({});
  };

  showRefuseModal = () => {
    RefuseModal.open();
  };

  afterRefuseModalOK = () => {
    this.reloadData({});
  };

  showUpdateDebugApproverModeModal = () => {
    UpdateDebugApproverModeModal.open();
  };

  afterUpdateDebugApproverModeModalOK = () => {
    this.reloadData({});
  };

  showUpdateDebugUserModeModal = () => {
    UpdateDebugUserModeModal.open();
  };

  afterUpdateDebugUserModeModalOK = () => {
    this.reloadData({});
  };

  showUpdateDebugUserDrawer = () => {
    UpdateDebugUserDrawer.open();
  };

  afterUpdateDebugUserDrawerOK = () => {
    this.reloadData({});
  };

  showFormDrawer = () => {
    FormDrawer.open();
  };

  showProcessChainDrawer = () => {
    ProcessChainDrawer.open();
  };

  afterFormDrawerOk = () => {
    this.reloadData({});
  };

  showDataSchemaDrawer = () => {
    DataSchemaDrawer.open();
  };

  showWorkflowNodeDetailDrawer = () => {
    WorkflowNodeDetailDrawer.open();
  };

  showWorkflowDebugCaseProcessHistoryPageListDrawer = () => {
    WorkflowDebugCaseProcessHistoryPageListDrawer.open();
  };

  showWorkflowDebugCasePageListWaitApproveDrawer = () => {
    WorkflowDebugCasePageListWaitApproveDrawer.open();
  };

  showWorkflowDebugCasePageListLatestApproveDrawer = () => {
    WorkflowDebugCasePageListLatestApproveDrawer.open();
  };

  showFlowDebugCaseFormDocumentDrawer = () => {
    FlowDebugCaseFormDocumentDrawer.open();
  };

  showWorkflowDebugCaseNextProcessProgressPreviewDrawer = () => {
    WorkflowDebugCaseNextProcessProgressPreviewDrawer.open();
  };

  showWorkflowDebugCaseNextProcessNotificationPreviewDrawer = (o) => {
    this.setState({ currentNextProcessNotification: o }, () => {
      WorkflowDebugCaseNextProcessNotificationPreviewDrawer.open();
    });
  };

  showArchiveDocumentDrawer = () => {
    FilePreviewDrawer.open();
  };

  showPageListSubsidiarySelectActionDrawer = () => {
    PageListSubsidiarySelectActionDrawer.open();
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const {
      firstLoadSuccess,
      metaData,
      nodeList,
      edgeList,
      listProcessHistory,
    } = this.state;

    const {
      latestApproveWorkflowNodeType,
      nextApproveWorkflowNode,
      listNextProcessNotification,
      listNextProcessApprove,
      listCarbonCopyNotification,
      listLatestApprove,
    } = {
      latestApproveWorkflowNodeType: 0,
      nextApproveWorkflowNode: null,
      listNextProcessNotification: [],
      listNextProcessApprove: [],
      listCarbonCopyNotification: [],
      listLatestApprove: [],
      ...metaData,
    };

    const cancelApproveSwitch = getValueByKey({
      data: metaData,
      key: fieldData.cancelApproveSwitch.name,
      convert: convertCollection.number,
    });

    const resetAllApproveSwitch = getValueByKey({
      data: metaData,
      key: fieldData.resetAllApproveSwitch.name,
      convert: convertCollection.number,
    });

    const userId = getValueByKey({
      data: metaData,
      key: fieldData.userId.name,
      convert: convertCollection.string,
    });

    const userRealName = getValueByKey({
      data: metaData,
      key: fieldData.userRealName.name,
    });

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const flowDebugUserRealName = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugUserRealName.name,
    });

    const flowDebugApproverUserRealName = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugApproverUserRealName.name,
    });

    const flowDebugUserId = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugUserId.name,
    });

    const flowDebugApproverUserId = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugApproverUserId.name,
    });

    const debugApproverMode = getValueByKey({
      data: metaData,
      key: fieldData.debugApproverMode.name,
      convert: convertCollection.number,
    });

    const whetherArchive = getValueByKey({
      data: metaData,
      key: fieldData.whetherArchive.name,
      convert: convertCollection.number,
    });

    const archiveUrl = getValueByKey({
      data: metaData,
      key: fieldData.archiveUrl.name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.edit(),
                text: '编辑测试实例信息',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCase.get.permission,
                ),
                handleClick: () => {
                  that.showUpdateBasicInfoDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.edit(),
                text: '编辑测试表单信息',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCaseFormStorage.set
                    .permission,
                ),
                handleClick: () => {
                  that.showFormDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.fork(),
                text: '表单审批链条',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCase.getChainByWorkflow
                    .permission,
                ),
                handleClick: () => {
                  that.showProcessChainDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.read(),
                text: '表单数据配置信息',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowFormDesign.getByWorkflow
                    .permission,
                ),
                handleClick: () => {
                  that.showDataSchemaDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.enable(),
                text: '开启撤销审批功能',
                disabled: !firstLoadSuccess,
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase
                      .openCancelApproveSwitch.permission,
                  ) || cancelApproveSwitch === whetherNumber.yes,
                handleClick: () => {
                  that.openCancelApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.pauseCircle(),
                text: '关闭撤销审批功能',
                disabled: !firstLoadSuccess,
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase
                      .closeCancelApproveSwitch.permission,
                  ) || cancelApproveSwitch === whetherNumber.no,
                handleClick: () => {
                  that.closeCancelApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.enable(),
                text: '开启重置审批功能',
                disabled: !firstLoadSuccess,
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase
                      .openResetAllApproveSwitch.permission,
                  ) || resetAllApproveSwitch === whetherNumber.yes,
                handleClick: () => {
                  that.openResetAllApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.pauseCircle(),
                text: '关闭重置审批功能',
                disabled: !firstLoadSuccess,
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase
                      .closeResetAllApproveSwitch.permission,
                  ) || resetAllApproveSwitch === whetherNumber.no,
                handleClick: () => {
                  that.closeResetAllApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.printer(),
                text: '打印',
                disabled:
                  !firstLoadSuccess ||
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase.get.permission,
                  ),
                handleClick: () => {
                  that.showFlowDebugCaseFormDocumentDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.dropdownEllipsis,
                handleMenuClick: ({ key, handleData }) => {
                  switch (key) {
                    case 'showPageListSubsidiarySelectActionDrawer': {
                      that.showPageListSubsidiarySelectActionDrawer(handleData);
                      break;
                    }

                    case 'showSetApplicantStatementDrawer': {
                      that.showSetApplicantStatementDrawer(handleData);
                      break;
                    }

                    case 'showSetAttentionUserDrawer': {
                      that.showSetAttentionUserDrawer(handleData);
                      break;
                    }

                    case 'showSetAttentionStatementDrawer': {
                      that.showSetAttentionStatementDrawer(handleData);
                      break;
                    }

                    case 'showUpdateDebugUserDrawer': {
                      that.showUpdateDebugUserDrawer(handleData);
                      break;
                    }

                    case 'showUpdateDebugUserModeModal': {
                      that.showUpdateDebugUserModeModal(handleData);
                      break;
                    }

                    case 'showUpdateDebugApproverModeModal': {
                      that.showUpdateDebugApproverModeModal(handleData);
                      break;
                    }

                    case 'toggleEmergency': {
                      that.toggleEmergency(handleData);
                      break;
                    }

                    case 'archive': {
                      that.archive(handleData);
                      break;
                    }

                    case 'cancelArchive': {
                      that.cancelArchive(handleData);
                      break;
                    }

                    case 'previewArchive': {
                      that.showArchiveDocumentDrawer(handleData);
                      break;
                    }

                    default: {
                      showSimpleErrorMessage('can not find matched key');
                      break;
                    }
                  }
                },
                handleData: metaData,
                items: [
                  {
                    key: 'showPageListSubsidiarySelectActionDrawer',
                    icon: iconBuilder.edit(),
                    text: `设置实例归属企业`,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.setSubsidiaryId
                        .permission,
                    ),
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'showSetApplicantStatementDrawer',
                    icon: iconBuilder.edit(),
                    text: `申请人签名配置`,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase
                        .setApplicantStatement.permission,
                    ),
                    disabled: applicantSignSwitch !== whetherNumber.yes,
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'showSetAttentionUserDrawer',
                    icon: iconBuilder.edit(),
                    text: `经办人配置`,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.setAttentionUser
                        .permission,
                    ),
                    disabled: attentionSignSwitch !== whetherNumber.yes,
                  },
                  {
                    key: 'showSetAttentionStatementDrawer',
                    icon: iconBuilder.edit(),
                    text: `经办人签名配置`,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase
                        .setAttentionStatement.permission,
                    ),
                    disabled: attentionSignSwitch !== whetherNumber.yes,
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'showUpdateDebugUserDrawer',
                    icon: iconBuilder.edit(),
                    text: '配置本流程指定调试发起人',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflow.setDebugUserId.permission,
                    ),
                  },
                  {
                    key: 'showUpdateDebugUserModeModal',
                    icon: iconBuilder.edit(),
                    text: '配置调试发起人模式',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflow.setDebugUserMode.permission,
                    ),
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'showUpdateDebugApproverModeModal',
                    icon: iconBuilder.edit(),
                    text: '配置调试审批人模式',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflow.setDebugApproverMode
                        .permission,
                    ),
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'toggleEmergency',
                    icon: iconBuilder.swap(),
                    text: '切换紧急',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.toggleEmergency
                        .permission,
                    ),
                    disabled: !checkInCollection(
                      [flowCaseStatusCollection.created],
                      status,
                    ),
                    confirm: true,
                    title:
                      '将要切换紧急状态（位于紧急状态下的审批，会向审批人发送审批通知），确定吗？',
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'archive',
                    icon: iconBuilder.file(),
                    text: '实例归档',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.archive.permission,
                    ),
                    disabled:
                      status !== flowCaseStatusCollection.success ||
                      whetherArchive === whetherNumber.yes,
                    confirm: true,
                    title: '将要进行归档操作，确定吗？',
                  },
                  {
                    key: 'cancelArchive',
                    icon: iconBuilder.file(),
                    text: '取消实例归档',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.cancelArchive
                        .permission,
                    ),
                    disabled:
                      status !== flowCaseStatusCollection.success ||
                      whetherArchive !== whetherNumber.yes,
                    confirm: true,
                    title: '将要进行取消归档操作，确定吗？',
                  },
                  {
                    key: 'previewArchive',
                    icon: iconBuilder.read(),
                    text: '预览归档文件',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.archive.permission,
                    ),
                    disabled:
                      whetherArchive !== whetherNumber.yes ||
                      checkStringIsNullOrWhiteSpace(archiveUrl),
                  },
                ],
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.workflowDebugCaseId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.workflowDebugCaseId.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.statusNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.statusNote.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.whetherArchiveNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.whetherArchiveNote.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.channel.label,
                  value: getChannelName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.channel.name,
                      convert: convertCollection.string,
                    }),
                    defaultValue: '暂无',
                  }),
                },
                {
                  span: 4,
                  label: fieldData.archiveUrl.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.archiveUrl.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.userRealName.label,
                  value: `${userRealName ?? ''}${checkStringIsNullOrWhiteSpace(userId) ? '' : toString(userId) === zeroString ? '' : ` [${userId}]`}`,
                },
                {
                  span: 1,
                  label: fieldData.whetherEmergencyNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.whetherEmergencyNote.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.lastSubmitApprovalTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.lastSubmitApprovalTime.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.userDepartments.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.userDepartments.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.userSubsidiaries.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.userSubsidiaries.name,
                  }),
                },
                {
                  span: 4,
                  label: fieldData.subsidiaryShortName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.subsidiaryShortName.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 4,
                labelStyle: {
                  width: '140px',
                },
                emptyValue: '暂无',
                emptyStyle: {
                  color: '#ccc',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '以下为配置信息',
              innerProps: {
                style: {
                  margin: '20px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 4,
                  label: fieldData.caseNameTemplate.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.caseNameTemplate.name,
                  }),
                },
                {
                  span: 3,
                  label: fieldData.smsTemplate.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.smsTemplate.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.approveBatchNumber.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.approveBatchNumber.name,
                    convert: convertCollection.number,
                    formatBuilder: (value) =>
                      `[SBN-${value}]【第${value + 1}次审批】`,
                  }),
                },
                {
                  span: 2,
                  label: fieldDataWorkflowNode.name.label,
                  value: getValueByKey({
                    data: nextApproveWorkflowNode,
                    key: fieldDataWorkflowNode.name.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.cancelApproveSwitch.label,
                  value:
                    getValueByKey({
                      data: metaData,
                      key: fieldData.cancelApproveSwitch.name,
                      convert: convertCollection.number,
                    }) == whetherNumber.yes
                      ? '开启'
                      : '关闭',
                },
                {
                  span: 1,
                  label: fieldData.resetAllApproveSwitch.label,
                  value:
                    getValueByKey({
                      data: metaData,
                      key: fieldData.resetAllApproveSwitch.name,
                      convert: convertCollection.number,
                    }) == whetherNumber.yes
                      ? '开启'
                      : '关闭',
                },
                {
                  span: 2,
                  label: fieldDataFlowCase.debugUserModeNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldDataFlowCase.debugUserModeNote.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.flowDebugUserRealName.label,
                  value: flowDebugUserRealName,
                },
                {
                  span: 1,
                  label: fieldData.flowDebugUserId.label,
                  value: flowDebugUserId,
                },
                {
                  span:
                    debugApproverMode ===
                    flowDebugApproverModeCollection.flowConfiguration
                      ? 4
                      : 2,
                  label: fieldDataFlowCase.debugApproverModeNote.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldDataFlowCase.debugApproverModeNote.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.flowDebugApproverUserRealName.label,
                  value: flowDebugApproverUserRealName,
                  hidden:
                    debugApproverMode ===
                    flowDebugApproverModeCollection.flowConfiguration,
                },
                {
                  span: 1,
                  label: fieldData.flowDebugApproverUserRealName.label,
                  value: flowDebugApproverUserId,
                  hidden:
                    debugApproverMode ===
                    flowDebugApproverModeCollection.flowConfiguration,
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 4,
                labelStyle: {
                  width: '140px',
                },
                emptyValue: '暂无',
                emptyStyle: {
                  color: '#ccc',
                },
              },
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '流程调试模式提交人信息, 将根据当前的流程调试提交人模式判断显示 "全局测试提交人/流程特定测试提交人".',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '调试工具栏',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.clock(),
                text: '提交审批',
                disabled:
                  !firstLoadSuccess ||
                  !checkInCollection(
                    [
                      flowCaseStatusCollection.created,
                      flowCaseStatusCollection.refuse,
                    ],
                    status,
                  ),
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCase.submitApproval
                    .permission,
                ),
                handleClick: () => {
                  this.submitApproval(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.arrowDown(),
                text: '同意审批',
                disabled:
                  !firstLoadSuccess ||
                  !checkInCollection(
                    [
                      flowCaseStatusCollection.submitApproval,
                      flowCaseStatusCollection.inApprovalProcess,
                    ],
                    status,
                  ) ||
                  latestApproveWorkflowNodeType ===
                    flowNodeTypeCollection.endNode,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCaseProcessHistory.pass
                    .permission,
                ),
                handleClick: () => {
                  this.showPassModal();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.arrowUp(),
                text: '拒绝审批',
                disabled:
                  !firstLoadSuccess ||
                  !checkInCollection(
                    [
                      flowCaseStatusCollection.submitApproval,
                      flowCaseStatusCollection.inApprovalProcess,
                    ],
                    status,
                  ),
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCaseProcessHistory.refuse
                    .permission,
                ),
                handleClick: () => {
                  this.showRefuseModal();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.undo(),
                text: '撤销审批',
                disabled:
                  !firstLoadSuccess ||
                  !checkInCollection(
                    [
                      flowCaseStatusCollection.submitApproval,
                      flowCaseStatusCollection.inApprovalProcess,
                    ],
                    status,
                  ) ||
                  cancelApproveSwitch === whetherNumber.no,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCaseProcessHistory
                    .cancelApprove.permission,
                ),
                handleClick: () => {
                  this.cancelApprove(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.stop(),
                text: '强制结束',
                disabled:
                  !firstLoadSuccess ||
                  !checkInCollection(
                    [
                      flowCaseStatusCollection.submitApproval,
                      flowCaseStatusCollection.inApprovalProcess,
                    ],
                    status,
                  ),
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCaseProcessHistory.refuse
                    .permission,
                ),
                confirm: true,
                title: '将要强制结束审批（即该次审批作废），确定吗？',
                handleClick: () => {
                  this.forceEnd(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.clear(),
                text: '重置审批',
                disabled:
                  !firstLoadSuccess ||
                  resetAllApproveSwitch === whetherNumber.no,
                hidden:
                  !firstLoadSuccess ||
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCaseProcessHistory
                      .resetAllApprove.permission,
                  ),
                handleClick: () => {
                  this.resetAllApprove(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.dropdownEllipsis,
                disabled: !firstLoadSuccess,
                handleMenuClick: ({ key, handleData }) => {
                  switch (key) {
                    case 'showWorkflowNodeDetailDrawer': {
                      this.showWorkflowNodeDetailDrawer(handleData);
                      break;
                    }

                    case 'showWorkflowDebugCaseNextProcessProgressPreviewDrawer': {
                      this.showWorkflowDebugCaseNextProcessProgressPreviewDrawer(
                        handleData,
                      );
                      break;
                    }

                    case 'showWorkflowDebugCasePageListLatestApproveDrawer': {
                      this.showWorkflowDebugCasePageListLatestApproveDrawer(
                        handleData,
                      );
                      break;
                    }

                    case 'showWorkflowDebugCasePageListWaitApproveDrawer': {
                      this.showWorkflowDebugCasePageListWaitApproveDrawer(
                        handleData,
                      );
                      break;
                    }

                    case 'showWorkflowDebugCaseProcessHistoryPageListDrawer': {
                      this.showWorkflowDebugCaseProcessHistoryPageListDrawer(
                        handleData,
                      );
                      break;
                    }

                    default: {
                      showSimpleErrorMessage('can not find matched key');
                      break;
                    }
                  }
                },
                handleData: metaData,
                items: [
                  {
                    key: 'showWorkflowNodeDetailDrawer',
                    icon: iconBuilder.read(),
                    text: '下次审批节点信息',
                    disabled:
                      !firstLoadSuccess ||
                      isNull(nextApproveWorkflowNode) ||
                      isEmptyObject(nextApproveWorkflowNode),
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowNode.get.permission,
                    ),
                  },
                  {
                    key: 'showWorkflowDebugCaseNextProcessProgressPreviewDrawer',
                    icon: iconBuilder.read(),
                    text: '下次审批流转信息',
                    disabled:
                      !firstLoadSuccess ||
                      isNull(nextApproveWorkflowNode) ||
                      isEmptyObject(nextApproveWorkflowNode),
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowNode.get.permission,
                    ),
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'showWorkflowDebugCasePageListLatestApproveDrawer',
                    icon: iconBuilder.unorderedList(),
                    text: '已审批实例',
                    disabled: !firstLoadSuccess,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase
                        .pageListLatestApprove.permission,
                    ),
                  },
                  {
                    key: 'showWorkflowDebugCasePageListWaitApproveDrawer',
                    icon: iconBuilder.unorderedList(),
                    text: '待审批实例',
                    disabled: !firstLoadSuccess,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCase.pageListWaitApprove
                        .permission,
                    ),
                  },
                  {
                    type: dropdownExpandItemType.divider,
                  },
                  {
                    key: 'showWorkflowDebugCaseProcessHistoryPageListDrawer',
                    icon: iconBuilder.unorderedList(),
                    text: '审批记录',
                    disabled: !firstLoadSuccess,
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowDebugCaseProcessHistory
                        .pageList.permission,
                    ),
                  },
                ],
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程图示、当前审批节点与审批进度',
          },
          fullLine: false,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '630px' }}>
                  <Flow
                    canEdit={false}
                    nodeNameKey={fieldDataWorkflowNode.name.name}
                    listInLineKey={fieldDataWorkflowNode.listInLine.name}
                    listOutLineKey={fieldDataWorkflowNode.listOutLine.name}
                    listApproverKey={fieldDataWorkflowNode.listApprover.name}
                    approverNameKey={
                      fieldDataWorkflowNodeApprover.approverName.name
                    }
                    approverNameLabel={
                      fieldDataWorkflowNodeApprover.approverName.label
                    }
                    nodes={[...(isArray(nodeList) ? nodeList : [])]}
                    edges={[...(isArray(edgeList) ? edgeList : [])]}
                  />
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '审批进度',
          },
          fullLine: false,
          width: '320px',
          // 内置 card 变更为 flex 布局，即 card body 占满剩余宽度, 仅在 fullLine 为 false 下生效
          flexVertical: true,
          otherComponent: (
            <FlowProcessHistory
              list={[
                ...(isArray(listProcessHistory) ? listProcessHistory : []),
              ]}
              listItemConvert={convertProcessHistoryItemData}
              nextData={nextApproveWorkflowNode}
              nextDataConvert={convertProcessHistoryNextData}
            />
          ),
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '审批人最后操作列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={buildColumnsCaseLatestApprove({
                      flowCaseLatestApproveIdLabel:
                        fieldDataWorkflowDebugCaseLatestApprove
                          .workflowDebugCaseLatestApproveId.label,
                      flowCaseLatestApproveIdName:
                        fieldDataWorkflowDebugCaseLatestApprove
                          .workflowDebugCaseLatestApproveId.name,
                    })}
                    size="small"
                    dataSource={listLatestApprove}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </div>
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '下一审批预告列表',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '每次审批都会更新此处内容, 重置审批将清空',
                textStyle: {
                  color: '#666',
                },
                iconStyle: {
                  color: '#666',
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={buildColumnsNextProcessApprove({
                      flowCaseNextProcessApproveIdLabel:
                        fieldDataWorkflowDebugCaseNextProcessApprove
                          .workflowDebugCaseNextProcessApproveId.label,
                      flowCaseNextProcessApproveIdName:
                        fieldDataWorkflowDebugCaseNextProcessApprove
                          .workflowDebugCaseNextProcessApproveId.name,
                    })}
                    size="small"
                    dataSource={listNextProcessApprove}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </div>
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '审批通知发送列表',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '此处为每次审批之后触发的通知, 重置审批将清空',
                textStyle: {
                  color: '#666',
                },
                iconStyle: {
                  color: '#666',
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={buildColumnsNextProcessNotification({
                      flowCaseNextProcessNotificationIdLabel:
                        fieldDataWorkflowDebugCaseNextProcessNotification
                          .workflowDebugCaseNextProcessNotificationId.label,
                      flowCaseNextProcessNotificationIdName:
                        fieldDataWorkflowDebugCaseNextProcessNotification
                          .workflowDebugCaseNextProcessNotificationId.name,
                      operationBuilder: (v, o) => {
                        return buildDropdown({
                          size: 'small',
                          text: '查看',
                          icon: iconBuilder.read(),
                          disabled: !checkHasAuthority(
                            accessWayCollection.workflow.get.permission,
                          ),
                          handleButtonClick: ({ handleData }) => {
                            this.showWorkflowDebugCaseNextProcessNotificationPreviewDrawer(
                              handleData,
                            );
                          },
                          handleData: o,
                          handleMenuClick: ({ key, handleData }) => {
                            switch (key) {
                              case 'sendNextProcessNotification': {
                                this.sendNextProcessNotification(handleData);
                                break;
                              }

                              case 'refreshCache': {
                                this.refreshNextProcessNotificationCache(
                                  handleData,
                                );
                                break;
                              }

                              default: {
                                showSimpleErrorMessage(
                                  'can not find matched key',
                                );
                                break;
                              }
                            }
                          },
                          items: [
                            {
                              key: 'sendNextProcessNotification',
                              icon: iconBuilder.message(),
                              text: '发送短信通知',
                            },
                            {
                              type: dropdownExpandItemType.divider,
                            },
                            {
                              key: 'refreshNextProcessNotificationCache',
                              icon: iconBuilder.reload(),
                              text: '刷新缓存',
                              confirm: true,
                              title: '将要刷新缓存，确定吗？',
                            },
                          ],
                        });
                      },
                    })}
                    size="small"
                    dataSource={listNextProcessNotification}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </div>
              ),
            },
          ],
          instruction: {
            title: '通知说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '一般通知的文本将基于配置的模板生成, 如未配置模板, 显示的通知内容可能未符合预期.',
              },
              {
                text: '短信通知的文本将基于短信类别中的模板生成, 如未配置模板, 显示的通知内容可能未符合预期.',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '抄送通知发送列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={buildColumnsCarbonCopyNotification({
                      flowCasCarbonCopyNotificationIdLabel:
                        fieldDataWorkflowDebugCaseCarbonCopyNotification
                          .workflowDebugCaseCarbonCopyNotificationId.label,
                      flowCaseCarbonCopyNotificationIdName:
                        fieldDataWorkflowDebugCaseCarbonCopyNotification
                          .workflowDebugCaseCarbonCopyNotificationId.name,
                    })}
                    size="small"
                    dataSource={listCarbonCopyNotification}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </div>
              ),
            },
          ],
          instruction: {
            title: '通知说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '抄送通知的文本将基于配置的模板生成',
              },
            ],
          },
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '调试审批进度将统一使用测试用户进行操作。',
        },
        {
          text: '审批人调试为 “测试账户”的时候, 与正式审批存在一定差异, 主要在于审批人相关部分, 流程调试主要排除除审批人之外的流程配置问题。',
        },
        {
          text: '审批人调试为 “流程配置”的时候, 将最大程度模拟审批。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { metaData, listApprove, currentNextProcessNotification } =
      this.state;

    const { nextApproveWorkflowNode } = {
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const workflowDebugCaseId = getValueByKey({
      data: metaData,
      key: fieldData.workflowDebugCaseId.name,
      convert: convertCollection.string,
    });

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldData.qRCodeImage.name,
      convert: convertCollection.string,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
    });

    const archiveUrl = getValueByKey({
      data: metaData,
      key: fieldData.archiveUrl.name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    return (
      <>
        <UpdateBasicInfoDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateBasicInfoDrawerOk();
          }}
        />

        <PassModal
          externalData={metaData}
          afterOK={() => {
            this.afterPassModalOK();
          }}
        />

        <RefuseModal
          externalData={metaData}
          afterOK={() => {
            this.afterRefuseModalOK();
          }}
        />

        <FormDrawer
          maskClosable
          externalData={metaData}
          afterOK={() => {
            this.afterFormDrawerOk();
          }}
        />

        <DataSchemaDrawer maskClosable externalData={metaData} />

        <ProcessChainDrawer maskClosable externalData={metaData} />

        <WorkflowNodeDetailDrawer
          maskClosable
          externalData={nextApproveWorkflowNode}
        />

        <WorkflowDebugCaseProcessHistoryPageListDrawer
          maskClosable
          externalData={{
            flowCaseId: getValueByKey({
              data: metaData,
              key: fieldData.workflowDebugCaseId.name,
              defaultValue: '',
            }),
          }}
        />

        <WorkflowDebugCasePageListWaitApproveDrawer
          maskClosable
          externalData={metaData}
        />

        <WorkflowDebugCasePageListLatestApproveDrawer
          maskClosable
          externalData={metaData}
        />

        <WorkflowDebugCaseNextProcessProgressPreviewDrawer
          maskClosable
          externalData={{
            flowCaseId: getValueByKey({
              data: metaData,
              key: fieldData.workflowDebugCaseId.name,
              defaultValue: '',
            }),
          }}
        />

        <WorkflowDebugCaseNextProcessNotificationPreviewDrawer
          maskClosable
          externalData={currentNextProcessNotification}
        />

        <SetApplicantStatementDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterSetApplicantStatementDrawerOk();
          }}
        />

        <SetAttentionUserDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterSetAttentionUserDrawerOk();
          }}
        />

        <SetAttentionStatementDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterSetAttentionStatementDrawerOk();
          }}
        />

        <UpdateDebugApproverModeModal
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateDebugApproverModeModalOK();
          }}
        />

        <UpdateDebugUserModeModal
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateDebugUserModeModalOK();
          }}
        />

        <UpdateDebugUserDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateDebugUserDrawerOK();
          }}
        />

        <PageListSubsidiarySelectActionDrawer
          afterSelect={(selectData) => {
            this.setSubsidiaryId(selectData);
          }}
        />

        <FlowDebugCaseFormDocumentDrawer
          maskClosable
          canDesign={false}
          externalData={{
            workflowId: getValueByKey({
              data: metaData,
              key: fieldData.workflowId.name,
              defaultValue: '',
            }),
          }}
          values={listFormStorage}
          showApply={showApply}
          applyList={listApply}
          showAttention={showAttention}
          attentionList={listAttention}
          approveList={listApprove}
          qRCodeImage={qRCodeImage}
          serialNumberContent={workflowDebugCaseId}
        />

        <FilePreviewDrawer url={archiveUrl} suffix="pdf" maskClosable />
      </>
    );
  };
}

export default DebugCaseInfo;
