import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  parentName: {
    label: '上级区划',
    name: 'parentName',
    helper: '',
  },
  wrapperVisibility: {
    label: '地区包裹节点可见性',
    name: 'wrapperVisibility',
    helper: '',
  },
  wrapperName: {
    label: '包裹名',
    name: 'wrapperName',
    helper: '',
  },
  crossingLevel: {
    label: '横跨级别',
    name: 'crossingLevel',
    helper: '',
  },
  refresh: {
    label: '强制刷新',
    name: 'refresh',
    helper: '',
  },
  areaCode: {
    label: '当前地区代码',
    name: 'areaCode',
    helper: '',
  },
  areaName: {
    label: '当前地区',
    name: 'areaName',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  administrativeDivisionId: {
    label: '主键标识',
    name: 'administrativeDivisionId',
    helper: '',
  },
  code: {
    label: '地区代码',
    name: 'code',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  shortName: {
    label: '简称',
    name: 'shortName',
    helper: '',
  },
  letter: {
    label: '字母',
    name: 'letter',
    helper: '',
  },
  municipal: {
    label: '行政中心',
    name: 'municipal',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  parentCode: {
    label: '上级代码',
    name: 'parentCode',
    helper: '',
  },
  level: {
    label: '地区等级',
    name: 'level',
    helper: '',
  },
  hasChild: {
    label: '是否有下级',
    name: 'hasChild',
    helper: '',
  },
  whetherCapital: {
    label: '是否首都',
    name: 'whetherCapital',
    helper: '',
  },
  hot: {
    label: '热门城市',
    name: 'hot',
    helper: '',
  },
  regionalAdministrativeRand: {
    label: '区域行政区划',
    name: 'regionalAdministrativeRand',
    helper: '',
  },
  content: {
    label: '内容',
    name: 'content',
    helper: '',
  },
  whetherPoverty: {
    label: '是否贫困地区',
    name: 'whetherPoverty',
    helper: '',
  },
  initialsSet: {
    label: '首字母',
    name: 'initialsSet',
    helper: '',
  },
  sourceName: {
    label: '来源名称',
    name: 'sourceName',
    helper: '',
  },
  longitude: {
    label: '经度',
    name: 'longitude',
    helper: '',
  },
  latitude: {
    label: '纬度',
    name: 'latitude',
    helper: '',
  },
  adminRemark: {
    label: '操作备注',
    name: 'adminRemark',
    helper: '',
  },
  iP: {
    label: 'IP地址',
    name: 'iP',
    helper: '',
  },
  remark: {
    label: '备注',
    name: 'remark',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
