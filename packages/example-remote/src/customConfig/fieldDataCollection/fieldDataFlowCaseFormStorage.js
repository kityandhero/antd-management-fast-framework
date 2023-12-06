import { formNameCollection } from './fieldDataCommon';

export const fieldDataFlowCaseFormStorage = {
  ...formNameCollection,
  workflowFormDesignId: {
    label: '工作流表单设计标识',
    name: 'workflowFormDesignId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  name: {
    label: '键名',
    name: 'name',
    helper: '键名',
  },
  value: {
    label: '键值',
    name: 'value',
    helper: '键值',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '',
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
};
