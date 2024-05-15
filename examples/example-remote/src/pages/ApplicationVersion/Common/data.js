import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  applicationVersionId: {
    label: '数据标识',
    name: 'applicationVersionId',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  url: {
    label: '下载链接',
    name: 'url',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  minVersion: {
    label: '最小版本号',
    name: 'minVersion',
    helper: '',
  },
  maxVersion: {
    label: '最大版本号',
    name: 'maxVersion',
    helper: '',
  },
  internalVersion: {
    label: '内部版本号',
    name: 'internalVersion',
    helper: '',
  },
  deviceType: {
    label: '设备类型',
    name: 'deviceType',
    helper: '',
  },
  deviceTypeNote: {
    label: '设备类型',
    name: 'deviceTypeNote',
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
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
};

/**
 * 状态值集合
 */
export const createModeCollection = {
  /**
   * 仅直接创建
   * value : 0
   */
  onlyDirectlyCreate: 0,

  /**
   * 仅间接创建
   * value : 10
   */
  onlyIndirectCreate: 10,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已停用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};
