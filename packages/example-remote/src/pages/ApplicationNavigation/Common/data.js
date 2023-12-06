import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  applicationNavigationId: {
    label: '数据标识',
    name: 'applicationNavigationId',
    helper: '',
  },
  applicationId: {
    label: '应用标识',
    name: 'applicationId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '导航配置的名称',
  },
  uniqueMark: {
    label: '唯一标记',
    name: 'uniqueMark',
    helper: '导航配置的标记, 同一适用页面下需要唯一',
  },
  targetPath: {
    label: '适用页面',
    name: 'targetPath',
    helper: '导航配置的适用页面',
  },
  navigationCollection: {
    label: '导航集合',
    name: 'navigationCollection',
    helper: '导航配置的导航集合',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '导航配置的创建时间',
  },
  createOperatorId: {
    label: '创建人',
    name: 'createOperatorId',
    helper: '导航配置的创建人',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '导航配置的更新时间',
  },
  updateOperatorId: {
    label: '更新人',
    name: 'updateOperatorId',
    helper: '导航配置的更新人',
  },
  navigationItemCount: {
    label: '导航数量',
    name: 'navigationItemCount',
    helper: '导航配置的导航数量',
  },
};

export const navigationItemData = {
  ...formNameCollection,

  id: {
    label: '数据标识',
    name: 'id',
    helper: '',
  },
  applicationNavigationId: {
    label: '导航配置标识',
    name: 'applicationNavigationId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '导航配置的标题',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '导航配置的简介描述',
  },
  icon: {
    label: '图标',
    name: 'icon',
    helper: '导航配置的图标',
  },
  operationType: {
    label: '交互类型',
    name: 'operationType',
    helper: '导航配置的交互类型',
  },
  visibility: {
    label: '可见性',
    name: 'visibility',
    helper: '导航配置的可见性',
  },
  accessibility: {
    label: '可访问性',
    name: 'accessibility',
    helper: '导航配置的可访问性',
  },
  exteriorMicroAppId: {
    label: '外部小程序标识',
    name: 'exteriorMicroAppId',
    helper: '导航配置的外部小程序标识',
  },
  path: {
    label: '路径',
    name: 'path',
    helper: '导航配置的路径',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '导航配置的排序值',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '导航配置的创建时间',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '导航配置的更新时间',
  },
  operationTypeNote: {
    label: '交互类型',
    name: 'operationTypeNote',
    helper: '导航配置的交互类型',
  },
  visibilityNote: {
    label: '可见性',
    name: 'visibilityNote',
    helper: '导航配置的可见性',
  },
  accessibilityNote: {
    label: '可访问性',
    name: 'accessibilityNote',
    helper: '导航配置的可访问性',
  },
};

/**
 * 交互类型集合
 */
export const operationTypeCollection = {
  /**
   * 无交互
   * value : 0
   */
  none: 0,

  /**
   * 小程序页面跳转
   * value : 100
   */
  microAppPage: 100,

  /**
   * 网页跳转
   * value : 200
   */
  webPath: 200,
};

/**
 * 访问性集合
 */
export const accessibilityCollection = {
  /**
   * 禁止访问
   * value : 0
   */
  forbidden: 0,

  /**
   * 允许访问
   * value : 100
   */
  allow: 1,
};

/**
 * 可见性集合
 */
export const visibilityCollection = {
  /**
   * 隐藏
   * value : 0
   */
  hidden: 0,

  /**
   * 显示
   * value : 100
   */
  visible: 1,
};
