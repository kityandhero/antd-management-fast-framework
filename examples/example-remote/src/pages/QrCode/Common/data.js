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
  qrCodeId: {
    label: '数据标识',
    name: 'qrCodeId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  categoryId: {
    label: '类别标识',
    name: 'categoryId',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  imageUrl: {
    label: '图片链接',
    name: 'imageUrl',
    helper: '',
  },
  url: {
    label: '跳转链接',
    name: 'url',
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
