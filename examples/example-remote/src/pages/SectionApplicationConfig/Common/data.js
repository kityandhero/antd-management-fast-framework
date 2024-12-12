import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  sectionApplicationConfigId: {
    label: '数据标识',
    name: 'sectionApplicationConfigId',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
    helper: '',
  },
  applicationName: {
    label: '应用名称',
    name: 'applicationName',
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
  name: {
    label: '配置名称',
    name: 'name',
    helper: '栏目配置的名称',
  },
  targetPath: {
    label: '适用页面',
    name: 'targetPath',
    helper: '栏目配置的适用页面',
  },
  customConfiguration: {
    label: '自定义配置',
    name: 'customConfiguration',
    helper: '栏目在应用特定页面上的自定义配置',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '栏目配置的创建时间',
  },
  createOperatorId: {
    label: '创建人',
    name: 'createOperatorId',
    helper: '栏目配置的创建人',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '栏目配置的更新时间',
  },
  updateOperatorId: {
    label: '更新人',
    name: 'updateOperatorId',
    helper: '栏目配置的更新人',
  },
  configItemCount: {
    label: '自定义配置数量',
    name: 'configItemCount',
    helper: '栏目在应用特定页面上的自定义配置数量',
  },
};

export const configItemData = {
  ...formNameCollection,
  id: {
    label: '数据标识',
    name: 'id',
    helper: '',
  },
  sectionApplicationConfigId: {
    label: '栏目配置标识',
    name: 'sectionApplicationConfigId',
    helper: '',
  },
  sectionApplicationConfigName: {
    label: '栏目配置名称',
    name: 'sectionApplicationConfigName',
    helper: '栏目配置的名称',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
    helper: '',
  },
  applicationName: {
    label: '应用名称',
    name: 'applicationName',
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
  sectionApplicationConfigTargetPath: {
    label: '适用页面',
    name: 'sectionApplicationConfigTargetPath',
    helper: '栏目配置的适用页面',
  },
  name: {
    label: '键名',
    name: 'name',
    helper: '自定义配置的键名',
  },
  value: {
    label: '键值',
    name: 'value',
    helper: '自定义配置的键值',
  },
};
