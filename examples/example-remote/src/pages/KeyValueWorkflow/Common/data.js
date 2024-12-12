import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  keyValueWorkflowId: {
    label: '数据标识',
    name: 'keyValueWorkflowId',
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
  ...fieldExtraData,
};
