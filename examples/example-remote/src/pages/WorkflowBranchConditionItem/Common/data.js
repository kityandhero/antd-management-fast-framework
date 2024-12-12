import { formNameCollection } from '../../../customConfig';

export const fieldDataExtra = {
  targetValueInfo: {
    label: '目标值信息',
    name: 'targetValueInfo',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  workflowBranchConditionItemId: {
    label: '数据标识',
    name: 'workflowBranchConditionItemId',
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
  workflowBranchConditionId: {
    label: '工作流节点条件标识',
    name: 'workflowBranchConditionId',
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
  workflowBranchConditionName: {
    label: '工作流节点条件',
    name: 'workflowBranchConditionName',
    helper: '',
  },
  name: {
    label: '条件名',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  targetTitle: {
    label: '目标标题',
    name: 'targetTitle',
    helper: '',
  },
  targetName: {
    label: '目标字段',
    name: 'targetName',
    helper: '',
  },
  targetValue: {
    label: '目标值',
    name: 'targetValue',
    helper: '需要对比的目标值',
  },
  targetMinValue: {
    label: '目标最小值',
    name: 'targetMinValue',
    helper: '需要对比的目标最小值',
  },
  targetMaxValue: {
    label: '目标最大值',
    name: 'targetMaxValue',
    helper: '需要对比的目标最大值',
  },
  targetType: {
    label: '目标类型',
    name: 'targetType',
    helper: '',
  },
  targetTypeNote: {
    label: '目标类型',
    name: 'targetTypeNote',
    helper: '目标数据的类型',
  },
  targetComparisonMode: {
    label: '比较模式',
    name: 'targetComparisonMode',
    helper: '比较方式，等于、大于或小于等等',
  },
  targetComparisonModeNote: {
    label: '比较模式',
    name: 'targetComparisonModeNote',
    helper: '比较方式，等于、大于或小于等等',
  },
  targetSourceMode: {
    label: '来源模式',
    name: 'targetSourceMode',
    helper: '',
  },
  targetSourceModeNote: {
    label: '来源模式',
    name: 'targetSourceModeNote',
    helper: '',
  },
  remoteCallUrl: {
    label: '远程调用地址',
    name: 'remoteCallUrl',
    helper: '远程调用的地址',
  },
  remoteCallParams: {
    label: '远程调用参数',
    name: 'remoteCallParams',
    helper: '远程调用的参数',
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
  ...fieldDataExtra,
};
