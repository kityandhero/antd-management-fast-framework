import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  statusNote: {
    label: '状态码',
    name: 'statusNote',
    helper: '',
  },
  customerFriendlyName: {
    label: '顾客名称',
    name: 'customerFriendlyName',
    helper: '此为结合顾客的各项信息择优选区的名称',
  },
  customerNickname: {
    label: '顾客昵称',
    name: 'customerNickname',
    helper: '顾客的昵称',
  },
  customerPhone: {
    label: '手机号码',
    name: 'customerPhone',
    helper: '顾客的手机号码',
  },
  customerRealName: {
    label: '顾客姓名',
    name: 'customerRealName',
    helper: '顾客的姓名',
  },
  whetherReplyNote: {
    label: '是否回复',
    name: 'whetherReplyNote',
    helper: '',
  },
  applicationName: {
    label: '应用名称',
    name: 'applicationName',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  applicationCustomerFeedbackId: {
    label: '数据标识',
    name: 'applicationCustomerFeedbackId',
    helper: '',
  },
  customerId: {
    label: '顾客标识',
    name: 'customerId',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  whetherReply: {
    label: '是否回复',
    name: 'whetherReply',
    helper: '',
  },
  replyContent: {
    label: '回复内容',
    name: 'replyContent',
    helper: '',
  },
  replyTime: {
    label: '回复时间',
    name: 'replyTime',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
