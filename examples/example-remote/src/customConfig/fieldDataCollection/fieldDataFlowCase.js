import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  listFormStorage: {
    label: '表单数据',
    name: 'listFormStorage',
    helper: '',
  },
  canEdit: {
    label: '可编辑',
    name: 'canEdit',
    helper: '',
  },
  canApprove: {
    label: '可审核',
    name: 'canApprove',
    helper: '',
  },
  flowDebugUserId: {
    label: '流程调试用户标识',
    name: 'flowDebugUserId',
    helper: '',
  },
  flowDebugUserRealName: {
    label: '流程调试用户姓名',
    name: 'flowDebugUserRealName',
    helper: '',
  },
  flowDebugUserNickname: {
    label: '流程调试用户昵称',
    name: 'flowDebugUserNickname',
    helper: '',
  },
  flowDebugUserAvatar: {
    label: '流程调试用户头像',
    name: 'flowDebugUserAvatar',
    helper: '',
  },
  flowDebugUserSignet: {
    label: '流程调试用户签章',
    name: 'flowDebugUserSignet',
    helper: '',
  },
  latestApproveWorkflowNode: {
    label: '最后审批节点',
    name: 'latestApproveWorkflowNode',
    helper: '',
  },
  latestApproveWorkflowNodeName: {
    label: '最后审批节点名称',
    name: 'latestApproveWorkflowNodeName',
    helper: '',
  },
  latestApproveUserId: {
    label: '最后审批用户标识',
    name: 'latestApproveUserId',
    helper: '',
  },
  latestApproveUserRealName: {
    label: '最后审批用户姓名',
    name: 'latestApproveUserRealName',
    helper: '',
  },
  latestApproveUserNickname: {
    label: '最后审批用户昵称',
    name: 'latestApproveUserNickname',
    helper: '',
  },
  nextApproveWorkflowNode: {
    label: '下一审批节点',
    name: 'latestApproveWorkflowNode',
    helper: '',
  },
  nextApproveWorkflowNodeName: {
    label: '下一审批节点',
    name: 'nextApproveWorkflowNodeName',
    helper: '',
  },
  waitApproveUserId: {
    label: '待审批用户标识',
    name: 'waitApproveUserId',
    helper: '',
  },
  waitApproveUserRealName: {
    label: '待审批用户姓名',
    name: 'waitApproveUserRealName',
    helper: '',
  },
  waitApproveUserNickname: {
    label: '待审批用户昵称',
    name: 'waitApproveUserNickname',
    helper: '',
  },
  workflowChannel: {
    label: '流程通道',
    name: 'workflowChannel',
    helper: '',
  },
};

export const fieldDataFlowCase = {
  ...formNameCollection,
  workflowId: {
    label: '流程设计标识',
    name: 'workflowId',
    helper: '',
  },
  title: {
    label: '实例标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  workflowName: {
    label: '流程名称',
    name: 'workflowName',
    helper: '',
  },
  userRealName: {
    label: '发起人',
    name: 'userRealName',
    helper: '',
  },
  userNickname: {
    label: '发起人昵称',
    name: 'userNickname',
    helper: '',
  },
  cancelApproveSwitch: {
    label: '撤销审批开关',
    name: 'cancelApproveSwitch',
    helper: '',
  },
  cancelApproveSwitchNote: {
    label: '撤销审批开关',
    name: 'cancelApproveSwitchNote',
    helper: '',
  },
  resetAllApproveSwitch: {
    label: '重置审批开关',
    name: 'resetAllApproveSwitch',
    helper: '',
  },
  resetAllApproveSwitchNote: {
    label: '重置审批开关',
    name: 'resetAllApproveSwitchNote',
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
  ...fieldExtraData,
};
