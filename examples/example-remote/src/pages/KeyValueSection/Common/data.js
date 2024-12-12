import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  keyValueSectionId: {
    label: '数据标识',
    name: 'keyValueSectionId',
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
  sectionId: {
    label: '栏目标识',
    name: 'sectionId',
    helper: '',
  },
  sectionName: {
    label: '栏目名称',
    name: 'sectionName',
    helper: '',
  },
  ...fieldExtraData,
};
