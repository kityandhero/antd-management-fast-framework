import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  yonYouPushMessageId: {
    label: '数据标识',
    name: 'yonYouPushMessageId',
    helper: '',
  },
  serialNumber: {
    label: '流水号',
    name: 'serialNumber',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  personnelCode: {
    label: '用友用户编码',
    name: 'personnelCode',
    helper: '',
  },
  url: {
    label: '链接',
    name: 'url',
    helper: '',
  },
  pushTime: {
    label: '用友推送时间',
    name: 'pushTime',
    helper: '',
  },
  businessMode: {
    label: '适用范围',
    name: 'businessMode',
    helper: '',
  },
  businessModeNote: {
    label: '适用范围',
    name: 'businessModeNote',
    helper: '',
  },
  sendComplete: {
    label: '发送完成',
    name: 'sendComplete',
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
