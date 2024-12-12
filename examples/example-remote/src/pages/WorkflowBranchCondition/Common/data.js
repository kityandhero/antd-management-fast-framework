import { formNameCollection } from '../../../customConfig';

const formExtraData = {
  listWorkflowBranchConditionItem: {
    label: '条件项列表',
    name: 'listWorkflowBranchConditionItem',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  workflowBranchConditionId: {
    label: '数据标识',
    name: 'workflowBranchConditionId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  workflowNodeId: {
    label: '工作流节点标识',
    name: 'workflowNodeId',
    helper: '',
  },
  workflowName: {
    label: '工作流',
    name: 'workflowName',
    helper: '',
  },
  workflowNodeName: {
    label: '工作流节点',
    name: 'workflowNodeName',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  judgmentMode: {
    label: '判断模式',
    name: 'judgmentMode',
    helper: '',
  },
  judgmentModeNote: {
    label: '判断模式',
    name: 'judgmentModeNote',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...formExtraData,
};
