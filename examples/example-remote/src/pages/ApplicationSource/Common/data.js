import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  applicationSourceId: {
    label: '数据标识',
    name: 'applicationSourceId',
    helper: '',
  },
  name: {
    label: '应用名称',
    name: 'name',
    helper: '',
  },
  shortName: {
    label: '应用简称',
    name: 'shortName',
    helper: '',
  },
  logo: {
    label: 'Logo',
    name: 'logo',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '',
  },
  createMode: {
    label: '创建模式',
    name: 'createMode',
    helper: '',
  },
  createModeNote: {
    label: '创建模式',
    name: 'createModeNote',
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
