import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  categoryName: {
    label: '类别名称',
    name: 'categoryName',
    helper: '',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  callCenterId: {
    label: '数据标识',
    name: 'callCenterId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  contactInformation: {
    label: '联系方式',
    name: 'contactInformation',
    helper: '',
  },
  categoryId: {
    label: '类别标识',
    name: 'categoryId',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
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
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 下线
   * value : 0
   */
  offline: 0,

  /**
   * 上线
   * value : 10
   */
  online: 10,
};
