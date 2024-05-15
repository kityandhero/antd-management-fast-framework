import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  title: {
    label: '通道',
    name: 'title',
    helper: '开关的名称',
  },
  tag: {
    label: '标识码',
    name: 'tag',
    helper: '',
  },
  key: {
    label: '名称',
    name: 'key',
    helper: '开关的键名',
  },
  value: {
    label: '执行日志记录',
    name: 'value',
    // helper: '开关的键值',
  },
};
