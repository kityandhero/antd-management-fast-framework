import { fieldDataBaseSubsidiaryMessage } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...fieldDataBaseSubsidiaryMessage,
  subsidiaryComplaintMessageId: {
    label: '数据标识',
    name: 'subsidiaryComplaintMessageId',
    helper: '',
  },
  subsidiaryComplaintCategoryId: {
    label: '类别标识',
    name: 'subsidiaryComplaintCategoryId',
    helper: '',
  },
  subsidiaryComplaintCategoryName: {
    label: '所属类别',
    name: 'subsidiaryComplaintCategoryName',
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
