import { formNameCollection } from './fieldDataCommon';

const fieldExtraData = {
  flowCaseTitle: {
    label: '实例标题',
    name: 'flowCaseTitle',
    helper: '',
  },
  whetherClientSendNote: {
    label: '客户端消息是否发送',
    name: 'whetherClientSendNote',
    helper: '',
  },
  whetherSmsSendNote: {
    label: '短信是否发送',
    name: 'whetherSmsSendNote',
    helper: '',
  },
  whetherReadNote: {
    label: '是否已读',
    name: 'whetherReadNote',
    helper: '',
  },
};

export const fieldDataFlowCaseNextProcessNotification = {
  ...formNameCollection,
  workflowId: {
    label: '流程标识',
    name: 'workflowId',
    helper: '',
  },
  workflowName: {
    label: '流程名称',
    name: 'workflowName',
    helper: '',
  },
  flowCaseId: {
    label: '流程实例标识',
    name: 'flowCaseId',
    helper: '',
  },
  nextApproveUserId: {
    label: '审批人用户标识',
    name: 'nextApproveUserId',
    helper: '',
  },
  nextApproveUserRealName: {
    label: '审批人用户名称',
    name: 'nextApproveUserRealName',
    helper: '',
  },
  nextWorkflowNodeId: {
    label: '即将审批的节点',
    name: 'nextWorkflowNodeId',
    helper: '',
  },
  nextWorkflowNodeName: {
    label: '即将审批的节点',
    name: 'nextWorkflowNodeName',
    helper: '',
  },
  content: {
    label: '通知内容',
    name: 'content',
    helper: '',
  },
  clientContent: {
    label: '客户端通知内容',
    name: 'clientContent',
    helper: '',
  },
  smsContent: {
    label: '短信通知内容',
    name: 'smsContent',
    helper: '',
  },
  whetherClientSend: {
    label: '客户端消息是否发送',
    name: 'whetherClientSend',
    helper: '',
  },
  whetherSmsSend: {
    label: '短信是否发送',
    name: 'whetherSmsSend',
    helper: '',
  },
  whetherRead: {
    label: '是否已读',
    name: 'whetherSend',
    helper: '',
  },
  approveBatchNumber: {
    label: '审批批次号',
    name: 'approveBatchNumber',
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
