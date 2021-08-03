import { formNameCollection } from '@/customConfig/config';

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
  },
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
