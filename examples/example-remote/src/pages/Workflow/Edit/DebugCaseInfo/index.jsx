import { Table } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyObject,
  isNull,
  toLowerFirst,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  adjustEdge,
  adjustNode,
  Flow,
  FlowProcessHistory,
} from 'antd-management-fast-flow';

import {
  accessWayCollection,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
  flowLineTypeCollection,
  flowNodeTypeCollection,
} from '../../../../customConfig';
import { getChannelName } from '../../../../customSpecialComponents';
import {
  closeCancelApproveSwitchAction,
  closeResetAllApproveSwitchAction,
  openCancelApproveSwitchAction,
  openResetAllApproveSwitchAction,
  submitApprovalAction,
} from '../../../WorkflowDebugCase/Assist/action';
import { fieldData } from '../../../WorkflowDebugCase/Common/data';
import { WorkflowDebugCasePageListLatestApprove } from '../../../WorkflowDebugCase/PageListLatestApprove';
import { WorkflowDebugCasePageListWaitApprove } from '../../../WorkflowDebugCase/PageListWaitApprove';
import { UpdateBasicInfoDrawer } from '../../../WorkflowDebugCase/UpdateBasicInfoDrawer';
import { FormDrawer } from '../../../WorkflowDebugCaseFormStorage/FormDrawer';
import { fieldData as fieldDataWorkflowDebugCaseLatestApprove } from '../../../WorkflowDebugCaseLatestApprove/Common/data';
import { fieldData as fieldDataWorkflowDebugCaseNextProcessNotification } from '../../../WorkflowDebugCaseNextProcessNotification/Common/data';
import {
  cancelApproveAction,
  passAction,
  refuseAction,
  resetAllApproveAction,
} from '../../../WorkflowDebugCaseProcessHistory/Assist/action';
import { fieldData as fieldDataWorkflowDebugCaseProcessHistory } from '../../../WorkflowDebugCaseProcessHistory/Common/data';
import { WorkflowDebugCaseProcessHistoryPageListDrawer } from '../../../WorkflowDebugCaseProcessHistory/PageListDrawer';
import { FlowCaseFormDocumentDrawer } from '../../../WorkflowFormDesign/FlowCaseFormDocumentDrawer';
import { fieldData as fieldDataWorkflowLine } from '../../../WorkflowLine/Common/data';
import { fieldData as fieldDataWorkflowNode } from '../../../WorkflowNode/Common/data';
import { WorkflowNodeDetailDrawer } from '../../../WorkflowNode/DetailDrawer';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../../WorkflowNodeApprover/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData as fieldDataWorkflow } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

