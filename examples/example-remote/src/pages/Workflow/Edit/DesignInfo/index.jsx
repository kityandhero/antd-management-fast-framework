import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  findIndex,
  getValueByKey,
  isArray,
  showSimpleErrorMessage,
  toLowerFirst,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { ColorText, iconBuilder } from 'antd-management-fast-component';
import { adjustEdge, Flow } from 'antd-management-fast-flow';

import {
  accessWayCollection,
  flowLineTypeCollection,
  flowNodeApproverModeCollection,
  flowNodeTypeCollection,
} from '../../../../customConfig';
import { getFlowNodeApproveModeName } from '../../../../customSpecialComponents';
import { BranchConditionDrawer } from '../../../WorkflowBranchCondition/BranchConditionDrawer';
import { AddLineDrawer } from '../../../WorkflowLine/AddLineDrawer';
import {
  removeAllAction as removeAllLineAction,
  removeConfirmAction as removeLineConfirmAction,
} from '../../../WorkflowLine/Assist/action';
import { BindBranchConditionModal } from '../../../WorkflowLine/BindBranchConditionModal';
import { fieldData as fieldDataWorkflowLine } from '../../../WorkflowLine/Common/data';
import { UpdateLineDrawer } from '../../../WorkflowLine/UpdateLineDrawer';
import { AddCarbonCopyPointDrawer } from '../../../WorkflowNode/AddCarbonCopyPointDrawer';
import { AddIntermediatePointDrawer } from '../../../WorkflowNode/AddIntermediatePointDrawer';
import {
  addEndPointAction,
  addStartPointAction,
  clearBackwardIdAction,
  clearForwardIdAction,
  refreshCacheAction as refreshNodeCacheAction,
  removeConfirmAction as removeNodeConfirmAction,
  updateBackwardIdAction,
  updateForwardIdAction,
  updateViewConfigAction,
} from '../../../WorkflowNode/Assist/action';
import { ChangeBackwardModal } from '../../../WorkflowNode/ChangeBackwardModal';
import { ChangeForwardModal } from '../../../WorkflowNode/ChangeForwardModal';
import { fieldData as fieldDataWorkflowNode } from '../../../WorkflowNode/Common/data';
import { UpdateBasicInfoDrawer } from '../../../WorkflowNode/UpdateBasicInfoDrawer';
import { AddWorkflowNodeApprovePositionGradeDrawer } from '../../../WorkflowNodeApprover/AddWorkflowNodeApprovePositionGradeDrawer';
import { AddWorkflowNodeApproverDrawer } from '../../../WorkflowNodeApprover/AddWorkflowNodeApproverDrawer';
import { removeConfirmAction as removeNodeApproverConfirmAction } from '../../../WorkflowNodeApprover/Assist/action';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../../WorkflowNodeApprover/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ workflow, workflowNode, schedulingControl }) => ({
  workflow,
  workflowNode,
  schedulingControl,
}))
class Index extends TabPageBase {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  reloadHeaderOnSubmitSuccess = true;

  changing = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'workflow/get',
      workflowId: null,
      currentNode: null,
      currentLine: null,
      forward: null,
      backward: null,
      startPointExist: false,
      endPointExist: false,
      nodeList: [],
      edgeList: [],
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { workflowId } = this.state;

    d.workflowId = workflowId;

