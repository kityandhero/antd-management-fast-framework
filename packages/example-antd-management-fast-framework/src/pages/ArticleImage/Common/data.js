import { formNameCollection } from 'antd-management-fast-common/es/utils/constants';

export const fieldData = {
  ...(formNameCollection || {}),
  ...{
    articleImageId: {
      label: '数据标识',
      name: 'articleImageId',
      helper: '',
    },
    articleId: {
      label: '文章标识',
      name: 'articleId',
      helper: '',
    },
  },
};
