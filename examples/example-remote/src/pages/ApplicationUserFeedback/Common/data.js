import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  statusNote: {
    label: '状态码',
    name: 'statusNote',
    helper: '',
  },
  userFriendlyName: {
    label: '用户名称',
    name: 'userFriendlyName',
    helper: '此为结合用户的各项信息择优选区的名称',
  },
  userNickname: {
    label: '用户昵称',
    name: 'userNickname',
    helper: '用户的昵称',
  },
  userPhone: {
    label: '手机号码',
    name: 'userPhone',
    helper: '用户的手机号码',
  },
  userRealName: {
    label: '用户姓名',
    name: 'userRealName',
    helper: '用户的姓名',
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
  applicationUserFeedbackId: {
    label: '数据标识',
    name: 'applicationUserFeedbackId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
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
