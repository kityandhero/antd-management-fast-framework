import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  smsLogId: {
    label: '数据标识',
    name: 'smsLogId',
    helper: '',
  },
  phone: {
    label: '手机号码',
    name: 'phone',
    helper: '',
  },
  content: {
    label: '短信内容',
    name: 'content',
    helper: '',
  },
  code: {
    label: '验证码',
    name: 'code',
    helper: '',
  },
  cityCode: {
    label: '城市代码',
    name: 'cityCode',
    helper: '',
  },
  cityName: {
    label: '城市名称',
    name: 'cityName',
    helper: '',
  },
  smsCategoryId: {
    label: '类别代码',
    name: 'smsCategoryId',
    helper: '',
  },
  smsCategoryName: {
    label: '类别名称',
    name: 'smsCategoryName',
    helper: '',
  },
  status: {
    label: '发送状态',
    name: 'status',
    helper: '',
  },
  statusNote: {
    label: '发送状态',
    name: 'statusNote',
    helper: '',
  },
  aggregate: {
    label: '统计状态',
    name: 'aggregate',
    helper: '',
  },
  aggregateNote: {
    label: '统计状态',
    name: 'aggregateNote',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  sendTime: {
    label: '发送时间',
    name: 'sendTime',
    helper: '',
  },
  errorMessage: {
    label: '错误描述',
    name: 'errorMessage',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 等待发送
   * value : 0
   */
  wait: 0,

  /**
   * 已经发送
   * value : 10
   */
  alreadySend: 10,

  /**
   * 发送失败
   * value : 20
   */
  failSend: 20,
};

/**
 * 汇总状态值集合
 */
export const aggregateCollection = {
  /**
   * 等待统计
   * value : 0
   */
  wait: 0,

  /**
   * 已经统计
   * value : 10
   */
  alreadyAggregate: 10,
};
