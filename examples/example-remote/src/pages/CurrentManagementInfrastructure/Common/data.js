import { formNameCollection } from '../../../customConfig';

export const fieldDataDefaultImage = {
  key: {
    label: '键名',
    name: 'key',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  tag: {
    label: '标记',
    name: 'tag',
    helper: '',
  },
  value: {
    label: '设定值',
    name: 'value',
    helper: '',
  },
};

export const fieldDataHardDiskPartition = {
  freeSpace: {
    label: '空余大小【GB】',
    name: 'freeSpace',
    helper: '',
  },
  useSpace: {
    label: '已用空间【GB】',
    name: 'useSpace',
    helper: '',
  },
  totalSpace: {
    label: '总共空间【GB】',
    name: 'totalSpace',
    helper: '',
  },
  partitionName: {
    label: '分区名称',
    name: 'partitionName',
    helper: '',
  },
  whetherPrimary: {
    label: '是否主分区',
    name: 'whetherPrimary',
    helper: '',
  },
};

const fieldExtraData = {
  listHardDiskPartition: {
    label: '磁盘信息',
    name: 'listHardDiskPartition',
    helper: '',
  },
  executeCounter: {
    label: '执行调试计数器',
    name: 'executeCounter',
    helper: '',
  },
  executeQueueCount: {
    label: '执行调试队列总数',
    name: 'executeQueueCount',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  name: {
    label: '系统名称',
    name: 'name',
    helper: '系统的名称',
  },
  alias: {
    label: '系统别名',
    name: 'alias',
    helper: '系统的别名',
  },
  organization: {
    label: '所属组织',
    name: 'organization',
    helper: '系统的所属组织',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '系统的简介描述',
  },
  logo: {
    label: 'Logo',
    name: 'logo',
    helper: '系统的Logo',
  },
  createTime: {
    label: '系统创建时间',
    name: 'systemCreateTime',
    helper: '系统的创建时间',
  },
  fileHost: {
    label: '本地文件存储域名',
    name: 'fileHost',
    helper: '本地文件存储域名, 仅使用本地存储时将附加到文件地址之前',
  },
  localStorage: {
    label: '本地存储主仓',
    name: 'localStorage',
    helper: '本地存储主仓, 用于组织部署存储文件夹映射, 不应构建在Url中',
  },
  generalStorage: {
    label: '本地通用存储主仓',
    name: 'generalStorage',
    helper: '本地通用存储主仓',
  },
  imageStorage: {
    label: '本地通用图片仓',
    name: 'imageStorage',
    helper: '本地通用图片仓',
  },
  videoStorage: {
    label: '本地通用视频仓',
    name: 'videoStorage',
    helper: '本地通用视频仓',
  },
  audioStorage: {
    label: '本地通用音频仓',
    name: 'audioStorage',
    helper: '本地通用音频仓',
  },
  fileStorage: {
    label: '本地通用文件仓',
    name: 'fileStorage',
    helper: '本地通用文件仓',
  },
  workflowStorage: {
    label: '本地工作流仓',
    name: 'workflowStorage',
    helper: '本地工作流仓',
  },
  workflowDebugStorage: {
    label: '本地工作流调试仓',
    name: 'workflowDebugStorage',
    helper: '本地工作流调试仓',
  },
  imageUploadMaxSize: {
    label: '图片文件上传限额 (MB)',
    name: 'imageUploadMaxSize',
    helper: '图片文件上传限额 (MB)',
  },
  videoUploadMaxSize: {
    label: '视频文件上传限额 (MB)',
    name: 'videoUploadMaxSize',
    helper: '视频文件上传限额 (MB)',
  },
  audioUploadMaxSize: {
    label: '音频文件上传限额 (MB)',
    name: 'audioUploadMaxSize',
    helper: '音频文件上传限额 (MB)',
  },
  fileUploadMaxSize: {
    label: '一般文件上传限额 (MB)',
    name: 'fileUploadMaxSize',
    helper: '一般文件上传限额 (MB)',
  },
  privateKey: {
    label: '系统私钥',
    name: 'privateKey',
    helper: '',
  },
  publicKey: {
    label: '系统公钥',
    name: 'publicKey',
    helper: '',
  },
  defaultProvinceCode: {
    label: '默认省级地区展开节点',
    name: 'defaultProvinceCode',
    helper: '',
  },
  defaultProvinceTreeProvinceNodeVisibility: {
    label: '默认省级地区树根省级节点可见性',
    name: 'defaultProvinceTreeProvinceNodeVisibility',
    helper: '即是否使用默认的地区节点包裹子元素',
  },
  defaultCityCode: {
    label: '默认市级地区展开节点',
    name: 'defaultCityCode',
    helper: '',
  },
  defaultCityTreeCityNodeVisibility: {
    label: '默认市级地区树根省级节点可见性',
    name: 'defaultCityTreeCityNodeVisibility',
    helper: '即是否使用默认的地区节点包裹子元素',
  },
  flowApproveTimeWhetherDisplayTime: {
    label: '流程审批时间是否显示时分秒',
    name: 'flowApproveTimeWhetherDisplayTime',
    helper: '',
  },
  flowApplicantStatementTitleTemplate: {
    label: '申请陈述标题模板',
    name: 'flowApplicantStatementTitleTemplate',
    helper: '',
  },
  flowApplicantStatementContentTemplate: {
    label: '申请陈述内容模板',
    name: 'flowApplicantStatementContentTemplate',
    helper: '',
  },
  flowAttentionStatementTitleTemplate: {
    label: '经办陈述标题模板',
    name: 'flowAttentionStatementTitleTemplate',
    helper: '',
  },
  flowAttentionStatementContentTemplate: {
    label: '经办陈述内容模板',
    name: 'flowAttentionStatementContentTemplate',
    helper: '',
  },
  flowDebugUserId: {
    label: '用于流程调试的用户标识',
    name: 'flowDebugUserId',
    helper: '',
  },
  flowDebugSubsidiaryId: {
    label: '用于流程调试的企业标识',
    name: 'flowDebugSubsidiaryId',
    helper: '',
  },
  flowDebugApproverMode: {
    label: '用于流程调试的审批人模式',
    name: 'flowDebugApproverMode',
    helper: '',
  },
  flowDebugApproverModeNote: {
    label: '用于流程调试的审批人模式',
    name: 'flowDebugApproverModeNote',
    helper: '',
  },
  flowDebugUserRealName: {
    label: '用于流程调试的用户姓名',
    name: 'flowDebugUserRealName',
    helper: '',
  },
  flowDebugSubsidiaryShortName: {
    label: '用于流程调试的企业简称',
    name: 'flowDebugSubsidiaryShortName',
    helper: '',
  },
  flowDebugSubsidiaryFullName: {
    label: '用于流程调试的企业全称',
    name: 'flowDebugSubsidiaryFullName',
    helper: '',
  },
  flowApproveNotificationSmsSearchStartTime: {
    label: '流程审批短信通知检索起始时间',
    name: 'flowApproveNotificationSmsSearchStartTime',
    helper: '',
  },
  flowApproveNotificationTemplate: {
    label: '用于流程审批的系统消息模板',
    name: 'flowApproveNotificationTemplate',
    helper: '',
  },
  flowApproveNotificationClientTemplate: {
    label: '用于流程审批的客户端通知模板',
    name: 'flowApproveNotificationClientTemplate',
    helper: '',
  },
  flowApproveNotificationSmsTemplate: {
    label: '用于流程审批的短信通知模板',
    name: 'flowApproveNotificationSmsTemplate',
    helper: '',
  },
  flowCarbonCopyNotificationTemplate: {
    label: '用于流程调试的抄送消息模板',
    name: 'flowCarbonCopyNotificationTemplate',
    helper: '',
  },
  flowCaseCanHideWhenRejected: {
    label: '流程实例被拒绝后能否做被隐藏操作',
    name: 'flowCaseCanHideWhenRejected',
    helper: '',
  },
  masterManagementTokenExpirationTime: {
    label: '主控系统登录凭据有效期 (分钟)',
    name: 'masterManagementTokenExpirationTime',
    helper: '',
  },
  userManagementTokenExpirationTime: {
    label: '用户客户端系统登录凭据有效期 (分钟)',
    name: 'userManagementTokenExpirationTime',
    helper: '',
  },
  userApplicationTokenExpirationTime: {
    label: '用户应用端系统登录凭据有效期 (分钟)',
    name: 'userApplicationTokenExpirationTime',
    helper: '',
  },
  userWechatApplicationTokenExpirationTime: {
    label: '用户小程序端系统登录凭据有效期 (分钟)',
    name: 'userWechatApplicationTokenExpirationTime',
    helper: '',
  },
  messageQueueMode: {
    label: '消息队列模式',
    name: 'messageQueueMode',
    helper: '',
  },
  messageQueueModeNote: {
    label: '消息队列模式',
    name: 'messageQueueModeNote',
    helper: '',
  },
  messageQueueModeTag: {
    label: '消息队列模式',
    name: 'messageQueueModeTag',
    helper: '',
  },
  messageQueueToStoreMode: {
    label: '消息存储模式',
    name: 'messageQueueToStoreMode',
    helper: '',
  },
  messageQueueToStoreModeNote: {
    label: '消息存储模式',
    name: 'messageQueueToStoreModeNote',
    helper: '',
  },
  messageQueueToStoreModeTag: {
    label: '消息存储模式',
    name: 'messageQueueToStoreModeTag',
    helper: '',
  },
  cacheMode: {
    label: '缓存模式',
    name: 'cacheMode',
    helper: '',
  },
  cacheModeNote: {
    label: '缓存模式',
    name: 'cacheModeNote',
    helper: '',
  },
  cacheModeTag: {
    label: '缓存模式',
    name: 'cacheModeTag',
    helper: '',
  },
  tinymceScriptSrc: {
    label: 'tinymce脚本资源',
    name: 'tinymceScriptSrc',
    helper: '',
  },
  tinymceScriptSrcNote: {
    label: 'tinymce脚本资源',
    name: 'tinymceScriptSrcNote',
    helper: '',
  },
  tinymceScriptSrcTag: {
    label: 'tinymce脚本资源',
    name: 'tinymceScriptSrcTag',
    helper: '',
  },
  diskSpaceMonitoringSwitch: {
    label: '磁盘空间监控开关',
    name: 'diskSpaceMonitoringSwitch',
    helper: '',
  },
  diskSpaceMonitoringDriveLetter: {
    label: '磁盘空间监控盘符',
    name: 'diskSpaceMonitoringDriveLetter',
    helper: '多盘符请用 ”,“ 符号分隔, 例如”E,F“, 注意使用英文逗号',
  },
  diskSpaceMonitoringAlarmThreshold: {
    label: '磁盘空间预警阈值[GB]',
    name: 'diskSpaceMonitoringAlarmThreshold',
    helper: '键盘可用空间小于该阈值时发送预警信息',
  },
  diskSpaceMonitoringAlarmSmsNotificationTemplate: {
    label: '磁盘空间预警短信消息模板',
    name: 'diskSpaceMonitoringAlarmSmsNotificationTemplate',
    helper:
      '消息模板示例: “磁盘可用空间紧张, {0}”, 占位符将替换为具体的磁盘信息, 若最终短信字数过多, 可能分为多条发送',
  },
  diskSpaceMonitoringAlarmPhone: {
    label: '磁盘空间预警收短信手机号码',
    name: 'diskSpaceMonitoringAlarmPhone',
    helper: '配置接收预警信息的人员手机号码',
  },
  diskSpaceMonitoringAlarmEmailNotificationTemplate: {
    label: '磁盘空间预警邮件消息模板',
    name: 'diskSpaceMonitoringAlarmEmailNotificationTemplate',
    helper:
      '消息模板示例: “磁盘可用空间紧张, {0}”, 占位符将替换为具体的磁盘信息',
  },
  diskSpaceMonitoringAlarmFromEmailName: {
    label: '磁盘空间预警发送源邮箱邮件名',
    name: 'diskSpaceMonitoringAlarmFromEmailName',
    helper: '要发送的邮件的名称',
  },
  diskSpaceMonitoringAlarmFromEmailAddress: {
    label: '磁盘空间预警发送源邮箱地址',
    name: 'diskSpaceMonitoringAlarmFromEmailAddress',
    helper: '发送人的邮箱地址',
  },
  diskSpaceMonitoringAlarmToEmailName: {
    label: '磁盘空间预警发送给的邮箱邮件名',
    name: 'diskSpaceMonitoringAlarmToEmailName',
    helper: '接收人接收到的邮件的名称',
  },
  diskSpaceMonitoringAlarmToEmailAddress: {
    label: '磁盘空间预警发送给的邮箱地址',
    name: 'diskSpaceMonitoringAlarmToEmailAddress',
    helper: '接收邮件的邮箱地址',
  },
  diskSpaceMonitoringAlarmEmailSmtpServerHost: {
    label: '磁盘空间预警邮箱Smtp域名',
    name: 'diskSpaceMonitoringAlarmEmailSmtpServerHost',
    helper: '例如若使用smtp.qq.com, 使用SSL, 端口号465, 其他邮箱请查阅资料',
  },
  diskSpaceMonitoringAlarmEmailSmtpServerPort: {
    label: '磁盘空间预警邮箱Smtp端口',
    name: 'diskSpaceMonitoringAlarmEmailSmtpServerPort',
    helper: '例如若使用smtp.qq.com, 使用SSL, 端口号465, 其他邮箱请查阅资料',
  },
  diskSpaceMonitoringAlarmEmailSmtpServerUseSsl: {
    label: '磁盘空间预警邮箱Smtp是否使用SSL',
    name: 'diskSpaceMonitoringAlarmEmailSmtpServerUseSsl',
    helper: '例如若使用smtp.qq.com, 使用SSL, 端口号465, 其他邮箱请查阅资料',
  },
  diskSpaceMonitoringAlarmEmailSmtpServerAccount: {
    label: '磁盘空间预警邮箱Smtp账户',
    name: 'diskSpaceMonitoringAlarmEmailSmtpServerAccount',
    helper: '发送邮件使用的邮箱账户',
  },
  diskSpaceMonitoringAlarmEmailSmtpServerPassword: {
    label: '磁盘空间预警邮箱Smtp密码',
    name: 'diskSpaceMonitoringAlarmEmailSmtpServerPassword',
    helper: '一般为授权码,例如QQ邮箱是设置里开启服务的时候给的授权码',
  },
  diskSpaceMonitoringDetectionEmailNotificationTemplate: {
    label: '磁盘空间检测邮件消息模板',
    name: 'diskSpaceMonitoringDetectionEmailNotificationTemplate',
    helper:
      '消息模板示例: “磁盘可用空间信息, {0}”, 占位符将替换为具体的磁盘信息',
  },
  diskSpaceMonitoringDetectionFromEmailName: {
    label: '磁盘空间检测发送源邮箱邮件名',
    name: 'diskSpaceMonitoringDetectionFromEmailName',
    helper: '要发送的邮件的名称',
  },
  diskSpaceMonitoringDetectionFromEmailAddress: {
    label: '磁盘空间检测发送源邮箱地址',
    name: 'diskSpaceMonitoringDetectionFromEmailAddress',
    helper: '发送人的邮箱地址',
  },
  diskSpaceMonitoringDetectionToEmailName: {
    label: '磁盘空间检测发送给的邮箱邮件名',
    name: 'diskSpaceMonitoringDetectionToEmailName',
    helper: '接收人接收到的邮件的名称',
  },
  diskSpaceMonitoringDetectionToEmailAddress: {
    label: '磁盘空间检测发送给的邮箱地址',
    name: 'diskSpaceMonitoringDetectionToEmailAddress',
    helper: '接收邮件的邮箱地址',
  },
  diskSpaceMonitoringDetectionEmailSmtpServerHost: {
    label: '磁盘空间检测邮箱Smtp域名',
    name: 'diskSpaceMonitoringDetectionEmailSmtpServerHost',
    helper: '例如若使用smtp.qq.com, 使用SSL, 端口号465, 其他邮箱请查阅资料',
  },
  diskSpaceMonitoringDetectionEmailSmtpServerPort: {
    label: '磁盘空间检测邮箱Smtp端口',
    name: 'diskSpaceMonitoringDetectionEmailSmtpServerPort',
    helper: '例如若使用smtp.qq.com, 使用SSL, 端口号465, 其他邮箱请查阅资料',
  },
  diskSpaceMonitoringDetectionEmailSmtpServerUseSsl: {
    label: '磁盘空间检测邮箱Smtp是否使用SSL',
    name: 'diskSpaceMonitoringDetectionEmailSmtpServerUseSsl',
    helper: '例如若使用smtp.qq.com, 使用SSL, 端口号465, 其他邮箱请查阅资料',
  },
  diskSpaceMonitoringDetectionEmailSmtpServerAccount: {
    label: '磁盘空间检测邮箱Smtp账户',
    name: 'diskSpaceMonitoringDetectionEmailSmtpServerAccount',
    helper: '发送邮件使用的邮箱账户',
  },
  diskSpaceMonitoringDetectionEmailSmtpServerPassword: {
    label: '磁盘空间检测邮箱Smtp密码',
    name: 'diskSpaceMonitoringDetectionEmailSmtpServerPassword',
    helper: '一般为授权码,例如QQ邮箱是设置里开启服务的时候给的授权码',
  },
  scoreAlias: {
    label: '积分别名',
    name: 'scoreAlias',
    helper: '',
  },
  flowFormDisplayModeWhenApproval: {
    label: '流程表单审批时的显示模式',
    name: 'flowFormDisplayModeWhenApproval',
    helper: '',
  },
  obtainScoreByReadSwitch: {
    label: '通过阅读获取积分',
    name: 'obtainScoreByReadSwitch',
    helper: '',
  },
  obtainScoreWhenRead: {
    label: '阅读时发放的积分数额',
    name: 'obtainScoreWhenRead',
    helper: '',
  },
  obtainFromReadDailyLimit: {
    label: '阅读文章每日积分数额获取上限',
    name: 'obtainFromReadDailyLimit',
    helper: '',
  },
  qiniu: {
    label: '七牛云',
    qiniuImageSwitch: {
      label: '七牛云图片转存开关',
      name: 'qiniuImageSwitch',
      helper: '七牛云图片转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    qiniuVideoSwitch: {
      label: '七牛云视频转存开关',
      name: 'qiniuVideoSwitch',
      helper: '七牛云视频转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    qiniuAudioSwitch: {
      label: '七牛云音频转存开关',
      name: 'qiniuAudioSwitch',
      helper: '七牛云音频转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    qiniuFileSwitch: {
      label: '七牛云文件转存开关',
      name: 'qiniuFileSwitch',
      helper: '七牛云文件转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    accessKey: {
      label: 'AccessKey',
      name: 'qiniuAccessKey',
      helper: '',
    },
    secretKey: {
      label: 'SecretKey',
      name: 'qiniuSecretKey',
      helper: '',
    },
    bucket: {
      label: '文件仓',
      name: 'qiniuBucket',
      helper: '',
    },
    useHttps: {
      label: 'Https使用',
      name: 'qiniuUseHttps',
      helper: '',
    },
    rootUrl: {
      label: '自动补全域名',
      name: 'qiniuRootUrl',
      helper: '相对路径文件自动追加的域名信息',
    },
  },
  sms: {
    label: '短信',
    shortMessagingServiceEffective: {
      label: '生效的短信服务供应商',
      name: 'shortMessagingServiceEffective',
      helper: '',
    },
    shortMessagingServiceEffectiveNote: {
      label: '生效的短信服务供应商',
      name: 'shortMessagingServiceEffectiveNote',
      helper: '',
    },
    shortMessagingServiceEffectiveTag: {
      label: '生效的短信服务供应商',
      name: 'shortMessagingServiceEffectiveTag',
      helper: '',
    },
    shortMessagingServiceYunPianKey: {
      label: '云片短信平台Key',
      name: 'shortMessagingServiceYunPianKey',
      helper: '',
    },
    shortMessagingServiceYunPianSignature: {
      label: '云片短信签名',
      name: 'shortMessagingServiceYunPianSignature',
      helper: '',
    },
    shortMessagingServiceAliYunSignature: {
      label: '阿里云短信签名',
      name: 'shortMessagingServiceAliYunSignature',
      helper: '',
    },
    shortMessagingServiceAliYunAccessKeyId: {
      label: '阿里云短信平台KeyId',
      name: 'shortMessagingServiceAliYunAccessKeyId',
      helper: '',
    },
    shortMessagingServiceAliYunAccessKeySecret: {
      label: '阿里云短信平台KeySecret',
      name: 'shortMessagingServiceAliYunAccessKeySecret',
      helper: '',
    },
    shortMessagingServiceAliYunEndpoint: {
      label: '阿里云短信平台Endpoint',
      name: 'shortMessagingServiceAliYunEndpoint',
      helper: '',
    },
  },
  ...fieldExtraData,
};
