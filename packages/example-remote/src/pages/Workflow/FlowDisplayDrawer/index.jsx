import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  getValueByKey,
  isArray,
  toLowerFirst,
} from 'easy-soft-utility';

import { adjustEdge, Flow } from 'antd-management-fast-flow';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  flowLineTypeCollection,
  flowNodeTypeCollection,
} from '../../../customConfig';
import { fieldData as fieldDataWorkflowLine } from '../../WorkflowLine/Common/data';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../WorkflowNodeApprover/Common/data';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = '447ca0455c474347ba9cef80c08bf638';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class FlowDisplayDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: '1200',
      pageTitle: '工作流图例展示',
      loadApiPath: 'workflow/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

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
          },
        });
      },
    );

    this.setState({
      nodeList: [...nodeList],
      edgeList: [...edgeList],
    });
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程示例, 仅可查看',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { nodeList, edgeList } = this.state;

    return (
      <Flow
        canEdit={false}
        nodeNameKey={fieldDataWorkflowNode.name.name}
        listInLineKey={fieldDataWorkflowNode.listInLine.name}
        listOutLineKey={fieldDataWorkflowNode.listOutLine.name}
        listApproverKey={fieldDataWorkflowNode.listApprover.name}
        personnelNameKey={fieldDataWorkflowNodeApprover.userRealName.name}
        personnelNameLabel={fieldDataWorkflowNodeApprover.userRealName.label}
        nodes={[...(isArray(nodeList) ? nodeList : [])]}
        edges={[...(isArray(edgeList) ? edgeList : [])]}
        updateViewConfig={this.updateViewConfig}
      />
    );
  };
}

FlowDisplayDrawer.defaultProps = {};

export { FlowDisplayDrawer };
