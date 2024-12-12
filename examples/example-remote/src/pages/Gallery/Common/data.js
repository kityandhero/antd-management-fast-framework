import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  categoryName: {
    label: '类别名称',
    name: 'categoryName',
    helper: '',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
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
  galleryId: {
    label: '数据标识',
    name: 'galleryId',
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
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
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
 * 类型集合
 */
export const typeCollection = {
  /**
   * 无跳转
   * value : 0
   */
  onlyShow: 0,

  /**
   * 网页跳转
   * value : 10
   */
  html: 100,

  /**
   * 小程序页面跳转
   * value : 30
   */
  page: 200,
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
