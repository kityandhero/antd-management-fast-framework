// 全局性常量

export const unknownLabel = '未知';

export const amapkey = 'bff966857f8311eb68ea03dcbac869ad';

export const channelMasterManagement = 'b4e618f907dc41b797f599c1695c1c70';

export const colorCollection = {
  yesColor: '#52c41a',
  noColor: '#ec8402',
  price: '#267cb7',
};

export const keyValueTypeCollection = {
  text: 0,
  multiText: 100,
  image: 200,
  video: 300,
  audio: 400,
  attachment: 500,
  link: 1000,
};

export const fileTypeCollection = {
  image: 100,
  video: 200,
  audio: 300,
  file: 400,
};

/**
 * 流程调试审批人模式值集合
 */
export const flowDebugApproverModeCollection = {
  /**
   * 全局测试账户
   * value : 0
   */
  debugUser: 0,

  /**
   * 流程配置账户
   * value : 100
   */
  flowConfiguration: 100,
};

/**
 * 流程调试申请人模式值集合
 */
export const flowDebugUserModeCollection = {
  /**
   * 全局测试账户
   * value : 0
   */
  globalDebugUser: 0,

  /**
   * 流程配置的特定测试用户
   * value : 100
   */
  specialDebugUser: 100,
};

export const flowEffectiveRangeCollection = {
  /**
   * 全局适用
   * value : 100
   */
  globalEffective: 100,

  /**
   * 范围内适用
   * value : 200
   */
  rangeEffective: 200,
};

/**
 * 流程审批动作集合
 */
export const flowApproveActionCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 通过
   * value : 100
   */
  pass: 100,

  /**
   * 拒绝
   * value : 200
   */
  refuse: 200,
};

/**
 * 流程审批动作模式集合
 */
export const flowApproveActionModeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 自动操作
   * value : 100
   */
  autoControl: 100,

  /**
   * 人工
   * value : 200
   */
  manualControl: 200,
};

/**
 * 流程应用范围值集合
 */
export const flowScopeCollection = {
  /**
   * 文章审核
   * value : 100
   */
  articleAudit: 100,

  /**
   * 流程审批
   * value : 200
   */
  processApproval: 200,
};

/**
 * 流程状态值集合
 */
export const flowStatusCollection = {
  /**
   * 禁用
   * value : 0
   */
  disable: 0,

  /**
   * 启用
   * value : 100
   */
  enable: 100,
};

/**
 * 流程表单设计状态值集合
 */
export const flowFormDesignStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程线条类型值集合
 */
export const flowLineTypeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 前进
   * value : 100
   */
  forward: 100,

  /**
   * 回退
   * value : 200
   */
  backward: 200,

  /**
   * 抄送
   * value : 300
   */
  carbonCopy: 300,
};

/**
 * 流程线条状态值集合
 */
export const flowLineStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点类型值集合
 */
export const flowNodeTypeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 起始点
   * value : 10
   */
  startNode: 10,

  /**
   * 过程点
   * value : 20
   */
  intermediateNode: 20,

  /**
   * 抄送点
   * value : 26
   */
  carbonCopyPoint: 26,

  /**
   * 终止点
   * value : 30
   */
  endNode: 30,
};

/**
 * 流程节点审批人模式值集合
 */
export const flowNodeApproverModeCollection = {
  /**
   * 无需人员审批
   * value : 0
   */
  none: 0,

  /**
   * 指定人员
   * value : 100
   */
  designated: 100,

  /**
   * 直属部门
   * value : 200
   */
  directlyAffiliatedDepartment: 200,
};

/**
 * 审批节点签批方式值集合
 */
export const flowNodeApproveModeCollection = {
  /**
   * 或签【需要某位审批人员同意即可】
   * value : 0
   */
  oneOfApproval: 0,

  /**
   * 会签【需要全部审批人员同意方可】
   * value : 100
   */
  allApproval: 100,
};

/**
 * 流程节点状态值集合
 */
export const flowNodeStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点审批人状态值集合
 */
export const flowNodeApproverStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点条件判断标准值集合
 */
export const flowBranchConditionJudgmentModeCollection = {
  /**
   * 符合全部
   * value : 100
   */
  and: 100,

  /**
   * 符合其一
   * value : 200
   */
  or: 200,
};

/**
 * 流程节点条件状态值集合
 */
export const flowBranchConditionStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点条件项对比模式值集合
 */
