export const code = `import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyObject,
  mergeArrowText,
  showSimpleInfoMessage,
  toLowerFirst,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  convertOptionOrRadioData,
  FlexBox,
  iconBuilder,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  adjustEdge,
  adjustNode,
  Flow,
  FlowProcessHistory,
} from 'antd-management-fast-flow';

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
    name: '节点001',
    description: '',
    viewConfigData:
      '{"position":{"x":-39.61612194131288,"y":37.08743330676117}}',
    type: 20,
    workflowNodeId: '1719271707115655168',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-31 16:34:52',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 16:36:26',
    key: '1719271707115655168',
    workflowName: '范围内审批流程001',
    statusNote: '正常',
    typeNote: '过程点',
    listApprover: [],
    viewConfig: {
      position: {
        x: -39.616_121_941_312_883,
        y: 37.087_433_306_761_17,
      },
    },
  },
  {
    workflowId: '1718837194992521216',
    name: '终止点 - 1719252735666294784',
    description: '流程终止节点',
    viewConfigData:
      '{"position":{"x":-263.34096464399295,"y":270.7843015377835}}',
    type: 30,
    workflowNodeId: '1719252735666294784',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-31 15:19:29',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 16:36:25',
    key: '1719252735666294784',
    workflowName: '范围内审批流程001',
    statusNote: '正常',
    typeNote: '终止点',
    listApprover: [],
    viewConfig: {
      position: {
        x: -263.340_964_643_992_95,
        y: 270.784_301_537_783_51,
      },
    },
  },
];

const workflowLineList = [
  {
    workflowId: '1718837194992521216',
    title: '',
    fromId: '1718937226831859712',
    fromPosition: 400,
    toId: '1719271707115655168',
    toPosition: 100,
    type: 100,
    description: '',
    workflowLineId: '1719252862103588864',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-31 15:19:59',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 16:35:07',
    key: '1719252862103588864',
    workflowName: '范围内审批流程001',
    fromPositionName: 'Bottom',
    fromPositionNote: '下部',
    toPositionName: 'Top',
    toPositionNote: '上部',
    typeNote: '前进',
    statusNote: '正常',
    fromName: '起始点',
    toName: '节点001',
  },
  {
    workflowId: '1718837194992521216',
    title: '',
    fromId: '1719271707115655168',
    fromPosition: 400,
    toId: '1719252735666294784',
    toPosition: 100,
    type: 100,
    description: '',
    workflowLineId: '1719272086574338048',
    channel: 0,
    status: 100,
    createOperatorId: '1683472879502626816',
    createTime: '2023-10-31 16:36:22',
    updateOperatorId: '1683472879502626816',
    updateTime: '2023-10-31 16:36:22',
    key: '1719272086574338048',
    workflowName: '范围内审批流程001',
    fromPositionName: 'Bottom',
    fromPositionNote: '下部',
    toPositionName: 'Top',
    toPositionNote: '上部',
    typeNote: '前进',
    statusNote: '正常',
    fromName: '节点001',
    toName: '终止点',
  },
];

function buildProcessHistory(count = 0) {
  const list = [];

  list.push({
    workflowId: '1720257724563984384',
    flowCaseId: '1721891698650517504',
    approveUserId: 0,
    approveWorkflowNodeId: '1720257727365779456',
    inWorkflowLineId: 0,
    approveWorkflowNodeType: 10,
    approveAction: 100,
    approveActionMode: 100,
    note: '',
    workflowCaseProcessHistoryId: '1724638271054680064',
    channel: 200,
    status: 100,
    createOperatorId: 0,
    createTime: '2023-11-15 11:59:40',
    updateOperatorId: 0,
    updateTime: '2023-11-15 11:59:40',
    key: '1724638271054680064',
    approveActionNote: '通过',
    approveActionModeNote: '自动操作',
    approveUserName: '',
    approveUserSignet: ' ',
    approveWorkflowNodeTypeNote: '起始点',
    statusNote: '正常',
    workflowName: '员工请假审批流程',
    flowCaseTitle: '员工请假审批流程实例',
    approveWorkflowNodeName: '起始点',
  });

  for (let index = 0; index < count; index++) {
    list.push({
      workflowId: \`\${index * 2 + 1}\`,
      flowCaseId: \`\${index * 3 + 1}\`,
      approveUserId: \`\${index * 4 + 1}\`,
      approveWorkflowNodeId: \`\${index * 5 + 1}\`,
      inWorkflowLineId: \`\${index * 6 + 1}\`,
      approveWorkflowNodeType: 20,
      approveAction: 100,
      approveActionMode: 200,
      note: '',
      workflowCaseProcessHistoryId: \`\${index * 7 + 1}\`,
      channel: 200,
      status: 100,
      createOperatorId: \`\${index * 8 + 1}\`,
      createTime: '2023-11-15 12:00:33',
      updateOperatorId: \`\${index * 9 + 1}\`,
      updateTime: '2023-11-15 12:00:33',
      key: \`\${index * 7 + 1}\`,
      approveActionNote: '通过',
      approveActionModeNote: '人工操作',
      approveUserName: \`审批人员\${index + 1}\`,
      approveUserSignet: '',
      approveWorkflowNodeTypeNote: '过程点',
      statusNote: '正常',
      workflowName: '员工请假审批流程',
      flowCaseTitle: '员工请假审批流程实例',
      approveWorkflowNodeName: \`审批节点\${index + 1}\`,
    });
  }

  list.push(
    {
      workflowId: '1720257724563984384',
      flowCaseId: '1721891698650517504',
      approveUserId: '1721888194980614144',
      approveWorkflowNodeId: '1721889557470908416',
      inWorkflowLineId: '1721890146867089408',
      approveWorkflowNodeType: 20,
      approveAction: 100,
      approveActionMode: 200,
      note: '',
      workflowCaseProcessHistoryId: '1724638494204235776',
      channel: 200,
      status: 100,
      createOperatorId: '1721888194980614144',
      createTime: '2023-11-15 12:00:33',
      updateOperatorId: '1721888194980614144',
      updateTime: '2023-11-15 12:00:33',
      key: '1724638494204235776',
      approveActionNote: '通过',
      approveActionModeNote: '人工操作',
      approveUserName: '行政部长',
      approveUserSignet: '',
      approveWorkflowNodeTypeNote: '过程点',
      statusNote: '正常',
      workflowName: '员工请假审批流程',
      flowCaseTitle: '员工请假审批流程实例',
      approveWorkflowNodeName: '行政部副部长审批',
    },
    {
      workflowId: '1720257724563984384',
      flowCaseId: '1721891698650517504',
      approveUserId: '1699415925855490048',
      approveWorkflowNodeId: '1721889911902179328',
      inWorkflowLineId: '1721890338412564480',
      approveWorkflowNodeType: 20,
      approveAction: 100,
      approveActionMode: 200,
      note: '',
      workflowCaseProcessHistoryId: '1724638654573449216',
      channel: 200,
      status: 100,
      createOperatorId: '1699415925855490048',
      createTime: '2023-11-15 12:01:12',
      updateOperatorId: '1699415925855490048',
      updateTime: '2023-11-15 12:01:12',
      key: '1724638654573449216',
      approveActionNote: '通过',
      approveActionModeNote: '人工操作',
      approveUserName: '副总',
      approveUserSignet: '',
      approveWorkflowNodeTypeNote: '过程点',
      statusNote: '正常',
      workflowName: '员工请假审批流程',
      flowCaseTitle: '员工请假审批流程实例',
      approveWorkflowNodeName: '副总经理审批',
    },
    {
      workflowId: '1720257724563984384',
      flowCaseId: '1721891698650517504',
      approveUserId: 0,
      approveWorkflowNodeId: '1720257728011702272',
      inWorkflowLineId: '1721890667040477184',
      approveWorkflowNodeType: 30,
      approveAction: 100,
      approveActionMode: 100,
      note: '',
      workflowCaseProcessHistoryId: '1724638654699278336',
      channel: 200,
      status: 100,
      createOperatorId: '1699415925855490048',
      createTime: '2023-11-15 12:01:12',
      updateOperatorId: '1699415925855490048',
      updateTime: '2023-11-15 12:01:12',
      key: '1724638654699278336',
      approveActionNote: '通过',
      approveActionModeNote: '自动操作',
      approveUserName: '',
      approveUserSignet: ' ',
      approveWorkflowNodeTypeNote: '终止点',
      statusNote: '正常',
      workflowName: '员工请假审批流程',
      flowCaseTitle: '员工请假审批流程实例',
      approveWorkflowNodeName: '终止点',
    },
  );

  return list;
}

const nextApproveWorkflowNode = {};

function processHistoryNextDataConvert(o) {
  if (o == null || isEmptyObject(o)) {
    return null;
  }

  const nextApproveWorkflowNodeName = getValueByKey({
    data: o,
    key: 'name',
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

function processHistoryItemDataConvert(o) {
  const approveWorkflowNodeName = getValueByKey({
    data: o,
    key: 'approveWorkflowNodeName',
  });

  const approveActionNote = getValueByKey({
    data: o,
    key: 'approveActionNote',
  });

  const approveActionMode = getValueByKey({
    data: o,
    key: 'approveActionMode',
  });

  const note = getValueByKey({
    data: o,
    key: 'note',
  });

  const approveUserName = getValueByKey({
    data: o,
    key: 'approveUserName',
  });

  const time = getValueByKey({
    data: o,
    key: 'createTime',
  });

  if (approveActionMode !== 100) {
    return {
      ...o,
      title: approveWorkflowNodeName,
      result: approveActionNote,
      note,
      operatorName: approveUserName,
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
    compact: true,
  };
}

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
        // isNext: '' === workflowNodeId,
        isNext: true,
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

    const listProcessHistory = buildProcessHistory(0);
    const listProcessHistory2 = buildProcessHistory(10);

    return {
      list: [
        {
          title: {
            text: '示例',
          },
          fullLine: false,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <FlexBox
                    flexAuto="left"
                    left={
                      <div
                        style={{
                          paddingTop: '20px',
                          height: '630px',
                        }}
                      >
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
                    }
                    right={
                      <div style={{ height: '100%', width: '280px' }}>
                        <FlowProcessHistory
                          style={{ width: '280px' }}
                          title="审批进度"
                          showTitle
                          showLeftDivider
                          list={[
                            ...(isArray(listProcessHistory)
                              ? listProcessHistory
                              : []),
                          ]}
                          listItemConvert={processHistoryItemDataConvert}
                          nextData={nextApproveWorkflowNode}
                          nextDataConvert={processHistoryNextDataConvert}
                        />
                      </div>
                    }
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
            <ScrollFacadeBox
              style={{
                height: '100%',
                overflowY: 'auto',
              }}
            >
              <FlowProcessHistory
                // style={{ width: '280px' }}
                list={[
                  ...(isArray(listProcessHistory2) ? listProcessHistory2 : []),
                ]}
                listItemConvert={processHistoryItemDataConvert}
                nextData={nextApproveWorkflowNode}
                nextDataConvert={processHistoryNextDataConvert}
              />
            </ScrollFacadeBox>
          ),
        },
        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          fullLine: true,
          flexVertical: true,
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

                  showSimpleInfoMessage(\`当前显示 \${v} 源代码\`);
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
`;
