import { fieldDataBaseSubsidiaryMessage } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...fieldDataBaseSubsidiaryMessage,
  subsidiaryReportMessageId: {
    label: '数据标识',
    name: 'subsidiaryReportMessageId',
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
