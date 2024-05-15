import { formNameCollection } from 'antd-management-fast-common';

const fieldExtra = {
  localPath: {
    label: '本地路径',
    name: 'localPath',
    helper: '',
  },
  execlListData: {
    label: 'Execl列表数据',
    name: 'execlListData',
    helper: '',
  },
};

export const fieldDataMapConfig = {
  organization: {
    label: '组织键映射',
    name: 'organization',
    helper: '',
  },
  personnelCode: {
    label: '人员编码键映射',
    name: 'personnelCode',
    helper: '',
  },
  gender: {
    label: '性别键映射',
    name: 'gender',
    helper: '',
  },
  name: {
    label: '姓名键映射',
    name: 'name',
    helper: '',
  },
  phone: {
    label: '手机号码键映射',
    name: 'phone',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  yonYouImportHistoryId: {
    label: '数据标识',
    name: 'yonYouImportHistoryId',
    helper: '',
  },
  originalName: {
    label: '文件名',
    name: 'originalName',
    helper: '',
  },
  filePath: {
    label: '网络路径',
    name: 'filePath',
    helper: '',
  },
  mapConfig: {
    label: '映射配置',
    name: 'mapConfig',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...fieldExtra,
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
