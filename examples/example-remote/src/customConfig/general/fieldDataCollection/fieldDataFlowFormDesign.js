import { formNameCollection } from './fieldDataCommon';

const formExtraData = {
  whetherCurrentChannel: {
    label: '是否当前通道',
    name: 'whetherCurrentChannel',
    helper: '',
  },
  workflowNodeList: {
    label: '节点信息',
    name: 'workflowNodeList',
    helper: '',
  },
  workflowLineList: {
    label: '线条信息',
    name: 'workflowLineList',
    helper: '',
  },
  applicantSignSwitch: {
    label: '申请人签名开关',
    name: 'applicantSignSwitch',
    helper: '',
  },
  applicantSignSwitchNote: {
    label: '申请人签名开关',
    name: 'applicantSignSwitchNote',
    helper: '',
  },
  defaultApplicantStatementTitle: {
    label: '默认文档申请陈述标题',
    name: 'defaultApplicantStatementTitle',
    helper: '',
  },
  defaultApplicantStatementContent: {
    label: '默认文档申请陈述内容',
    name: 'defaultApplicantStatementContent',
    helper: '',
  },
  attentionSignSwitch: {
    label: '经办人签名开关',
    name: 'attentionSignSwitch',
    helper: '',
  },
  attentionSignSwitchNote: {
    label: '经办人签名开关',
    name: 'attentionSignSwitchNote',
    helper: '',
  },
  defaultAttentionUserId: {
    label: '默认经办人',
    name: 'defaultAttentionUserId',
    helper: '',
  },
  defaultAttentionUserRealName: {
    label: '默认经办人',
    name: 'defaultAttentionUserRealName',
    helper: '',
  },
  defaultAttentionUserSignet: {
    label: '默认经办人签章',
    name: 'defaultAttentionUserSignet',
    helper: '',
  },
  defaultAttentionStatementTitle: {
    label: '默认文档经办陈述标题',
    name: 'defaultAttentionStatementTitle',
    helper: '',
  },
  defaultAttentionStatementContent: {
    label: '默认文档经办陈述内容',
    name: 'defaultAttentionStatementContent',
    helper: '',
  },
};

export const fieldDataFlowFormDesign = {
  ...formNameCollection,
  workflowFormDesignId: {
    label: '数据标识',
    name: 'workflowFormDesignId',
    helper: '',
  },
  workflowId: {
    label: '工作流标识',
    name: 'workflowId',
    helper: '',
  },
  workflowName: {
    label: '流程名称',
    name: 'workflowName',
    helper: '',
  },
  designSchema: {
    label: '表单配置',
    name: 'designSchema',
    helper: '',
  },
  dataSchema: {
    label: '数据配置',
    name: 'dataSchema',
    helper: '',
  },
  dataSchemaList: {
    label: '数据配置',
    name: 'dataSchemaList',
    helper: '',
  },
  documentGeneralSchema: {
    label: '文档布局配置',
    name: 'documentGeneralSchema',
    helper: '',
  },
  documentTitleSchema: {
    label: '文档标题配置',
    name: 'documentTitleSchema',
    helper: '',
  },
  documentItemSchema: {
    label: '文档项配置',
    name: 'documentItemSchema',
    helper: '',
  },
  documentSchema: {
    label: '文档配置',
    name: 'documentSchema',
    helper: '',
  },
  remarkSchema: {
    label: '备注配置',
    name: 'remarkSchema',
    helper: '',
  },
  remarkSchemaList: {
    label: '备注配置',
    name: 'remarkSchemaList',
    helper: '',
  },
  remarkColor: {
    label: '备注颜色',
    name: 'remarkColor',
    helper: '',
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
  ...formExtraData,
};
