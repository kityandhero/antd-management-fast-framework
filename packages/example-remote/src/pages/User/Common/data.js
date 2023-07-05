import { formNameCollection } from 'antd-management-fast-common';

const fieldExtraData = {
  passwordVerify: {
    label: '校验密码',
    name: 'passwordVerify',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  loginName: {
    label: '登录账户',
    name: 'loginName',
    helper: '',
  },
  password: {
    label: '登录密码',
    name: 'password',
    helper: '',
  },
  nickname: {
    label: '用户昵称',
    name: 'nickname',
    helper: '',
  },
  headImageUrl: {
    label: '头像',
    name: 'headImageUrl',
    helper: '',
  },
  dateRange: {
    label: '注册时段',
    name: 'dateRange',
    helper: '',
  },
  parentId: {
    label: '用户上级标识',
    name: 'parentId',
    helper: '',
  },
  parentHeadImgUrl: {
    label: '上级头像',
    name: 'parentHeadImgUrl',
    helper: '',
  },
  phone: {
    label: '联系电话',
    name: 'phone',
    helper: '',
  },
  noId: {
    label: '身份证号',
    name: 'noId',
    helper: '',
  },
  headPortraits: {
    label: '头像信息',
    name: 'headPortraits',
    helper: '',
  },
  email: {
    label: '邮箱账户',
    name: 'email',
    helper: '',
  },
  birthday: {
    label: '生日日期',
    name: 'birthday',
    helper: '',
  },
  sex: {
    label: '会员性别',
    name: 'sex',
    helper: '',
  },
  province: {
    label: '省份城市',
    name: 'province',
    helper: '',
  },
  provinceName: {
    label: '省份',
    name: 'provinceName',
    helper: '',
  },
  cityName: {
    label: '城市',
    name: 'cityName',
    helper: '',
  },
  countryName: {
    label: '国家',
    name: 'countryName',
    helper: '',
  },
  address: {
    label: '详细地址',
    name: 'address',
    helper: '',
  },
  isReceiveOTMsg: {
    label: '订单消息',
    name: 'isReceiveOTMsg',
    helper: '',
  },
  isManage: {
    label: '管理权限',
    name: 'isManage',
    helper: '',
  },
  parentNickname: {
    label: '父级用户昵称',
    name: 'parentNickname',
    helper: '',
  },
  parentRealName: {
    label: '父级用户姓名',
    name: 'parentRealName',
    helper: '',
  },
  consumption: {
    label: '累计消费',
    name: 'consumption',
    helper: '',
  },
  balance: {
    label: '账户金额',
    name: 'balance',
    helper: '',
  },
  integral: {
    label: '积分',
    name: 'integral',
    helper: '',
  },
  city: {
    label: '所在城市',
    name: 'city',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '用户类型',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '用户类型',
  },
  customRefererName: {
    label: '自填推荐人',
    name: 'customRefererName',
    helper: '申请时自主填写的推荐人姓名，作为管理参考',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  ...fieldExtraData,
};
