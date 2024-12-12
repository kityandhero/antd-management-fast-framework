import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  sourceMode: {
    label: '来源',
    name: 'sourceMode',
    helper: '业务值的创建方式',
  },
  sourceModeNote: {
    label: '来源',
    name: 'sourceModeNote',
    helper: '业务值的创建方式',
  },
};

export const fieldData = {
  ...formNameCollection,
  businessSetId: {
    label: '数据标识',
    name: 'businessSetId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '业务标题名, 设置含义清晰有助于理解',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '业务标记名称, 请用驼峰式语法, 用于系统交互',
  },
  value: {
    label: '值',
    name: 'value',
    helper: '业务标记值, 值必须大于0',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '业务的简介描述',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '输入合适的排序值, 按照降序排序',
  },
  ...fieldExtraData,
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
