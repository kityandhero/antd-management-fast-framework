import { formNameCollection } from 'antd-management-fast-common';

const fieldExtraData = {
  authorityCollection: {
    label: '权限集合',
    name: 'authorityCollection',
    helper: '',
  },
  authorityKeyCollection: {
    label: '权限标识集合',
    name: 'authorityKeyCollection',
    helper: '',
  },
  passwordVerify: {
    label: '校验密码',
    name: 'passwordVerify',
    helper: '',
  },
  canOperate: {
    label: '校验密码',
    name: 'canOperate',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  masterManagerId: {
    label: '账户标识',
    name: 'masterManagerId',
    helper: '',
  },
  loginName: {
    label: '登录名',
    name: 'loginName',
    helper: '',
  },
  password: {
    label: '登录密码',
    name: 'password',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
  phone: {
    label: '联系电话',
    name: 'phone',
    helper: '',
  },
  email: {
    label: '邮箱账户',
    name: 'email',
    helper: '',
  },
  authorityCollection: {
    label: '拥有角色',
    name: 'authorityCollection',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
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
   * value : 100
   */
  enable: 1,
};
