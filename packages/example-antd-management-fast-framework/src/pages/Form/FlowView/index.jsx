import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  getValueByKey,
  isArray,
  mergeArrowText,
  showSimpleInfoMessage,
  toLowerFirst,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';
import { adjustEdge, adjustNode, Flow } from 'antd-management-fast-flow';

import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeFlowView } from './codeSource';

const workflowNodeList = [
  {
    workflowId: '1718837194992521216',
    name: '起始点 - 1718937226831859712',
    description: '流程起始节点',
    viewConfigData:
      '{"position":{"x":-282.37469290539946,"y":-157.68119533736086}}',
    type: 10,
    workflowNodeId: '1718937226831859712',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-30 18:25:45',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 15:19:34',
    key: '1718937226831859712',
    workflowName: '范围内审批流程001',
    statusNote: '正常',
    typeNote: '起始点',
    listApprover: [],
    viewConfig: {
      position: {
        x: -282.374_692_905_399_46,
        y: -157.681_195_337_360_86,
      },
    },
  },
  {
    workflowId: '1718837194992521216',
    name: '终止点 - 1719252735666294784',
    description: '流程终止节点',
    viewConfigData:
      '{"position":{"x":-264.2500484249164,"y":148.6614230553077}}',
    type: 30,
    workflowNodeId: '1719252735666294784',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-31 15:19:29',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 15:19:33',
    key: '1719252735666294784',
    workflowName: '范围内审批流程001',
    statusNote: '正常',
    typeNote: '终止点',
    listApprover: [],
    viewConfig: {
      position: {
        x: -264.250_048_424_916_37,
        y: 148.661_423_055_307_69,
      },
    },
  },
];

let workflowLineList = [
  {
    workflowId: '1718837194992521216',
    title: '',
    fromId: '1718937226831859712',
    fromPosition: 400,
    toId: '1719252735666294784',
    toPosition: 100,
    type: 100,
    description: '',
    workflowLineId: '1719252862103588864',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-31 15:19:59',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 15:19:59',
    key: '1719252862103588864',
    workflowName: '范围内审批流程001',
    fromPositionName: 'Bottom',
    fromPositionNote: '下部',
    toPositionName: 'Top',
    toPositionNote: '上部',
    typeNote: '前进',
    statusNote: '正常',
    fromName: '起始点',
    toName: '终止点',
  },
];

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

const nodeList = (isArray(workflowNodeList) ? workflowNodeList : []).map(
  (o) => {
    const workflowNodeId = getValueByKey({
      data: o,
      key: 'workflowNodeId',
    });

    const type = getValueByKey({
      data: o,
      key: 'type',
      convert: convertCollection.number,
    });

    let nodeType = 'intermediate';

    switch (type) {
      case 10: {
        nodeType = 'start';
        break;
      }

      case 30: {
        nodeType = 'end';
        break;
      }

      case 20: {
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
        isNext: '' === workflowNodeId,
      },
    });

    return result;
  },
);

const edgeList = (isArray(workflowLineList) ? workflowLineList : []).map(
  (o, index) => {
    const workflowLineId = getValueByKey({
      data: o,
      key: 'workflowLineId',
    });

    const fromId = getValueByKey({
      data: o,
      key: 'fromId',
    });

    const fromPositionName = getValueByKey({
      data: o,
      key: 'fromPositionName',
      convertBuilder: (v) => {
        return toLowerFirst(v);
      },
    });

    const toId = getValueByKey({
      data: o,
      key: 'toId',
    });

    const toPositionName = getValueByKey({
      data: o,
      key: 'toPositionName',
      convertBuilder: (v) => {
        return toLowerFirst(v);
      },
    });

    const type = getValueByKey({
      data: o,
      key: 'name',
      convert: convertCollection.number,
    });

    const positionList = ['top', 'left', 'bottom', 'right'];

    return adjustEdge({
      index,
      id: workflowLineId,
      forward: type === 100,
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

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class RadioView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Flow 示例',
      currentCodeTitle: 'FlowView',
      currentCode: codeFlowView,
    };
  }

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '630px' }}>
                  <Flow
                    canEdit={true}
                    nodeNameKey={'name'}
                    // listApproverKey={fieldDataWorkflowNode.listApprover.name}
                    // personnelNameKey={
                    //   fieldDataWorkflowNodeApprover.userRealName.name
                    // }
                    // personnelNameLabel={
                    //   fieldDataWorkflowNodeApprover.userRealName.label
                    // }
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
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                label: '显示源代码',
                size: 'small',
                defaultValue: 'FlowView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'FlowView',
                    name: 'FlowView',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'BaseView': {
                      code = codeBaseView;
                      break;
                    }

                    case 'FlowView': {
                      code = codeFlowView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(`当前显示 ${v} 源代码`);
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: currentCode,
              language: 'js',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export default RadioView;
