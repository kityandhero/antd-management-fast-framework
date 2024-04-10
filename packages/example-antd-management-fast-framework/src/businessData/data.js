import { formNameCollection } from 'antd-management-fast-common';

const viewColumnFieldDataCollection = {
  imageList: {
    label: '图片集合',
    name: 'imageList',
    helper: '',
  },
  datePicker: {
    label: '日期选择',
    name: 'datePicker',
    helper: '',
  },
  timePicker: {
    label: '时间选择',
    name: 'timePicker',
    helper: '',
  },
  switch: {
    label: '开关类型',
    name: 'switch',
    helper: '',
  },
  syntaxHighlighter: {
    label: '语法高亮区域',
    name: 'syntaxHighlighter',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  simpleId: {
    label: '数据标识',
    name: 'simpleId',
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
  author: {
    label: '作者',
    name: 'author',
    helper: '文章的作者',
  },
  select1: {
    label: 'Select选项列表',
    name: 'select1',
    helper: '选项列表示例',
  },
  select11: {
    label: 'Select选项列表',
    name: 'select11',
    helper: '选项列表示例',
  },
  select12: {
    label: 'Select选项列表',
    name: 'select12',
    helper: '选项列表示例',
  },
  select13: {
    label: 'Select选项列表',
    name: 'select13',
    helper: '选项列表示例',
  },
  select14: {
    label: 'Select选项列表',
    name: 'select14',
    helper: '选项列表示例',
  },
  select2: {
    label: 'Select-Custom选项列表',
    name: 'select2',
    helper: '选项列表示例',
  },
  selectWhether: {
    label: 'selectWhether选项列表',
    name: 'selectWhether',
    helper: 'selectWhether开关选择示例',
  },
  selectRadio: {
    label: 'selectRadio选项列表',
    name: 'selectRadio',
    helper: 'selectRadio开关选择示例',
  },
  color: {
    label: '颜色',
    name: 'color',
    helper: '选项颜色示例',
  },
  radio1: {
    label: 'Radio选项列表',
    name: 'radio1',
    helper: '选项列表示例',
  },
  radio11: {
    label: 'Radio选项列表',
    name: 'radio11',
    helper: '选项列表示例',
  },
  radio2: {
    label: 'Radio-Button选项列表',
    name: 'radio2',
    helper: '选项列表示例',
  },
  radio3: {
    label: 'Radio-Custom选项列表',
    name: 'radio3',
    helper: '选项列表示例',
  },
  radio4: {
    label: 'Radio丰富选项列表',
    name: 'radio4',
    helper: '选项列表示例',
  },
  parentId: {
    label: '父级文章',
    name: 'parentId',
    helper: '文章的父级',
  },
  parentName: {
    label: '父级文章',
    name: 'parentName',
    helper: '文章的父级',
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
  file: {
    label: '附件',
    name: 'file',
    helper: '文章的附件',
  },
  fileBase64: {
    label: '附件[转Base64]',
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
    helper: '数据得发布时间',
  },
  updateTime: {
    label: '最后更新时间',
    name: 'updateTime',
    helper: '数据得最后更新时间',
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
  ...viewColumnFieldDataCollection,
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

export const simpleJsonData = [
  {
    id: '05c3ef8577c94baf9b7fe56630d35929',
    title: '3245',
    type: 0,
    text: '123123123123122',
    multiText: '',
    image: '',
    link: '',
    video: '',
    audio: '',
    attachment: '',
    sort: 0,
    createTime: '2023-07-20 16:49:28',
    updateTime: '2023-07-20 16:49:28',
    key: '05c3ef8577c94baf9b7fe56630d35929',
  },
  {
    id: '1d7df75ba89f4a188c622349634f6bdc',
    title: 'uu',
    type: 200,
    text: '',
    multiText: '',
    image: 'http://file.oa.local.com/general/image/1681950498527252480.jpeg',
    link: '',
    video: '',
    audio: '',
    attachment: '',
    sort: 0,
    createTime: '2023-07-20 16:53:43',
    updateTime: '2023-07-20 16:53:43',
    key: '1d7df75ba89f4a188c622349634f6bdc',
  },
  {
    id: 'b1fbda61794044c29ad90edd7df1157f',
    title: 'ooo',
    type: 200,
    text: '',
    multiText: '',
    image: 'http://file.oa.local.com/general/image/1681950746897158144.jpeg',
    link: '',
    video: '',
    audio: '',
    attachment: '',
    sort: 0,
    createTime: '2023-07-20 16:54:46',
    updateTime: '2023-07-20 16:54:46',
    key: 'b1fbda61794044c29ad90edd7df1157f',
  },
  {
    id: '080210ddfed546a5be0561a149ede32c',
    title: 'tyer',
    type: 1000,
    text: '',
    multiText: '',
    image: '',
    link: 'asdfasdgsadgsagsagsag',
    video: '',
    audio: '',
    attachment: '',
    sort: 0,
    createTime: '2023-07-20 16:57:29',
    updateTime: '2023-07-20 16:57:29',
    key: '080210ddfed546a5be0561a149ede32c',
  },
];
