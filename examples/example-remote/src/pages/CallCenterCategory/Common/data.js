import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  callCenterCategoryId: {
    label: '数据标识',
    name: 'callCenterCategoryId',
    helper: '',
  },
  name: {
    label: '类别名称',
    name: 'name',
    helper: '输入合适的类别名称',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '输入合适的简介描述',
  },
  sort: {
    label: '排序值',
    name: 'sort',
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
   * value : 10
   */
  enable: 10,
};
