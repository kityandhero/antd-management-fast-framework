import { formNameCollection } from 'antd-management-fast-common';

export const fieldData = {
  ...formNameCollection,
  name: {
    label: '名称',
    name: 'name',
    helper: '系统的名称',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '系统的简介描述',
  },
  logo: {
    label: 'Logo',
    name: 'logo',
    helper: '系统的Logo',
  },
  createTime: {
    label: '系统创建时间',
    name: 'systemCreateTime',
    helper: '系统的创建时间',
  },
  fileHost: {
    label: '本地文件存储域名',
    name: 'fileHost',
    helper: '本地文件存储域名, 仅使用本地存储时将附加到文件地址之前',
  },
  localStorage: {
    label: '本地文件主仓',
    name: 'localStorage',
    helper: '本地文件主仓, 用于组织部署文件夹映射, 不应构建在Url中',
  },
  generalStorage: {
    label: '本地通用文件主仓',
    name: 'generalStorage',
    helper: '本地通用文件主仓',
  },
  imageStorage: {
    label: '本地通用文件图片仓',
    name: 'imageStorage',
    helper: '本地通用文件图片仓',
  },
  videoStorage: {
    label: '本地通用文件视频仓',
    name: 'videoStorage',
    helper: '本地通用文件视频仓',
  },
  audioStorage: {
    label: '本地通用文件音频仓',
    name: 'audioStorage',
    helper: '本地通用文件音频仓',
  },
  fileStorage: {
    label: '本地通用文件文件仓',
    name: 'fileStorage',
    helper: '本地通用文件文件仓',
  },
  imageUploadMaxSize: {
    label: '图片文件上传限额 (MB)',
    name: 'imageUploadMaxSize',
    helper: '图片文件上传限额 (MB)',
  },
  videoUploadMaxSize: {
    label: '视频文件上传限额 (MB)',
    name: 'videoUploadMaxSize',
    helper: '视频文件上传限额 (MB)',
  },
  audioUploadMaxSize: {
    label: '音频文件上传限额 (MB)',
    name: 'audioUploadMaxSize',
    helper: '音频文件上传限额 (MB)',
  },
  fileUploadMaxSize: {
    label: '一般文件上传限额 (MB)',
    name: 'fileUploadMaxSize',
    helper: '一般文件上传限额 (MB)',
  },
  qiniu: {
    label: '七牛云',
    qiniuImageSwitch: {
      label: '七牛云图片转存开关',
      name: 'qiniuImageSwitch',
      helper: '七牛云图片转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    qiniuVideoSwitch: {
      label: '七牛云视频转存开关',
      name: 'qiniuVideoSwitch',
      helper: '七牛云视频转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    qiniuAudioSwitch: {
      label: '七牛云音频转存开关',
      name: 'qiniuAudioSwitch',
      helper: '七牛云音频转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    qiniuFileSwitch: {
      label: '七牛云文件转存开关',
      name: 'qiniuFileSwitch',
      helper: '七牛云文件转存开关, 开启后将转存到七牛云并使用七牛云访问',
    },
    accessKey: {
      label: 'AccessKey',
      name: 'qiniuAccessKey',
      helper: '',
    },
    secretKey: {
      label: 'SecretKey',
      name: 'qiniuSecretKey',
      helper: '',
    },
    bucket: {
      label: '文件仓',
      name: 'qiniuBucket',
      helper: '',
    },
    useHttps: {
      label: 'Https使用',
      name: 'qiniuUseHttps',
      helper: '',
    },
    rootUrl: {
      label: '自动补全域名',
      name: 'qiniuRootUrl',
      helper: '相对路径文件自动追加的域名信息',
    },
  },
};
