import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  applicationId: {
    label: '数据标识',
    name: 'applicationId',
    helper: '',
  },
  applicationKey: {
    label: '应用标识',
    name: 'applicationKey',
    helper: '',
  },
  whetherOwn: {
    label: '是否开通',
    name: 'whetherOwn',
    helper: '',
  },
  applicationSourceId: {
    label: '应用源标识',
    name: 'applicationSourceId',
    helper: '',
  },
  applicationSourceName: {
    label: '应用源名称',
    name: 'applicationSourceName',
    helper: '',
  },
  name: {
    label: '应用名称',
    name: 'name',
    helper: '',
  },
  shortName: {
    label: '应用简称',
    name: 'shortName',
    helper: '',
  },
  logo: {
    label: 'Logo',
    name: 'logo',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  type: {
    label: '应用类型',
    name: 'type',
    helper: '',
  },
  typeNote: {
    label: '应用类型',
    name: 'typeNote',
    helper: '',
  },
  appId: {
    label: '微信AppId',
    name: 'appId',
    helper: '例如微信公众号appId',
  },
  appSecret: {
    label: '微信AppSecret',
    name: 'appSecret',
    helper: '例如微信公众号appSecret',
  },
  appKey: {
    label: '微信AppKey',
    name: 'appKey',
    helper: '例如微信支付商户key',
  },
  merchantId: {
    label: '微信MerchantId',
    name: 'merchantId',
    helper: '例如微信商户号',
  },
  subAppId: {
    label: '微信子AppId',
    name: 'subAppId',
    helper: '例如微信服务商模式下的特定应用appId',
  },
  subAppSecret: {
    label: '微信子AppSecret',
    name: 'subAppSecret',
    helper: '例如微信服务商模式下的特定应用appSecret',
  },
  subMerchantId: {
    label: '微信子MerchantId',
    name: 'subMerchantId',
    helper: '例如微信服务商的特约商户号',
  },
  merchantType: {
    label: '微信商户类型',
    name: 'merchantType',
    helper: '',
  },
  certificate: {
    label: '微信支付证书',
    name: 'certificate',
    helper: '',
  },
  certificatePassword: {
    label: '支付证书密码',
    name: 'certificatePassword',
    helper: '',
  },
  certificateType: {
    label: '支付证书类型',
    name: 'certificateType',
    helper: '',
  },
  certificateTypeNote: {
    label: '支付证书类型',
    name: 'certificateTypeNote',
    helper: '',
  },
  accessToken: {
    label: '微信AccessToken',
    name: 'accessToken',
    helper: '',
  },
  accessTokenValidSecond: {
    label: '微信AccessTokenValidSecond',
    name: 'accessTokenValidSecond',
    helper: '',
  },
  accessTokenExpireTime: {
    label: '微信AccessTokenExpireTime',
    name: 'accessTokenExpireTime',
    helper: '',
  },
  messageChannelApplicationId: {
    label: '关联消息应用',
    name: 'messageChannelApplicationId',
    helper:
      '需要通过其他应用进行消息发送时进行配置，需要指定的应用符合发送消息条件',
  },
  messageChannelApplicationName: {
    label: '关联消息应用',
    name: 'messageChannelApplicationName',
    helper:
      '需要通过其他应用进行消息发送时进行配置，需要指定的应用符合发送消息条件',
  },
  status: {
    label: '应用状态',
    name: 'status',
    helper: '',
  },
  statusNote: {
    label: '应用状态',
    name: 'statusNote',
    helper: '',
  },
  effectiveStartTime: {
    label: '有效期开始时间',
    name: 'effectiveStartTime',
    helper: '',
  },
  effectiveEndTime: {
    label: '有效期截止时间',
    name: 'effectiveEndTime',
    helper: '',
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
  customGlobalListItem: {
    label: '自定义全局数据',
    name: 'customGlobalListItem',
    helper: '微信小程序上的自定义全局数据',
  },
  weChatMiniProgramHomeWePath: {
    label: '微信小程序首页路径',
    name: 'weChatMiniProgramHomeWePath',
    helper: '微信小程序上的首页路径信息',
  },
  weChatOfficialAccountHomeWePath: {
    label: '微信公众号首页路径',
    name: 'weChatOfficialAccountHomeWePath',
    helper: '微信公众号的首页路径信息',
  },
  weChatOfficialAccountSubscriptionMessageTemplateId: {
    label: '微信公众号关注消息模板',
    name: 'weChatOfficialAccountSubscriptionMessageTemplateId',
    helper: '',
  },
  weChatOfficialAccountPaySuccessMessageTemplateId: {
    label: '微信公众号支付成功通知消息模板',
    name: 'weChatOfficialAccountPaySuccessMessageTemplateId',
    helper: '',
  },
  weChatOfficialAccountPaySuccessMessagePagePath: {
    label: '微信小程序支付成功消息跳转路径',
    name: 'weChatOfficialAccountPaySuccessMessagePagePath',
    helper: '',
  },
  weChatMiniProgramPaySuccessMessagePagePath: {
    label: '微信小程序支付成功消息跳转路径',
    name: 'weChatMiniProgramPaySuccessMessagePagePath',
    helper: '',
  },
  weChatOfficialAccountWithdrawSuccessMessageTemplateId: {
    label: '微信公众号提现成功通知消息模板',
    name: 'weChatOfficialAccountWithdrawSuccessMessageTemplateId',
    helper: '',
  },
  weChatOfficialAccountWithdrawSuccessMessagePagePath: {
    label: '微信社区商城公众号提现成功消息跳转路径',
    name: 'weChatOfficialAccountWithdrawSuccessMessagePagePath',
    helper: '',
  },
  weChatMiniProgramWithdrawSuccessMessagePagePath: {
    label: '微信社区商城小程序提现成功消息跳转路径',
    name: 'weChatMiniProgramWithdrawSuccessMessagePagePath',
    helper: '',
  },
  weChatOfficialAccountWithdrawFailMessageTemplateId: {
    label: '微信公众号提现失败通知消息模板',
    name: 'weChatOfficialAccountWithdrawFailMessageTemplateId',
    helper: '',
  },
  weChatOfficialAccountWithdrawFailMessagePagePath: {
    label: '微信社区商城公众号提现失败消息跳转路径',
    name: 'weChatOfficialAccountWithdrawFailMessagePagePath',
    helper: '',
  },
  weChatMiniProgramWithdrawFailMessagePagePath: {
    label: '微信社区商城小程序提现失败消息跳转路径',
    name: 'weChatMiniProgramWithdrawFailMessagePagePath',
    helper: '',
  },
  checkInEverydaySwitch: {
    label: '每天签到打卡开关',
    name: 'checkInEverydaySwitch',
    helper: '是否开启每日签到打卡',
  },
  checkInScoreRewardEveryday: {
    label: '每日签到打卡积分奖励',
    name: 'checkInScoreRewardEveryday',
    helper: '每天签到打卡所得的积分奖励',
  },
  checkInNotificationSwitch: {
    label: '发送签到打卡通知',
    name: 'checkInNotificationSwitch',
    helper: '开启后将由系统定时发送签到打卡通知',
  },
  checkInNotificationRemindTime: {
    label: '签到打卡通知提醒时间',
    name: 'checkInNotificationRemindTime',
    helper: '签到打卡通知提醒时间，到时间后将推送签到打卡提醒消息',
  },
  weChatOfficialAccountCheckInNotificationTemplateId: {
    label: '微信公众号签到打卡通知消息模板',
    name: 'weChatOfficialAccountCheckInNotificationTemplateId',
    helper: '签到打卡通知消息模板',
  },
  weChatMiniProgramCheckInNotificationPagePath: {
    label: '微信社区商城小程序签到打卡通知消息跳转路径',
    name: 'weChatMiniProgramCheckInNotificationPagePath',
    helper: '签到打卡通知消息跳转路径',
  },
  weChatOfficialCheckInNotificationPagePath: {
    label: '微信社区商城公众号签到打卡通知消息跳转路径',
    name: 'weChatOfficialCheckInNotificationPagePath',
    helper: '签到打卡通知消息跳转路径',
  },
  checkInNotificationTitle: {
    label: '签到打卡通知标题',
    name: 'checkInNotificationTitle',
    helper: '签到打卡通知消息的标题',
  },
  jiGuangAppKey: {
    label: '极光推送AppKey',
    name: 'jiGuangAppKey',
    helper: '极光推送AppKey',
  },
  jiGuangSecret: {
    label: '极光推送Secret',
    name: 'jiGuangSecret',
    helper: '极光推送Secret',
  },
  jiGuangTestDeviceCode: {
    label: '极光推送测试设备号',
    name: 'jiGuangTestDeviceCode',
    helper: '极光推送测试设备号',
  },
  checkInNotificationFirstParam: {
    label: '签到打卡通知第一参数',
    name: 'checkInNotificationFirstParam',
    helper: '签到打卡通知消息的第一参数',
  },
  checkInNotificationSecondParam: {
    label: '签到打卡通知第二参数',
    name: 'checkInNotificationSecondParam',
    helper: '签到打卡通知消息的第二参数',
  },
  checkInNotificationThirdParam: {
    label: '签到打卡通知第三参数',
    name: 'checkInNotificationThirdParam',
    helper: '签到打卡通知消息的第三参数',
  },
  checkInNotificationFourthParam: {
    label: '签到打卡通知第四参数',
    name: 'checkInNotificationFourthParam',
    helper: '签到打卡通知消息的第四参数',
  },
  checkInNotificationFifthParam: {
    label: '签到打卡通知第五参数',
    name: 'checkInNotificationFifthParam',
    helper: '签到打卡通知消息的第五参数',
  },
  checkInNotificationRemark: {
    label: '签到打卡通知备注',
    name: 'checkInNotificationRemark',
    helper: '签到打卡通知消息的备注',
  },
  weChatOfficialAccountArticleNotificationTemplateId: {
    label: '微信公众号文章通知消息模板',
    name: 'weChatOfficialAccountArticleNotificationTemplateId',
    helper: '文章通知消息模板',
  },
  weChatMiniProgramArticleNotificationPagePath: {
    label: '微信小程序文章通知消息跳转路径',
    name: 'weChatMiniProgramArticleNotificationPagePath',
    helper:
      '文章通知消息跳转路径, 格式如 pages/articleDetail?userId={0}&articleId={1}，占位符{0}代表用户标识，{1}代表顾文章标识',
  },
  weChatOfficialArticleNotificationPagePath: {
    label: '微信公众号文章通知消息跳转路径',
    name: 'weChatOfficialArticleNotificationPagePath',
    helper:
      '文章通知消息跳转路径, 格式如 https://www.a.com/userCenter?userId={0}&articleId={1}，占位符{0}代表用户标识，{1}代表顾文章标识',
  },
  articleNotificationTitle: {
    label: '文章通知标题',
    name: 'articleNotificationTitle',
    helper:
      '文章通知消息的标题, 格式如 文章:{0}，占位符{0}代表文章标题，未设置将直接使用文章标题',
  },
  articleNotificationFirstParam: {
    label: '文章通知第一参数',
    name: 'articleNotificationFirstParam',
    helper: '文章通知消息的第一参数',
  },
  articleNotificationSecondParam: {
    label: '文章通知第二参数',
    name: 'articleNotificationSecondParam',
    helper: '文章通知消息的第二参数',
  },
  articleNotificationThirdParam: {
    label: '文章通知第三参数',
    name: 'articleNotificationThirdParam',
    helper: '文章通知消息的第三参数',
  },
  articleNotificationFourthParam: {
    label: '文章通知第四参数',
    name: 'articleNotificationFourthParam',
    helper: '文章通知消息的第四参数',
  },
  articleNotificationFifthParam: {
    label: '文章通知第五参数',
    name: 'articleNotificationFifthParam',
    helper: '文章通知消息的第五参数',
  },
  articleNotificationRemark: {
    label: '文章通知备注',
    name: 'articleNotificationRemark',
    helper: '文章通知消息的备注',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已停止
   * value : 0
   */
  stop: 0,

  /**
   * 运行中
   * value : 100
   */
  start: 100,
};

export const typeCollection = {
  /**
   * value: 0
   */
  unknown: 0,

  /**
   * value: 100
   */
  mobileApplication: 100,

  /**
   * value : 200
   */
  weChatOfficialAccount: 200,

  /**
   * value: 300
   */
  weChatMiniProgram: 300,
};
