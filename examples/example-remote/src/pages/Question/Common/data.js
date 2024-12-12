import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  whetherCorrectNote: {
    label: '是否正确',
    name: 'whetherCorrectNote',
    helper: '',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '存储后不可更改',
  },
  tagName: {
    label: '标签',
    name: 'tagName',
    helper: '',
  },
  listItem: {
    label: '选项列表',
    name: 'listItem',
    helper: '',
  },
  listTag: {
    label: '标签列表',
    name: 'listTag',
    helper: '',
  },
  tagIdCollection: {
    label: '标签',
    name: 'tagIdCollection',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  questionId: {
    label: '数据标识',
    name: 'questionId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  answer: {
    label: '答案解析',
    name: 'answer',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '存储后不可更改',
  },
  whetherCorrect: {
    label: '是否正确',
    name: 'whetherCorrect',
    helper: '',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 类型集合
 */
export const typeCollection = {
  /**
   * 单选
   * value : 100
   */
  singleSelect: 100,

  /**
   * 多选
   * value : 200
   */
  multiSelect: 200,

  /**
   * 判断
   * value : 300
   */
  judgment: 300,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已下线
   * value : 0
   */
  offline: 0,

  /**
   * 已上线
   * value : 100
   */
  online: 100,
};
