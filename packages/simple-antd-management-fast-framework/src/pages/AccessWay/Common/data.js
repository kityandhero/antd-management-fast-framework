import { formNameCollection } from 'antd-management-fast-common/es/utils/constants';

export const fieldData = {
  ...(formNameCollection || {}),
  ...{
    accessWayId: {
      label: '数据标识',
      name: 'accessWayId',
      helper: '',
    },
    name: {
      label: '模块名称',
      name: 'name',
      helper: '',
    },
    relativePath: {
      label: 'Url路径',
      name: 'relativePath',
      helper: '',
    },
    guidTag: {
      label: '模块标识',
      name: 'guidTag',
      helper: '',
    },
    expand: {
      label: '分支权限',
      name: 'expand',
      helper: '',
    },
    channel: {
      label: '系统名',
      name: 'channel',
      helper: '',
    },
    keywords: {
      label: '关键词',
      name: 'keywords',
      helper: '',
    },
    status: {
      label: '状态',
      name: 'status',
      helper: '',
    },
  },
  ...{
    statusNote: {
      label: '状态',
      name: 'statusNote',
      helper: '',
    },
  },
};

export const statusCollection = {
  /**
   * 上线
   * value: 1
   */
  online: 1,

  /**
   * 下线
   * value : 0
   */
  offline: 0,
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