    return d;
  };

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const workflowNodeList = getValueByKey({
      data: metaData,
      key: fieldData.workflowNodeList.name,
      convert: convertCollection.array,
    });

    const workflowLineList = getValueByKey({
      data: metaData,
      key: fieldData.workflowLineList.name,
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

          case flowNodeTypeCollection.carbonCopyPoint: {
            nodeType = 'carbonCopy';
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

        const result = {
          id: workflowNodeId,
          type: nodeType,
          position: { x: 0, y: 0 },
          ...viewConfig,
          data: {
            data: o,
            footerBuilder: (data) => {
              const approverMode = getValueByKey({
                data: data,
                key: fieldDataWorkflowNode.approveMode.name,
                convert: convertCollection.number,
                defaultValue: '',
              });

              const approverModeName = getFlowNodeApproveModeName({
                value: approverMode,
              });

              if (checkStringIsNullOrWhiteSpace(approverModeName)) {
                return null;
              }

              return (
                <ColorText
                  textPrefix="审批方式"
                  text={approverModeName}
                  color="#999"
                  style={{
                    fontSize: 10,
                  }}
                  textPrefixStyle={{
                    color: '#999',
                  }}
                  separator="："
                  separatorStyle={{
                    paddingLeft: '2px',
                    paddingRight: '0px',
                    color: '#999',
                  }}
                />
              );
            },
            onAddApprover: (data) => {
              const approverMode = getValueByKey({
                data: data,
                key: fieldDataWorkflowNode.approverMode.name,
                convert: convertCollection.number,
              });

              switch (approverMode) {
                case flowNodeApproverModeCollection.designated: {
                  this.showAddWorkflowNodeApproverDrawer(data);

                  return;
                }

                case flowNodeApproverModeCollection.directlyAffiliatedDepartment: {
                  this.showAddWorkflowNodeApprovePositionGradeDrawer(data);

                  return;
                }

                default: {
                  showSimpleErrorMessage('未找到匹配的审批人模式');
                }
              }
            },
            onRemoveApprover: (data) => {
              this.removeNodeApproverConfirm(data);
            },
            onChange: (data) => {
              this.showUpdateBasicInfoDrawer(data);
            },
            onChangeBranchCondition: (data) => {
              this.showBranchConditionDrawer(data);
            },
            onRemove: (data) => {
              this.removeNodeConfirm(data);
            },
          },
        };

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
          forward:
            type === flowLineTypeCollection.forward ||
            type === flowLineTypeCollection.carbonCopy,
          carbonCopy: type === flowLineTypeCollection.carbonCopy,
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
            onChange: (data) => {
              this.showUpdateLineDrawer(data);
            },
            onChangeBranchCondition: (data) => {
              this.showBindBranchConditionModal(data);
            },
            onRemove: (data) => {
              this.removeLineConfirm(data);
            },
          },
        });
      },
    );

    const startPointIndex = findIndex(
      workflowNodeList,
      (o) => o.type === flowNodeTypeCollection.startNode,
    );

    const endPointIndex = findIndex(
      workflowNodeList,
      (o) => o.type === flowNodeTypeCollection.endNode,
    );

    this.setState({
      startPointExist: startPointIndex >= 0,
      endPointExist: endPointIndex >= 0,
      nodeList: [...nodeList],
      edgeList: [...edgeList],
    });
  };

  updateViewConfig = (config, data) => {
    updateViewConfigAction({
      handleData: {
        ...config,
        workflowNodeId: getValueByKey({
          data,
          key: fieldDataWorkflowNode.workflowNodeId.name,
        }),
      },
    });
  };

  addStartPoint = () => {
    const { workflowId } = this.state;

    addStartPointAction({
      target: this,
      handleData: {
        workflowId,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  addEndPoint = () => {
    const { workflowId } = this.state;

    addEndPointAction({
      target: this,
      handleData: {
        workflowId,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  updateForwardId = (o) => {
    const { sourceNodeId: workflowNodeId, targetNodeId: forwardId } = o;

    updateForwardIdAction({
      target: this,
      handleData: {
        workflowNodeId,
        forwardId,
      },
      successCallback: ({ target, remoteData }) => {
        target.setState({ metaData: remoteData });
      },
    });
  };

  clearForwardId = (o) => {
    const { sourceNodeId: workflowNodeId } = o;

    clearForwardIdAction({
      target: this,
      handleData: {
        workflowNodeId,
      },

      successCallback: ({ target, remoteData }) => {
        target.setState({ metaData: remoteData });
      },
    });
  };

  updateBackwardId = (o) => {
    const { sourceNodeId: workflowNodeId, targetNodeId: backwardId } = o;

    updateBackwardIdAction({
      target: this,
      handleData: {
        workflowNodeId,
        backwardId,
      },
      successCallback: ({ target, remoteData }) => {
        target.setState({ metaData: remoteData });
      },
    });
  };

  clearBackwardId = (o) => {
    const { sourceNodeId: workflowNodeId } = o;

    clearBackwardIdAction({
      target: this,
      handleData: {
        workflowNodeId,
      },
      successCallback: ({ target, remoteData }) => {
        target.setState({ metaData: remoteData });
      },
    });
  };

  refreshNodeCache = (o) => {
    const { workflowNodeId } = o;

    refreshNodeCacheAction({
      target: this,
      handleData: {
        workflowNodeId,
      },
    });
  };

  removeNodeConfirm = (o) => {
    const { workflowNodeId } = o;

    removeNodeConfirmAction({
      target: this,
      handleData: {
        workflowNodeId,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeNodeApproverConfirm = (o) => {
    const { workflowNodeApproverId } = o;

    removeNodeApproverConfirmAction({
      target: this,
      handleData: {
        workflowNodeApproverId,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeLineConfirm = (o) => {
    const workflowLineId = getValueByKey({
      data: o,
      key: fieldDataWorkflowLine.workflowLineId.name,
    });

    removeLineConfirmAction({
      target: this,
      handleData: {
        workflowLineId,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  removeAllLine = (o) => {
    const workflowId = getValueByKey({
      data: o,
      key: fieldDataWorkflowLine.workflowId.name,
    });

    removeAllLineAction({
      target: this,
      handleData: {
        workflowId,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showAddIntermediatePointDrawer = () => {
    AddIntermediatePointDrawer.open();
  };

  afterAddIntermediatePointDrawerOk = () => {
    this.reloadData({});
  };

  showAddCarbonCopyPointDrawer = () => {
    AddCarbonCopyPointDrawer.open();
  };

  afterAddCarbonCopyPointDrawerOk = () => {
    this.reloadData({});
  };

  showUpdateBasicInfoDrawer = (record) => {
    this.setState(
      {
        currentNode: record,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  // eslint-disable-next-line no-unused-vars
  afterUpdateBasicInfoDrawerClose = (data) => {
    this.reloadData({});
  };

  showBranchConditionDrawer = (record) => {
    this.setState(
      {
        currentNode: record,
      },
      () => {
        BranchConditionDrawer.open();
      },
    );
  };

  afterBranchConditionDrawerClose = () => {
    this.reloadData({});
  };

  showUpdateLineDrawer = (data) => {
    this.setState(
      {
        currentLine: data,
      },
      () => {
        UpdateLineDrawer.open();
      },
    );
  };

  afterUpdateLineDrawerClose = () => {
    this.reloadData({});
  };

  showBindBranchConditionModal = (data) => {
    this.setState(
      {
        currentLine: data,
      },
      () => {
        BindBranchConditionModal.open();
      },
    );
  };

  // eslint-disable-next-line no-unused-vars
  afterBindBranchConditionModalClose = (data) => {
    this.reloadData({});
  };

  showChangeForwardModal = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        ChangeForwardModal.open();
      },
    );
  };

  afterChangeForwardModalClose = () => {
    this.reloadData({});
  };

  showChangeBackwardModal = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        ChangeBackwardModal.open();
      },
    );
  };

  afterChangeBackwardModalClose = () => {
    this.reloadData({});
  };

  showAddLineDrawer = () => {
    AddLineDrawer.open();
  };

  afterAddLineDrawerOk = () => {
    this.reloadData({});
  };

  showAddWorkflowNodeApproverDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        AddWorkflowNodeApproverDrawer.open();
      },
    );
  };

  afterAddWorkflowNodeApproverDrawerOk = () => {
    this.reloadData({});
  };

  showAddWorkflowNodeApprovePositionGradeDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        AddWorkflowNodeApprovePositionGradeDrawer.open();
      },
    );
  };

  afterAddWorkflowNodeApprovePositionGradeDrawerOk = () => {
    this.reloadData({});
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
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
      startPointExist,
      endPointExist,
      nodeList,
      edgeList,
    } = this.state;

    const whetherAllowMultiEnd = getValueByKey({
      data: metaData,
      key: fieldData.whetherAllowMultiEnd.name,
      convert: convertCollection.number,
    });

    const whetherAllowMultibranch = getValueByKey({
      data: metaData,
      key: fieldData.whetherAllowMultibranch.name,
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
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.button,
                type: 'primary',
                icon: iconBuilder.addCircle(),
                text: '新增起始点',
                disabled: !firstLoadSuccess || startPointExist,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowNode.addStartPoint.permission,
                ),
                handleClick: () => {
                  this.addStartPoint();
                },
              },
              {
                buildType: cardConfig.extraBuildType.button,
                type: 'primary',
                icon: iconBuilder.apartment(),
                text: '新增过程点',
                disabled: !firstLoadSuccess || !startPointExist,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowNode.addIntermediatePoint
                    .permission,
                ),
                handleClick: () => {
                  this.showAddIntermediatePointDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.button,
                icon: iconBuilder.deploymentUnit(),
                text: '新增抄送点',
                disabled: !firstLoadSuccess || !startPointExist,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowNode.addCarbonCopyPoint
                    .permission,
                ),
                handleClick: () => {
                  this.showAddCarbonCopyPointDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.button,
                type: 'primary',
                icon: iconBuilder.addCircle(),
                text: '新增结束点',
                disabled:
                  !firstLoadSuccess ||
                  !startPointExist ||
                  (whetherAllowMultiEnd === whetherNumber.no && endPointExist),
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowNode.addEndPoint.permission,
                ),
                handleClick: () => {
                  this.addEndPoint();
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.button,
                type: 'primary',
                icon: iconBuilder.nodeIndex(),
                text: '新增流程线',
                disabled: !firstLoadSuccess || !startPointExist,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowLine.createLine.permission,
                ),
                handleClick: () => {
                  this.showAddLineDrawer();
                },
              },
              {
                buildType: cardConfig.extraBuildType.button,
                type: 'default',
                danger: true,
                icon: iconBuilder.delete(),
                text: '清空流程线',
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.workflowLine.removeAll.permission,
                ),
                handleClick: () => {
                  this.removeAllLine(metaData);
                },
                confirm: true,
                title: '确定要清空全部流程线吗？',
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
              type: cardConfig.contentItemType.component,
              component: (
                <>
                  <div style={{ height: '730px' }}>
                    <Flow
                      canEdit
                      multibranch={
                        whetherAllowMultibranch === whetherNumber.yes
                      }
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
                      updateViewConfig={this.updateViewConfig}
                    />
                  </div>
                </>
              ),
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const {
      metaData,
      workflowId,
      forward,
      currentNode,
      currentRecord,
      currentLine,
    } = this.state;

    const workflowNodeList = getValueByKey({
      data: metaData,
      key: fieldData.workflowNodeList.name,
      convert: convertCollection.array,
    });

    return (
      <>
        <AddIntermediatePointDrawer
          externalData={{ workflowId }}
          forward={forward}
          afterOK={() => {
            this.afterAddIntermediatePointDrawerOk();
          }}
        />

        <AddCarbonCopyPointDrawer
          externalData={{ workflowId }}
          forward={forward}
          afterOK={() => {
            this.afterAddCarbonCopyPointDrawerOk();
          }}
        />

        <UpdateBasicInfoDrawer
          externalData={currentNode}
          afterClose={() => {
            this.afterUpdateBasicInfoDrawerClose();
          }}
        />

        <BranchConditionDrawer
          externalData={currentNode}
          afterClose={() => {
            this.afterBranchConditionDrawerClose();
          }}
        />

        <AddLineDrawer
          externalData={metaData}
          afterOK={() => {
            this.afterAddLineDrawerOk();
          }}
        />

        <UpdateLineDrawer
          externalData={currentLine}
          afterClose={() => {
            this.afterUpdateLineDrawerClose();
          }}
        />

        <BindBranchConditionModal
          externalData={currentLine}
          afterClose={() => {
            this.afterBindBranchConditionModalClose();
          }}
        />

        <ChangeForwardModal
          workflowNodeList={workflowNodeList}
          externalData={currentRecord}
          afterClose={() => {
            this.afterChangeForwardModalClose();
          }}
        />

        <ChangeBackwardModal
          workflowNodeList={workflowNodeList}
          externalData={currentRecord}
          afterClose={() => {
            this.afterChangeBackwardModalClose();
          }}
        />

        <AddWorkflowNodeApproverDrawer
          externalData={currentRecord}
          afterClose={() => {
            this.afterAddWorkflowNodeApproverDrawerOk();
          }}
        />

        <AddWorkflowNodeApprovePositionGradeDrawer
          externalData={currentRecord}
          afterClose={() => {
            this.afterAddWorkflowNodeApprovePositionGradeDrawerOk();
          }}
        />
      </>
    );
  };
}

export default Index;
