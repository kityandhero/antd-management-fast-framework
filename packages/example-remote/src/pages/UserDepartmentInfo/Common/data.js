import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  userDepartmentInfoId: {
    label: '数据标识',
    name: 'userDepartmentInfoId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  departmentId: {
    label: '部门标识',
    name: 'departmentId',
    helper: '',
  },
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
    helper: '',
  },
  realName: {
    label: '真实姓名',
    name: 'realName',
    helper: '',
  },
  phone: {
    label: '手机号码',
    name: 'phone',
    helper: '',
  },
  departmentName: {
    label: '部门名称',
    name: 'departmentName',
    helper: '',
  },
  subsidiaryShortName: {
    label: '所属公司简称',
    name: 'subsidiaryShortName',
    helper: '',
  },
  subsidiaryFullName: {
    label: '所属公司全称',
    name: 'subsidiaryFullName',
    helper: '',
  },
  whetherPrimary: {
    label: '主要归属部门',
    name: 'whetherPrimary',
    helper: '',
  },
  whetherPrimaryNote: {
    label: '主要归属部门',
    name: 'whetherPrimaryNote',
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
    label: '创建人标识',
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
export const statusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
