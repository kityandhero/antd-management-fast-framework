import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  cloudStorageId: {
    label: '数据标识',
    name: 'cloudStorageId',
    helper: '',
  },
  uploadHistoryId: {
    label: '上传标识',
    name: 'uploadHistoryId',
    helper: '',
  },
  name: {
    label: '文件名',
    name: 'name',
    helper: '文件名',
  },
  alias: {
    label: '名称',
    name: 'alias',
    helper: '名称',
  },
  previewUrl: {
    label: '预览图',
    name: 'previewUrl',
    helper: '',
  },
  url: {
    label: '访问链接',
    name: 'url',
    helper: '',
  },
  suffix: {
    label: '后缀名',
    name: 'suffix',
    helper: '文件后缀名',
  },
  size: {
    label: '大小 (KB)',
    name: 'size',
    helper: '文件大小',
  },
  fileType: {
    label: '文件类型',
    name: 'fileType',
    helper: '文件类型',
  },
  sourceType: {
    label: '上传来源',
    name: 'sourceType',
    helper: '选型的状态',
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
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
