import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
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
  customerWechatApplicationInfoId: {
    label: '数据标识',
    name: 'customerWechatApplicationInfoId',
    helper: '',
  },
  customerId: {
    label: '顾客标识',
    name: 'customerId',
    helper: '',
  },
  openId: {
    label: 'Open Id',
    name: 'openId',
    helper: '',
  },
  unionId: {
    label: '联合标识',
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
  ...fieldExtraData,
};
