import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  friendlyName: {
    label: '友好名称',
    name: 'friendlyName',
    helper: '',
  },
  whetherPhoneVerifyNote: {
    label: '手机号码是否验证',
    name: 'whetherPhoneVerifyNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  customerId: {
    label: '数据标识',
    name: 'customerId',
    helper: '',
  },
  nickname: {
    label: '昵称',
    name: 'nickname',
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
  whetherPhoneVerify: {
    label: '手机号码是否验证',
    name: 'whetherPhoneVerify',
    helper: '',
  },
  email: {
    label: '电子邮件',
    name: 'email',
    helper: '',
  },
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
  birthday: {
    label: '生日',
    name: 'birthday',
    helper: '',
  },
  inviterId: {
    label: '推荐人标识',
    name: 'inviterId',
    helper: '',
  },
  latitude: {
    label: '维度',
    name: 'latitude',
    helper: '',
  },
  longitude: {
    label: '经度',
    name: 'longitude',
    helper: '',
  },
  geoHashLong: {
    label: '位置编码',
    name: 'geoHashLong',
    helper: '',
  },
  geoHash: {
    label: '位置编码',
    name: 'geoHash',
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
  enable: 100,
};