const columnsNextProcessNotification = [
  {
    title:
      fieldDataWorkflowDebugCaseNextProcessNotification.nextWorkflowNodeName
        .label,
    dataIndex:
      fieldDataWorkflowDebugCaseNextProcessNotification.nextWorkflowNodeName
        .name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification.nextWorkflowNodeName
      .name,
    width: '200px',
  },
  {
    title: fieldDataWorkflowDebugCaseNextProcessNotification.content.label,
    dataIndex: fieldDataWorkflowDebugCaseNextProcessNotification.content.name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification.content.name,
    ellipsis: true,
  },
  {
    title:
      fieldDataWorkflowDebugCaseNextProcessNotification.nextApproveUserRealName
        .label,
    dataIndex:
      fieldDataWorkflowDebugCaseNextProcessNotification.nextApproveUserRealName
        .name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification
      .nextApproveUserRealName.name,
    align: 'center',
    ellipsis: true,
    width: '120px',
  },
  {
    title:
      fieldDataWorkflowDebugCaseNextProcessNotification.whetherSendNote.label,
    dataIndex:
      fieldDataWorkflowDebugCaseNextProcessNotification.whetherSendNote.name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification.whetherSendNote.name,
    align: 'center',
    ellipsis: true,
    width: '100px',
  },
  {
    title: fieldDataWorkflowDebugCaseNextProcessNotification.channel.label,
    dataIndex: fieldDataWorkflowDebugCaseNextProcessNotification.channel.name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification.channel.name,
    align: 'center',
    ellipsis: true,
    width: '120px',
    render: (text) => {
      return getChannelName({
        value: text,
      });
    },
  },
  {
    title:
      fieldDataWorkflowDebugCaseNextProcessNotification
        .workflowDebugCaseNextProcessNotificationId.label,
    dataIndex:
      fieldDataWorkflowDebugCaseNextProcessNotification
        .workflowDebugCaseNextProcessNotificationId.name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification
      .workflowDebugCaseNextProcessNotificationId.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
  {
    title: fieldDataWorkflowDebugCaseNextProcessNotification.createTime.label,
    dataIndex:
      fieldDataWorkflowDebugCaseNextProcessNotification.createTime.name,
    key: fieldDataWorkflowDebugCaseNextProcessNotification.createTime.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
];

const columnsCaseLatestApprove = [
  {
    title: fieldDataWorkflowDebugCaseLatestApprove.workflowNodeName.label,
    dataIndex: fieldDataWorkflowDebugCaseLatestApprove.workflowNodeName.name,
    key: fieldDataWorkflowDebugCaseLatestApprove.workflowNodeName.name,
  },
  {
    title: fieldDataWorkflowDebugCaseLatestApprove.approveActionNote.label,
    dataIndex: fieldDataWorkflowDebugCaseLatestApprove.approveActionNote.name,
    key: fieldDataWorkflowDebugCaseLatestApprove.approveActionNote.name,
    ellipsis: true,
    align: 'center',
    width: '140px',
  },
  {
    title: fieldDataWorkflowDebugCaseLatestApprove.approveUserRealName.label,
    dataIndex: fieldDataWorkflowDebugCaseLatestApprove.approveUserRealName.name,
    key: fieldDataWorkflowDebugCaseLatestApprove.approveUserRealName.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
  {
    title: fieldDataWorkflowDebugCaseLatestApprove.channel.label,
    dataIndex: fieldDataWorkflowDebugCaseLatestApprove.channel.name,
    key: fieldDataWorkflowDebugCaseLatestApprove.channel.name,
    align: 'center',
    ellipsis: true,
    width: '120px',
    render: (text) => {
      return getChannelName({
        value: text,
      });
    },
  },
  {
    title:
      fieldDataWorkflowDebugCaseLatestApprove.workflowDebugCaseLatestApproveId
        .label,
    dataIndex:
      fieldDataWorkflowDebugCaseLatestApprove.workflowDebugCaseLatestApproveId
        .name,
    key: fieldDataWorkflowDebugCaseLatestApprove
      .workflowDebugCaseLatestApproveId.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
  {
    title: fieldDataWorkflowDebugCaseLatestApprove.updateTime.label,
    dataIndex: fieldDataWorkflowDebugCaseLatestApprove.updateTime.name,
    key: fieldDataWorkflowDebugCaseLatestApprove.updateTime.name,
    align: 'center',
    ellipsis: true,
    width: '160px',
  },
];

function processHistoryItemDataConvert(o) {
  const approveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.approveWorkflowNodeName.name,
  });

  const approveWorkflowNodeType = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.approveWorkflowNodeType.name,
    convert: convertCollection.number,
  });

  const approveActionNote = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.approveActionNote.name,
  });

  const approveActionMode = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.approveActionMode.name,
  });

  const note = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.note.name,
  });

  const approveUserName = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.approveUserName.name,
  });

  const time = getValueByKey({
    data: o,
    key: fieldDataWorkflowDebugCaseProcessHistory.createTime.name,
  });

  if (approveWorkflowNodeType === flowNodeTypeCollection.intermediateNode) {
    return {
      ...o,
      title: approveWorkflowNodeName,
      result: approveActionNote,
      note,
      operatorName: `${approveUserName} 【调试模式】`,
      time,
    };
  }

  return {
    ...o,
    title: approveWorkflowNodeName,
    result: '',
    note: '',
    operatorName: '',
    time: '',
    compact: approveActionMode === flowApproveActionModeCollection.autoControl,
  };
}

