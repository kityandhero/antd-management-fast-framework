import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  galleryCategoryId: {
    label: '数据标识',
    name: 'galleryCategoryId',
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
   * value : 10
   */
  enable: 10,
};
