import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  presetRoleId: {
    label: '数据标识',
    name: 'presetRoleId',
    helper: '',
  },
  name: {
    label: '角色名称',
    name: 'name',
    helper: '输入合适的角色名称。尽可能表达清晰',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '描述一下角色，便于管理',
  },
  moduleCount: {
    label: '模块数量',
    name: 'moduleCount',
    helper: '含有的模块数量，不可编辑',
  },
  channel: {
    label: '适用系统',
    name: 'channel',
    helper: '权限适用的系统',
  },
  channelNote: {
    label: '适用系统',
    name: 'channelNote',
    helper: '权限适用的系统',
  },
  isSuper: {
    label: '超级权限',
    name: 'isSuper',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '',
  },
  keyword: {
    label: '关键词',
    name: 'keyword',
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
    helper: '',
  },
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
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
   * value : 1
   */
  enable: 1,
};
