import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  keyValueInfrastructureId: {
    label: '数据标识',
    name: 'keyValueInfrastructureId',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
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
