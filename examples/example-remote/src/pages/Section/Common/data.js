import { formNameCollection } from '../../../customConfig';
import { fieldData as fieldDataManagement } from '../../CurrentManagementInfrastructure/Common/data';

export const fieldExtraData = {
  scoreAlias: fieldDataManagement.scoreAlias,
  obtainScoreByReadSwitch: fieldDataManagement.obtainScoreByReadSwitch,
  obtainScoreWhenRead: fieldDataManagement.obtainScoreWhenRead,
  obtainScoreWhenReadSection: {
    label: '阅读栏目时发放的积分数额',
    name: 'obtainScoreWhenReadSection',
    helper: '',
  },
  obtainFromReadDailyLimit: fieldDataManagement.obtainFromReadDailyLimit,
};

export const fieldData = {
  ...formNameCollection,
  sectionId: {
    label: '数据标识',
    name: 'sectionId',
    helper: '',
  },
  parentId: {
    label: '上级标识',
    name: 'parenId',
    helper: '栏目的上级',
  },
  name: {
    label: '栏目名称',
    name: 'name',
    helper: '栏目的名称,便于展示和后台管理',
  },
  image: {
    label: '主图',
    name: 'image',
    helper: '栏目的正方形主图',
  },
  rectangleImage: {
    label: '长方形图片',
    name: 'rectangleImage',
    helper: '栏目的长方形图片',
  },
  video: {
    label: '视频地址',
    name: 'video',
    helper: '上传的视频资源',
  },
  audio: {
    label: '音频地址',
    name: 'audio',
    helper: '上传的音频资源',
  },
  attachment: {
    label: '附件',
    name: 'attachment',
    helper: '',
  },
  contentData: {
    label: '详细内容',
    name: 'contentData',
    helper: '栏目的详细内容',
  },
  mediaData: {
    label: '媒体内容',
    name: 'mediaData',
    helper: '栏目的媒体内容',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '栏目的排序值',
  },
  renderType: {
    label: '渲染模式',
    name: 'renderType',
    helper: '栏目的渲染模式',
  },
  renderTypeNote: {
    label: '渲染模式',
    name: 'renderTypeNote',
    helper: '栏目的渲染模式',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '栏目的适用业务',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '栏目的适用业务',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  keyword: {
    label: '关键词',
    name: 'keyword',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '',
  },
  whetherRecommend: {
    label: '推荐',
    name: 'whetherRecommend',
    helper: '',
  },
  whetherTop: {
    label: '置顶',
    name: 'whetherTop',
    helper: '',
  },
  whetherVisible: {
    label: '可见性',
    name: 'whetherVisible',
    helper: '',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '信息创建时间',
  },
  updateTime: {
    label: '上次更新时间',
    name: 'updateTime',
    helper: '信息上次更新时间',
  },
  parentName: {
    label: '上级栏目',
    name: 'parentName',
    helper: '',
  },
  whetherRecommendNote: {
    label: '推荐',
    name: 'whetherRecommendNote',
    helper: '',
  },
  whetherTopNote: {
    label: '置顶',
    name: 'whetherTopNote',
    helper: '',
  },
  whetherVisibleNote: {
    label: '可见性',
    name: 'whetherVisibleNote',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 下线
   * value : 0
   */
  offline: 0,

  /**
   * 上线
   * value : 10
   */
  online: 10,
};