export const flowBranchConditionItemTargetComparisonModelCollection = {
  /**
   * 相等
   * value : 0
   */
  eq: 0,

  /**
   * 不等于
   * value : 0
   */
  ne: 10,

  /**
   * 大于
   * value : 100
   */
  gt: 100,

  /**
   * 大于等于
   * value : 110
   */
  gte: 110,

  /**
   * 小于
   * value : 200
   */
  lt: 200,

  /**
   * 小于等于
   * value : 210
   */
  lte: 210,

  /**
   * 小于等于
   * value : 300
   */
  rangeWithGtAndLt: 300,

  /**
   * 范围值[大于等于 ~ 小于]
   * value : 310
   */
  rangeWithGteAndLt: 310,

  /**
   * 范围值[大于 ~ 小于等于]
   * value : 320
   */
  rangeWithGtAndLte: 320,

  /**
   * 范围值[大于等于 ~ 小于等于]
   * value : 330
   */
  rangeWithGteAndLte: 330,
};

/**
 * 流程节点条件项数据源模式值集合
 */
export const flowBranchConditionItemTargetSourceModeCollection = {
  /**
   * 表单字段
   * value : 100
   */
  formField: 100,

  /**
   * 远程调用
   * value : 1000
   */
  remoteCall: 1000,
};

/**
 * 流程节点条件项数据类型值集合
 */
export const flowBranchConditionItemTargetTypeCollection = {
  /**
   * 数字
   * value : 100
   */
  number: 100,

  /**
   * 文本
   * value : 200
   */
  string: 200,
};

/**
 * 流程节点条件项状态值集合
 */
export const flowBranchConditionItemStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例状态值集合
 */
export const flowCaseStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 新创建
   * value : 100
   */
  created: 100,

  /**
   * 审批驳回
   * value : 110
   */
  refuse: 110,

  /**
   * 递交审批
   * value : 200
   */
  submitApproval: 200,

  /**
   * 审批中
   * value : 300
   */
  inApprovalProcess: 300,

  /**
   * 审批完成
   * value : 400
   */
  success: 400,

  /**
   * 强制结束（即该次审批作废）
   * value : 500
   */
  forcedEnd: 500,
};

/**
 * 流程实例下一审批信息数据状态值集合
 */
export const flowCaseNextProcessApproveStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例下一审批通知数据状态值集合
 */
export const flowCaseNextProcessNotificationStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例下一审批流程数据状态值集合
 */
export const flowCaseNextProcessProgressStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程历史数据状态值集合
 */
export const flowCaseProcessHistoryStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程表单附件存储数据状态值集合
 */
export const flowCaseFormAttachmentStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程表单键值存储数据状态值集合
 */
export const flowCaseFormStorageStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

export const keyValueEditModeCollection = {
  string: 'string',
  number: 'number',
  time: 'time',
  datetime: 'datetime',
  whether: 'whether',
  multiLineString: 'multiLineString',
  flowFormDisplayModeWhenApproval: 'flowFormDisplayModeWhenApproval',
};

export const keyValueItemData = {
  id: {
    label: '数据标识',
    name: 'id',
    helper: '数据项的数据标识',
  },
  title: {
    label: '名称',
    name: 'title',
    helper: '自定义数据项的标题名, 一般用于管理识别',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '数据项的类型',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '数据项的类型',
  },
  text: {
    label: '文本',
    name: 'text',
    helper: '',
  },
  multiText: {
    label: '多行文字',
    name: 'multiText',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  link: {
    label: '链接',
    name: 'link',
    helper: '',
  },
  video: {
    label: '视频',
    name: 'video',
    helper: '',
  },
  audio: {
    label: '音频',
    name: 'audio',
    helper: '',
  },
  attachment: {
    label: '文件',
    name: 'attachment',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  createTime: {
    label: '发布时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '最后更新时间',
    name: 'updateTime',
    helper: '',
  },
};

export const defaultPoint = [113.672_108, 34.749_387];

export const emptySignet =
  'data:image/png;base64,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';

export const listSimpleApprove = [
  {
    nodeId: 'e840a9d25e9649ae87791495d51b7794',
    title: '已审批节点一',
    note: '拟同意',
    name: '张三',
    signet:
      'data:image/png;base64,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',
    time: '2023-12-26 14:50',
  },
];

export const listSimpleAllApproveProcess = [
  {
    nodeId: 'e840a9d25e9649ae87791495d51b7794',
    title: '未审批节点一',
    note: '',
    name: '',
    signet: '',
    time: '',
  },
  {
    nodeId: 'ad7da4522e7b4e4baca8b3397506a0ea',
    title: '未审批节点二',
    note: '',
    name: '',
    signet: '',
    time: '',
  },
];
