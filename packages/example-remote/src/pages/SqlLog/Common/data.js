import { formNameCollection } from 'antd-management-fast-common';

const extra = {
  collectModeNote: {
    label: '收集模式',
    name: 'collectModeNote',
    helper: '',
  },
  resolveNote: {
    label: '处理状态',
    name: 'resolveNote',
    helper: '',
  },
  channelNote: {
    label: '发生地',
    name: 'channelNote',
    helper: '',
  },
  triggerChannelNote: {
    label: '触发地',
    name: 'triggerChannelNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  sqlLogId: {
    label: '数据标识',
    name: 'sqlLogId',
    helper: '',
  },
  flag: {
    label: '日志GUID',
    name: 'flag',
    helper: '',
  },
  commandString: {
    label: '执行命令',
    name: 'commandString',
    helper: '',
  },
  executeType: {
    label: '执行类型',
    name: 'executeType',
    helper: '',
  },
  stackTraceSnippet: {
    label: '堆栈信息',
    name: 'stackTraceSnippet',
    helper: '',
  },
  startMilliseconds: {
    label: '启始毫秒',
    name: 'startMilliseconds',
    helper: '',
  },
  durationMilliseconds: {
    label: '持续毫秒',
    name: 'durationMilliseconds',
    helper: '',
  },
  firstFetchDurationMilliseconds: {
    label: '首次持续毫秒',
    name: 'firstFetchDurationMilliseconds',
    helper: '',
  },
  errored: {
    label: '发生错误',
    name: 'errored',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  triggerChannel: {
    label: '触发地',
    name: 'triggerChannel',
    helper: '',
  },
  channel: {
    label: '发生地代码',
    name: 'channel',
    helper: '',
  },
  collectMode: {
    label: '收集模式',
    name: 'collectMode',
    helper: '',
  },
  databaseChannel: {
    label: '数据通道',
    name: 'databaseChannel',
    helper: '',
  },
  ip: {
    label: '发生地ip',
    name: 'ip',
    helper: '',
  },
  ...extra,
};
