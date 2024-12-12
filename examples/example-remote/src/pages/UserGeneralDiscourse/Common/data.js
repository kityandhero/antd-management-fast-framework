import { formNameCollection } from '../../../customConfig';

export const fieldDataExtra = {
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
  realName: {
    label: '姓名',
    name: 'realName',
    helper: '',
  },
  phone: {
    label: '手机',
    name: 'phone',
    helper: '',
  },
  friendlyName: {
    label: '用户',
    name: 'friendlyName',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  userGeneralDiscourseId: {
    label: '数据标识',
    name: 'userGeneralDiscourseId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  content: {
    label: '常用语 ',
    name: 'content',
    helper: '输入合适的常用语',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  type: {
    label: '类别',
    name: 'type',
    helper: '',
  },
  typeNote: {
    label: '类别',
    name: 'typeNote',
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
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '最后更新时间',
    name: 'updateTime',
    helper: '',
  },
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  ...fieldDataExtra,
};

/**
 * 类型值集合
 */
export const typeCollection = {
  /**
   * 流程审批
   * value : 100
   */
  workflow: 100,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已禁用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};
