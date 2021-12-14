import { formNameCollection } from 'antd-management-fast-framework/es/utils/constants';

export const fieldData = {
  ...(formNameCollection || {}),
  ...{
    articleId: {
      label: '数据标识',
      name: 'articleId',
      helper: '',
    },
    title: {
      label: '标题',
      name: 'title',
      helper: '文章的标题',
    },
    subtitle: {
      label: '副标题',
      name: 'subtitle',
      helper: '文章的副标题',
    },
    sort: {
      label: '排序值',
      name: 'sort',
      helper: '文章的排序值',
    },
    description: {
      label: '简介描述',
      name: 'description',
      helper: '文章的简介描述',
    },
    image: {
      label: '正方形配图',
      name: 'image',
      helper: '文章的正方形图片配图,主要用于文章列表场景的布局展示',
    },
    rectangleImage: {
      label: '长方形配图',
      name: 'rectangleImage',
      helper: '文章的长方形图片配图,主要用于文章列表场景的布局展示',
    },
    fileBase64: {
      label: '附件',
      name: 'fileBase64',
      helper: '文章的附件',
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
    cityCode: {
      label: '城市编码',
      name: 'cityCode',
      helper: '',
    },
    areaAgentId: {
      label: '归属地区标识',
      name: 'areaAgentId',
      helper: '',
    },
    platformId: {
      label: '归属平台标识',
      name: 'platformId',
      helper: '',
    },
    status: {
      label: '当前状态',
      name: 'status',
      helper: '',
    },
    statusNote: {
      label: '当前状态',
      name: 'statusNote',
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
    createUserId: {
      label: '创建人标识',
      name: 'createUserId',
      helper: '',
    },
    updateUserId: {
      label: '更新人标识',
      name: 'updateUserId',
      helper: '',
    },
  },
  ...{
    imageList: {
      label: '图片集合',
      name: 'imageList',
      helper: '',
    },
  },
};

export const mediaItemData = {
  ...{
    id: {
      label: '数据标识',
      name: 'id',
      helper: '',
    },
    title: {
      label: '标题',
      name: 'title',
      helper: '',
    },
    description: {
      label: '描述',
      name: 'description',
      helper: '文章的副标题',
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
  },
};

export const statusCollection = {
  /**
   * 已删除
   * value : -1
   */
  remove: -1,

  /**
   * 已下线
   * value : 0
   */
  offline: 0,

  /**
   * 已上线
   * value : 1
   */
  online: 1,
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
