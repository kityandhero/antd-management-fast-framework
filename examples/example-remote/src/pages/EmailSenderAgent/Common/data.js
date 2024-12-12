import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  emailSenderAgentId: {
    label: '数据标识',
    name: 'emailSenderAgentId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '输入合适的标题',
  },
  host: {
    label: '域名',
    name: 'host',
    helper: '输入合适的域名',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '输入合适的简介描述',
  },
  port: {
    label: '端口',
    name: 'port',
    helper: '转发Smtp server 的端口号',
  },
  whetherSsl: {
    label: '是否使用SSL',
    name: 'whetherSsl',
    helper: '选择是否使用SSL',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '选择合适的排序值',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '输入合适的排序值, 按照降序排序',
  },
  ...fieldExtraData,
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
