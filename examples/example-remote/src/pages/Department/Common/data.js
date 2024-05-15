import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  departmentId: {
    label: '部门标识',
    name: 'departmentId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  ownershipMode: {
    label: '归属模式',
    name: 'ownershipMode',
    helper: '选择部门的归属模式',
  },
  subsidiaryId: {
    label: '所属公司标识',
    name: 'subsidiaryId',
    helper: '所属的公司',
  },
  subsidiaryShortName: {
    label: '所属公司',
    name: 'subsidiaryShortName',
    helper: '',
  },
  parentId: {
    label: '上级部门标识',
    name: 'parentId',
    helper: '',
  },
  parentName: {
    label: '上级部门',
    name: 'parentName',
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
 * 归属值集合
 */
export const ownershipModeCollection = {
  /**
   * 直属
   * value : 100
   */
  directLevel: 100,

  /**
   * 公司专属
   * value : 200
   */
  subsidiaryLevel: 200,

  /**
   * 外部单位所属
   * value : 300
   */
  externalLevel: 300,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 无效
   * value : 0
   */
  invalid: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
