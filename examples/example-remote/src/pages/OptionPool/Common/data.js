import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  optionPoolId: {
    label: '数据标识',
    name: 'optionPoolId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '选型的标题/名称',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '选型的简介描述',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '选型的排序值',
  },
  category: {
    label: '类别',
    name: 'category',
    helper: '选型的类别',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '选型的适用业务',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '选型的状态',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '选型的创建时间',
  },
  createOperatorId: {
    label: '创建人',
    name: 'createOperatorId',
    helper: '选型的创建人',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '选型的更新时间',
  },
  updateOperatorId: {
    label: '更新人',
    name: 'updateOperatorId',
    helper: '选型的更新人',
  },
  categoryNote: {
    label: '类别',
    name: 'categoryNote',
    helper: '',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已下线
   * value : 0
   */
  disable: 0,

  /**
   * 已上线
   * value : 1
   */
  enable: 1,
};
