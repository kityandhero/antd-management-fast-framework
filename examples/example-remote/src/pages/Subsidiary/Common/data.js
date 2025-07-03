import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
    helper: '',
  },
  shortName: {
    label: '简称',
    name: 'shortName',
    helper: '',
  },
  fullName: {
    label: '全称',
    name: 'fullName',
    helper: '',
  },
  logo: {
    label: 'Logo',
    name: 'logo',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  code: {
    label: '代码',
    name: 'code',
    helper: '',
  },
  parentId: {
    label: '上级公司标识',
    name: 'parentId',
    helper: '',
  },
  parentShortName: {
    label: '上级公司',
    name: 'parentShortName',
    helper: '',
  },
  complaintSwitch: {
    label: '投诉开关',
    name: 'complaintSwitch',
    helper: '',
  },
  complaintSwitchNote: {
    label: '投诉开关',
    name: 'complaintSwitchNote',
    helper: '',
  },
  reportSwitch: {
    label: '举报开关',
    name: 'reportSwitch',
    helper: '',
  },
  reportSwitchNote: {
    label: '举报开关',
    name: 'reportSwitchNote',
    helper: '',
  },
  feedbackSwitch: {
    label: '留言开关',
    name: 'feedbackSwitch',
    helper: '',
  },
  feedbackSwitchNote: {
    label: '留言开关',
    name: 'feedbackSwitchNote',
    helper: '',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已禁用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};
