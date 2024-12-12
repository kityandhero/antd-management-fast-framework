import { formNameCollection } from '../../../customConfig';

export const fieldDataExtra = {
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
  friendlyName: {
    label: '用户',
    name: 'friendlyName',
    helper: '',
  },
  realName: {
    label: '姓名',
    name: 'realName',
    helper: '',
  },
  phone: {
    label: '手机号码',
    name: 'phone',
    helper: '',
  },
  subsidiaryShortName: {
    label: '公司',
    name: 'subsidiaryShortName',
    helper: '',
  },
  subsidiaryFullName: {
    label: '公司',
    name: 'subsidiaryFullName',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  workflowCaseUserMonitorConfigurationId: {
    label: '数据标识',
    name: 'workflowCaseUserMonitorConfigurationId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
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
  ...fieldDataExtra,
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
