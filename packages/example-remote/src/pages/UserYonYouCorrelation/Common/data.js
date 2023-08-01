import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  userYonYouCorrelationId: {
    label: '数据标识',
    name: 'userYonYouCorrelationId',
    helper: '',
  },
  userId: {
    label: '绑定标识',
    name: 'userId',
    helper: '',
  },
  userRealName: {
    label: '绑定账户',
    name: 'userRealName',
    helper: '',
  },
  organization: {
    label: '所属组织',
    name: 'organization',
    helper: '',
  },
  personnelCode: {
    label: '人员编码',
    name: 'personnelCode',
    helper: '',
  },
  realName: {
    label: '真实姓名',
    name: 'realName',
    helper: '',
  },
  gender: {
    label: '性别',
    name: 'gender',
    helper: '',
  },
  phone: {
    label: '手机号码',
    name: 'phone',
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
