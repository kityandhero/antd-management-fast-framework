import { formNameCollection } from 'antd-management-fast-framework/es/utils/constants';

export const fieldData = {
  ...(formNameCollection || {}),
  ...{
    systemId: {
      label: '数据标识',
      name: 'systemId',
      helper: '',
    },
    platformId: {
      label: '平台标识',
      name: 'platformId',
      helper: '',
    },
    name: {
      label: '平台名称',
      name: 'name',
      helper: '输入合适的平台名称',
    },
    description: {
      label: '简介描述',
      name: 'description',
      helper: '',
    },
    status: {
      label: '状态',
      name: 'status',
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
