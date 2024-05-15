import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  sectionId: {
    label: '数据标识',
    name: 'sectionId',
    helper: '',
  },
  platformId: {
    label: '平台标识',
    name: 'platformId',
    helper: '',
  },
  name: {
    label: '栏目名称',
    name: 'name',
    helper: '栏目的名称,便于展示和后台管理',
  },
  parentId: {
    label: '上级栏目',
    name: 'parentId',
    helper: '',
  },
  image: {
    label: '正方形图片',
    name: 'image',
    helper: '栏目的正方形图片',
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
    helper: '文章的详细内容',
  },
  mediaData: {
    label: '媒体内容',
    name: 'mediaData',
    helper: '文章的媒体内容',
  },
  renderType: {
    label: '渲染模式',
    name: 'renderType',
    helper: '文章的渲染模式',
  },
  renderTypeNote: {
    label: '渲染模式',
    name: 'renderTypeNote',
    helper: '文章的渲染模式',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '栏目的排序值',
  },
  description: {
    label: '简介描述 ',
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
  readArticleObtainScoreSwitch: {
    label: '阅读时奖励积分开关',
    name: 'readArticleObtainScoreSwitch',
    helper: '设置阅读时奖励积分开/关',
  },
  obtainScoreWhenReadArticle: {
    label: '阅读时发放的积分数额',
    name: 'obtainScoreWhenReadArticle',
    helper: '设置阅读时发放的积分数额',
  },
  obtainFromReadArticleDailyLimit: {
    label: '阅读文章每日积分数额获取上限',
    name: 'obtainFromReadArticleDailyLimit',
    helper: '设置阅读文章每日积分数额获取上限',
  },
};

export const mediaItemData = {
  id: {
    label: '数据标识',
    name: 'id',
    helper: '',
  },
  mediaType: {
    label: '媒体类型',
    name: 'mediaType',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '文字段落',
    name: 'description',
    helper: '文章的文字段落',
  },
  image: {
    label: '配图',
    name: 'image',
    helper: '',
  },
  link: {
    label: '链接',
    name: 'link',
    helper: '',
  },
  video: {
    label: '视频',
    name: 'video',
    helper: '',
  },
  audio: {
    label: '音频',
    name: 'audio',
    helper: '',
  },
  attachment: {
    label: '附件',
    name: 'attachment',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  createTime: {
    label: '发布时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '最后更新时间',
    name: 'updateTime',
    helper: '',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 下线
   * value : 1
   */
  offline: 0,

  /**
   * 上线
   * value : 1
   */
  online: 10,
};
