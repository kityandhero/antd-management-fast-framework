import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  questionCreateModeNote: {
    label: '问题生成模式',
    name: 'questionCreateModeNote',
    helper: '问题生成模式, 创建后不可根更改',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
  listQuestionUngrouped: {
    label: '未分组题目集合',
    name: 'listQuestionUngrouped',
    helper: '',
  },
  listQuestionJudgment: {
    label: '判断题目集合',
    name: 'listQuestionJudgment',
    helper: '',
  },
  listQuestionSingleSelect: {
    label: '单选题目集合',
    name: 'listQuestionSingleSelect',
    helper: '',
  },
  listQuestionMultiSelect: {
    label: '多选题目集合',
    name: 'listQuestionMultiSelect',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  questionnaireId: {
    label: '数据标识',
    name: 'questionnaireId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  contentData: {
    label: '内容',
    name: 'contentData',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  luckyDrawId: {
    label: '关联抽奖标识',
    name: 'luckyDrawId',
    helper: '',
  },
  luckyDrawThreshold: {
    label: '触发抽奖阈值',
    name: 'luckyDrawThreshold',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  questionCreateMode: {
    label: '问题生成模式',
    name: 'questionCreateMode',
    helper: '问题生成模式, 创建后不可根更改',
  },
  whetherGroupDisplay: {
    label: '分组显示',
    name: 'whetherGroupDisplay',
    helper: '是否按问题类型分组显示[仅在统一试卷模式生效]',
  },
  whetherRandomOrder: {
    label: '随机排序',
    name: 'whetherRandomOrder',
    helper: '问卷问题答题时随机打乱排序[仅在统一试卷模式生效]',
  },
  whetherRecommend: {
    label: '推荐',
    name: 'whetherRecommend',
    helper: '是否推荐状态',
  },
  whetherTop: {
    label: '置顶',
    name: 'whetherTop',
    helper: '是否置顶状态',
  },
  whetherVisible: {
    label: '可见',
    name: 'whetherVisible',
    helper: '是否可见状态',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const questionCreateModeCollection = {
  /**
   * 未知模式
   * value : 0
   */
  unknown: 0,

  /**
   * 统一题目
   * value : 100
   */
  global: 100,

  /**
   * 随机题目
   * value : 200
   */
  random: 200,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已下线
   * value : 0
   */
  offline: 0,

  /**
   * 已上线
   * value : 100
   */
  online: 100,
};
