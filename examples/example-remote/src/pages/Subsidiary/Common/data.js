import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
    helper: '',
  },
  shortName: {
    label: '简称',
    name: 'shortName',
    helper: '',
  },
  fullName: {
    label: '全称',
    name: 'fullName',
    helper: '',
  },
  logo: {
    label: 'Logo',
    name: 'logo',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  code: {
    label: '代码',
    name: 'code',
    helper: '',
  },
  parentId: {
    label: '上级公司标识',
    name: 'parentId',
    helper: '',
  },
  parentShortName: {
    label: '上级公司',
    name: 'parentShortName',
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
  enable: 100,
};
