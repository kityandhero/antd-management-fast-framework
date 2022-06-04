import { formNameCollection } from 'antd-management-fast-framework/es/utils/constants';

export const fieldData = {
  ...(formNameCollection || {}),
  ...{
    editorId: {
      label: '数据标识',
      name: 'editorId',
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
