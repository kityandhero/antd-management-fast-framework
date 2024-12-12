import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  hostServiceId: {
    label: '数据标识',
    name: 'hostServiceId',
    helper: '',
  },
  name: {
    label: '服务名称',
    name: 'name',
    helper: '',
  },
  serviceChannel: {
    label: '服务代码',
    name: 'serviceChannel',
    helper: '',
  },
  channel: {
    label: '发生位置',
    name: 'channel',
    helper: '',
  },
  status: {
    label: '运行状态',
    name: 'status',
    helper: '',
  },
  ip: {
    label: '发生IP',
    name: 'ip',
    helper: '',
  },
  autoRemark: {
    label: '系统备注',
    name: 'autoRemark',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '最后变动时间',
    name: 'updateTime',
    helper: '',
  },
  operate: {
    start: {
      value: 1,
      name: '启动',
    },
    stop: {
      value: 2,
      name: '停止',
    },
    restart: {
      value: 3,
      name: '重启',
    },
    remove: {
      value: 4,
      name: '移除',
    },
  },
};

export const daemonServiceChannel = 37_000;

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已运行
   * value : 1
   */
  start: 1,

  /**
   * 已停止
   * value : 2
   */
  stop: 2,
};

/**
 * 变更值集合
 */
export const changeTypeCollection = {
  /**
   * 启动
   * value : 2
   */
  start: 2,

  /**
   * 停止
   * value : 2
   */
  stop: 2,

  /**
   * 重启
   * value : 3
   */
  restart: 3,
};
