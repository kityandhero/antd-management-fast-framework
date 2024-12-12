import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  tagName: {
    label: '标签名称',
    name: 'tagName',
    helper: '',
  },
  tagDisplayName: {
    label: '标签显示名',
    name: 'tagDisplayName',
    helper: '',
  },
  color: {
    label: '色值 ',
    name: 'color',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  questionTagRelationId: {
    label: '数据标识',
    name: 'questionTagRelationId',
    helper: '',
  },
  questionId: {
    label: '通告标识',
    name: 'questionId',
    helper: '',
  },
  tagId: {
    label: '用户标识',
    name: 'tagId',
    helper: '',
  },
  ...fieldExtraData,
};
