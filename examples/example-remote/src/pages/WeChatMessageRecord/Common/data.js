import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  weChatMessageRecordId: {
    label: '数据标识',
    name: 'weChatMessageRecordId',
    helper: '',
  },
  jsonData: {
    label: '发送数据',
    name: 'jsonData',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
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
  templateId: {
    label: '模板标识',
    name: 'templateId',
    helper: '',
  },
  templateKey: {
    label: '模板标记',
    name: 'templateKey',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  channel: {
    label: '发生地代码',
    name: 'channel',
    helper: '',
  },
  channelNote: {
    label: '发生地',
    name: 'channelNote',
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
  ip: {
    label: 'IP',
    name: 'ip',
    helper: '',
  },
  autoRemark: {
    label: '处理备注',
    name: 'autoRemark',
    helper: '',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * OpenId无效
   * value : 40003
   */
  invalidOpenId: 40_003,

  /**
   * 需要关注
   * value : 43004
   */
  requireSubscribe: 43_004,

  /**
   * 无效模板Id
   * value : 40037
   */
  invalidTemplateId: 40_037,

  /**
   * Access Token无效
   * value : 40001
   */
  invalidCredential: 40_001,

  /**
   * 小程序路径无效
   * value : 40165
   */
  invalidWeAppPagePath: 40_165,

  /**
   * 小程序路径无效
   * value : 48001
   */
  apiUnauthorized: 48_001,

  /**
   * 未知
   * value : -1
   */
  unknown: -1,

  /**
   * 未发送
   * value : 0
   */
  no: 0,

  /**
   * 已发送
   * value : 1
   */
  yes: 1,

  /**
   * 数据错误，忽略发送
   * value : 2
   */
  ignoreSend: 2,
};

/**
 * 模式值集合
 */
export const modeCollection = {
  /**
   * 公众号模板消息
   * value : 0
   */
  weChatOfficialAccountTemplateMessage: 0,

  /**
   * 统一服务消息
   * value : 100
   */
  uniformMessage: 100,
};
