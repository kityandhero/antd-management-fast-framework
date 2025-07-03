import { formNameCollection } from '../../../customConfig';

export const fieldExtraData = {
  applicationName: {
    label: '应用名称',
    name: 'applicationName',
    helper: '',
  },
  friendlyName: {
    label: '名称',
    name: 'friendlyName',
    helper: '',
  },
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  userWechatApplicationInfoId: {
    label: '数据标识',
    name: 'userWechatApplicationInfoId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },

  openId: {
    label: 'OpenId',
    name: 'openId',
    helper: '',
  },
  unionId: {
    label: 'UnionId',
    name: 'unionId',
    helper: '',
  },
  latitudeRegister: {
    label: '注册维度',
    name: 'latitudeRegister',
    helper: '',
  },
  longitudeRegister: {
    label: '注册经度',
    name: 'longitudeRegister',
    helper: '',
  },
  latitudeLastSignIn: {
    label: '最后登录纬度',
    name: 'latitudeLastSignIn',
    helper: '',
  },
  longitudeLastSignIn: {
    label: '最后登录经度',
    name: 'longitudeLastSignIn',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
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
  ...fieldExtraData,
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
