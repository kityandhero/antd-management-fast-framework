import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  questionTitle: {
    label: '标题',
    name: 'questionTitle',
    helper: '',
  },
  questionType: {
    label: '类型',
    name: 'questionType',
    helper: '',
  },
  questionTypeNote: {
    label: '类型',
    name: 'questionTypeNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  questionnaireQuestionRelationId: {
    label: '主键标识',
    name: 'questionnaireQuestionRelationId',
    helper: '',
  },
  questionnaireId: {
    label: '问卷标识',
    name: 'questionnaireId',
    helper: '',
  },
  questionId: {
    label: '文章标识',
    name: 'questionId',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  score: {
    label: '分值',
    name: 'score',
    helper: '',
  },
  ...fieldExtraData,
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
