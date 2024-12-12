import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  webChannelId: {
    label: '上级区划',
    name: 'webChannelId',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  errorLogId: {
    label: 'Web渠道',
    name: 'errorLogId',
    helper: '',
  },
  userId: {
    label: '相关用户标识',
    name: 'userId',
    helper: '',
  },
  url: {
    label: 'Url入口',
    name: 'url',
    helper: '',
  },
  message: {
    label: '消息内容',
    name: 'message',
    helper: '',
  },
  description: {
    label: '消息描述',
    name: 'description',
    helper: '',
  },
  ancillaryInformation: {
    label: '附属信息',
    name: 'ancillaryInformation',
    helper: '',
  },
  stackTrace: {
    label: '堆栈跟踪',
    name: 'stackTrace',
    helper: '',
  },
  source: {
    label: '源代码信息',
    name: 'source',
    helper: '',
  },
  scene: {
    label: '场景描述',
    name: 'scene',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '',
  },
  typeNote: {
    label: '类型说明',
    name: 'typeNote',
    helper: '',
  },
  degree: {
    label: '重要程度',
    name: 'degree',
    helper: '',
  },
  degreeNote: {
    label: '重要程度说明',
    name: 'degreeNote',
    helper: '',
  },
  sendNotification: {
    label: '错误产生时是否发送通知',
    name: 'sendNotification',
    helper: '',
  },
  sendResult: {
    label: '通知发送结果（成功/失败）',
    name: 'sendResult',
    helper: '',
  },
  sendTime: {
    label: '发送时间',
    name: 'sendTime',
    helper: '',
  },
  header: {
    label: '网络请求头信息',
    name: 'header',
    helper: '',
  },
  headerJson: {
    label: '网络请求头信息',
    name: 'headerJson',
    helper: '',
  },
  payloadParams: {
    label: '网络请求payload参数',
    name: 'payloadParams',
    helper: '',
  },
  payloadParamsJson: {
    label: '网络请求payload参数',
    name: 'payloadParamsJson',
    helper: '',
  },
  formParams: {
    label: '表单参数',
    name: 'formParams',
    helper: '',
  },
  formParamsJson: {
    label: '表单参数',
    name: 'formParamsJson',
    helper: '',
  },
  urlParams: {
    label: '网络请求Url参数',
    name: 'urlParams',
    helper: '',
  },
  urlParamsJson: {
    label: '网络请求Url参数',
    name: 'urlParamsJson',
    helper: '',
  },
  host: {
    label: '域名',
    name: 'host',
    helper: '',
  },
  port: {
    label: '端口',
    name: 'port',
    helper: '',
  },
  log: {
    label: '自定义日志',
    name: 'log',
    helper: '',
  },
  data: {
    label: '异常自定义数据',
    name: 'data',
    helper: '',
  },
  resolve: {
    label: '解决状态',
    name: 'resolve',
    helper: '',
  },
  resolveNote: {
    label: '解决状态说明',
    name: 'resolveNote',
    helper: '',
  },
  autoRemark: {
    label: '自动备注',
    name: 'autoRemark',
    helper: '',
  },
  ip: {
    label: '触发IP',
    name: 'ip',
    helper: '',
  },
  channel: {
    label: '发生地点',
    name: 'channel',
    helper: '',
  },
  channelNote: {
    label: '日志来源',
    name: 'channelNote',
    helper: '日志产生的来源标识文本（例如哪个产品的名字）',
  },
  exceptionTypeName: {
    label: '异常类型名称',
    name: 'exceptionTypeName',
    helper: '',
  },
  exceptionTypeFullName: {
    label: '异常类型全名',
    name: 'exceptionTypeFullName',
    helper: '',
  },
  channelOptionName: {
    label: '触发渠道',
    name: 'channelOptionName',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  ...fieldExtraData,
};
