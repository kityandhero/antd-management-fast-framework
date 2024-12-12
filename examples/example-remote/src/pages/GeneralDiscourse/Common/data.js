import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  generalDiscourseId: {
    label: '数据标识',
    name: 'generalDiscourseId',
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