function processHistoryNextDataConvert(o) {
  if (o == null || isEmptyObject(o)) {
    return null;
  }

  const nextApproveWorkflowNodeName = getValueByKey({
    data: o,
    key: fieldDataWorkflowNode.name.name,
  });

  return {
    ...o,
    titlePrefix: '待审批节点',
    title: nextApproveWorkflowNodeName,
    icon: iconBuilder.clock(),
    color: 'blue',
    result: '',
    note: '',
    operatorName: '',
    time: '',
  };
}

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
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const {
      workflow,
      nextApproveWorkflowNodeId,
      listProcessHistory: listProcessHistorySource,
    } = {
      workflow: {
        workflowNodeList: [],
        workflowLineList: [],
      },
      listProcessHistory: [],
      nextApproveWorkflowNodeId: '',
      ...metaData,
    };

    const workflowNodeList = getValueByKey({
      data: workflow,
      key: fieldDataWorkflow.workflowNodeList.name,
      convert: convertCollection.array,
    });

    const workflowLineList = getValueByKey({
      data: workflow,
      key: fieldDataWorkflow.workflowLineList.name,
      convert: convertCollection.array,
    });

    const nodeList = (isArray(workflowNodeList) ? workflowNodeList : []).map(
      (o) => {
        const workflowNodeId = getValueByKey({
          data: o,
          key: fieldDataWorkflowNode.workflowNodeId.name,
        });

        const type = getValueByKey({
          data: o,
          key: fieldDataWorkflowNode.type.name,
          convert: convertCollection.number,
        });

        let nodeType = 'intermediate';

        switch (type) {
          case flowNodeTypeCollection.startNode: {
            nodeType = 'start';
            break;
          }

          case flowNodeTypeCollection.endNode: {
            nodeType = 'end';
            break;
          }

          case flowNodeTypeCollection.intermediateNode: {
            nodeType = 'intermediate';
            break;
          }

          default: {
            nodeType = 'intermediate';
          }
        }

        const { viewConfig } = {
          viewConfig: {
            position: {
              x: 0,
              y: 0,
            },
          },
          ...o,
        };

        const result = adjustNode({
          id: workflowNodeId,
          type: nodeType,
          ...viewConfig,
          data: {
            data: o,
            isNext: nextApproveWorkflowNodeId === workflowNodeId,
          },
        });

        return result;
      },
    );

    const edgeList = (isArray(workflowLineList) ? workflowLineList : []).map(
      (o, index) => {
        const workflowLineId = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.workflowLineId.name,
        });

        const fromId = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.fromId.name,
        });

        const fromPositionName = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.fromPositionName.name,
          convertBuilder: (v) => {
            return toLowerFirst(v);
          },
        });

        const toId = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.toId.name,
        });

        const toPositionName = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.toPositionName.name,
          convertBuilder: (v) => {
            return toLowerFirst(v);
          },
        });

        const type = getValueByKey({
          data: o,
          key: fieldDataWorkflowLine.type.name,
          convert: convertCollection.number,
        });

        const positionList = ['top', 'left', 'bottom', 'right'];

        return adjustEdge({
          index,
          id: workflowLineId,
          forward: type === flowLineTypeCollection.forward,
          source: fromId,
          sourceHandle: checkInCollection(positionList, fromPositionName)
            ? fromPositionName
            : 'bottom',
          target: toId,
          targetHandle: checkInCollection(positionList, toPositionName)
            ? toPositionName
            : 'top',
          data: {
            data: o,
          },
        });
      },
    );

    this.setState({
      nodeList: [...nodeList],
      edgeList: [...edgeList],
      listProcessHistory: listProcessHistorySource,
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

  pass = (o) => {
    passAction({
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

  refuse = (o) => {
    refuseAction({
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

  showUpdateBasicInfoDrawer = () => {
    UpdateBasicInfoDrawer.open();
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.reloadData({});
  };

  showFormDrawer = () => {
    FormDrawer.open();
  };

  afterFormDrawerOk = () => {
    this.reloadData({});
  };

  showWorkflowNodeDetailDrawer = () => {
    WorkflowNodeDetailDrawer.open();
  };

  showWorkflowDebugCaseProcessHistoryPageListDrawer = () => {
    WorkflowDebugCaseProcessHistoryPageListDrawer.open();
  };

  showWorkflowDebugCasePageListWaitApproveDrawer = () => {
    WorkflowDebugCasePageListWaitApprove.open();
  };

  showWorkflowDebugCasePageListLatestApproveDrawer = () => {
    WorkflowDebugCasePageListLatestApprove.open();
  };

  showFlowCaseFormDocumentDrawer = () => {
    FlowCaseFormDocumentDrawer.open();
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
      listLatestApprove,
    } = {
      latestApproveWorkflowNodeType: 0,
      nextApproveWorkflowNode: null,
      listNextProcessNotification: [],
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

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

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
                  this.showUpdateBasicInfoDrawer();
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
                  this.showFormDrawer();
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
                  this.openCancelApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.disable(),
                text: '关闭撤销审批功能',
                disabled: !firstLoadSuccess,
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase
                      .closeCancelApproveSwitch.permission,
                  ) || cancelApproveSwitch === whetherNumber.no,
                handleClick: () => {
                  this.closeCancelApproveSwitch(metaData);
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
                  this.openResetAllApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.disable(),
                text: '关闭重置审批功能',
                disabled: !firstLoadSuccess,
                hidden:
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase
                      .closeResetAllApproveSwitch.permission,
                  ) || resetAllApproveSwitch === whetherNumber.no,
                handleClick: () => {
                  this.closeResetAllApproveSwitch(metaData);
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'default',
                icon: iconBuilder.read(),
                text: '表单打印',
                disabled:
                  !firstLoadSuccess ||
                  !checkHasAuthority(
                    accessWayCollection.workflowDebugCase.get.permission,
                  ),
                handleClick: () => {
                  this.showFlowCaseFormDocumentDrawer();
                },
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
                  span: 3,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.channel.label,
                  value: getChannelName({
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.channel.name,
                    }),
                    defaultValue: '暂无',
                  }),
                },
                {
                  span: 2,
                  label: fieldData.userRealName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.userRealName.name,
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
                  label: fieldDataWorkflowNode.name.label,
                  value: getValueByKey({
                    data: nextApproveWorkflowNode,
                    key: fieldDataWorkflowNode.name.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.flowDebugUserRealName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.flowDebugUserRealName.name,
                  }),
                },
                {
                  span: 1,
                  label: fieldData.flowDebugUserId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.flowDebugUserId.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 4,
                labelStyle: {
                  width: '120px',
                },
                emptyValue: '暂无',
                emptyStyle: {
                  color: '#ccc',
                },
              },
            },
          ],
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
                  this.pass(metaData);
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
                  this.refuse(metaData);
                },
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
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'dashed',
                icon: iconBuilder.read(),
                text: '下次审批信息',
                disabled:
                  !firstLoadSuccess ||
                  isNull(nextApproveWorkflowNode) ||
                  isEmptyObject(nextApproveWorkflowNode),
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowNode.get.permission,
                ),
                handleClick: () => {
                  this.showWorkflowNodeDetailDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'dashed',
                icon: iconBuilder.unorderedList(),
                text: '已审批实例',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCase.pageListLatestApprove
                    .permission,
                ),
                handleClick: () => {
                  this.showWorkflowDebugCasePageListLatestApproveDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'dashed',
                icon: iconBuilder.unorderedList(),
                text: '待审批实例',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCase.pageListWaitApprove
                    .permission,
                ),
                handleClick: () => {
                  this.showWorkflowDebugCasePageListWaitApproveDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                type: 'dashed',
                icon: iconBuilder.unorderedList(),
                text: '审批记录',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowDebugCaseProcessHistory.pageList
                    .permission,
                ),
                handleClick: () => {
                  this.showWorkflowDebugCaseProcessHistoryPageListDrawer();
                },
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
                    personnelNameKey={
                      fieldDataWorkflowNodeApprover.userRealName.name
                    }
                    personnelNameLabel={
                      fieldDataWorkflowNodeApprover.userRealName.label
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
              listItemConvert={processHistoryItemDataConvert}
              nextData={nextApproveWorkflowNode}
              nextDataConvert={processHistoryNextDataConvert}
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
                    columns={columnsCaseLatestApprove}
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
            text: '审批通知发送列表',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Table
                    columns={columnsNextProcessNotification}
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
      ],
    };
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    const { nextApproveWorkflowNode } = {
      nextApproveWorkflowNode: null,
      ...metaData,
    };

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldData.listFormStorage.name,
      convert: convertCollection.array,
    });

    return (
      <>
        <UpdateBasicInfoDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterUpdateBasicInfoDrawerOk();
          }}
        />

        <FormDrawer
          maskClosable
          externalData={metaData}
          afterOK={() => {
            this.afterFormDrawerOk();
          }}
        />

        <WorkflowNodeDetailDrawer
          maskClosable
          externalData={nextApproveWorkflowNode}
        />

        <WorkflowDebugCaseProcessHistoryPageListDrawer
          maskClosable
          externalData={metaData}
        />

        <WorkflowDebugCasePageListWaitApprove
          maskClosable
          externalData={metaData}
        />

        <WorkflowDebugCasePageListLatestApprove
          maskClosable
          externalData={metaData}
        />

        <FlowCaseFormDocumentDrawer
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
        />
      </>
    );
  };
}

export default DebugCaseInfo;
