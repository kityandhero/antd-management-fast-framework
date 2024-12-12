import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  keyValueApplicationId: {
    label: '数据标识',
    name: 'keyValueApplicationId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  tag: {
    label: '唯一标记',
    name: 'tag',
    helper: '',
  },
  key: {
    label: '键',
    name: 'key',
    helper: '',
  },
  value: {
    label: '值',
    name: 'value',
    helper: '',
  },
  applicationId: {
    label: '应用表示',
    name: 'applicationId',
    helper: '',
  },
  applicationName: {
    label: '应用名称',
    name: 'applicationName',
    helper: '',
  },
  ...fieldExtraData,
};
