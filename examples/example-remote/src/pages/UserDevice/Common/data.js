import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  userDeviceId: {
    label: '数据标识',
    name: 'userDeviceId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  deviceType: {
    label: '设备类型',
    name: 'deviceType',
    helper: '',
  },
  deviceCode: {
    label: '设备标识码',
    name: 'deviceCode',
    helper: '',
  },
  loginName: {
    label: '账户名',
    name: 'loginName',
    helper: '',
  },
  nickname: {
    label: '用户昵称',
    name: 'nickname',
    helper: '',
  },
  realName: {
    label: '真实姓名',
    name: 'realName',
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
