import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  sqlEntityId: {
    label: '数据标识',
    name: 'sqlEntityId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  label: {
    label: '描述',
    name: 'label',
    helper: '',
  },
  tableName: {
    label: '数据表名',
    name: 'tableName',
    helper: '',
  },
  namespace: {
    label: '名字空间',
    name: 'namespace',
    helper: '',
  },
  assemblyFullName: {
    label: '程序集',
    name: 'assemblyFullName',
    helper: '',
  },
  sqlContent: {
    label: 'SQL信息',
    name: 'sqlContent',
    helper: '',
  },
  fieldAllContent: {
    label: '所有字段信息',
    name: 'fieldAllContent',
    helper: '',
  },
  fieldCustomContent: {
    label: '自定的字段信息',
    name: 'fieldCustomContent',
    helper: '',
  },
  fieldInheritedContent: {
    label: '继承的字段信息',
    name: 'fieldInheritedContent',
    helper: '',
  },
  ...fieldExtraData,
};
