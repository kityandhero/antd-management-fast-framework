import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getNow,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  nodeApply,
  nodeAttention,
} from 'antd-management-fast-design-playground';

import { emptySignet, flowStatusCollection } from '../../../customConfig';
import { fieldData } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowStatusCollection.enable: {
      result = 'processing';
      break;
    }

    case flowStatusCollection.disable: {
      result = 'warning';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}

export function getSimpleApplicantConfig(o) {
  const applicantSignSwitch = getValueByKey({
    data: o,
    key: fieldData.applicantSignSwitch.name,
    convert: convertCollection.number,
  });

  const applicantStatementTitle = getValueByKey({
    data: o,
    key: fieldData.defaultApplicantStatementTitle.name,
    convert: convertCollection.string,
  });

  const applicantStatementContent = getValueByKey({
    data: o,
    key: fieldData.defaultApplicantStatementContent.name,
    convert: convertCollection.string,
  });

  const globalDebugUserSignet = getValueByKey({
    data: o,
    key: fieldData.globalDebugUserSignet.name,
    convert: convertCollection.string,
  });

  const listApply = [
    {
      ...nodeApply,
      title: applicantStatementTitle,
      note: applicantStatementContent,
      ...(checkStringIsNullOrWhiteSpace(globalDebugUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: globalDebugUserSignet,
          }),
      time: formatDatetime({
        data: getNow(),
        format: datetimeFormat.yearMonthDayHourMinuteSecond,
      }),
    },
  ];

  return {
    showApply: applicantSignSwitch === whetherNumber.yes,
    listApply,
  };
}

export function getSimpleAttentionConfig(o) {
  const attentionSignSwitch = getValueByKey({
    data: o,
    key: fieldData.attentionSignSwitch.name,
    convert: convertCollection.number,
  });

  const attentionStatementTitle = getValueByKey({
    data: o,
    key: fieldData.defaultAttentionStatementTitle.name,
    convert: convertCollection.string,
  });

  const attentionStatementContent = getValueByKey({
    data: o,
    key: fieldData.defaultAttentionStatementContent.name,
    convert: convertCollection.string,
  });

  const attentionUserSignet = getValueByKey({
    data: o,
    key: fieldData.defaultAttentionUserSignet.name,
    convert: convertCollection.string,
  });

  const listAttention = [
    {
      ...nodeAttention,
      title: attentionStatementTitle,
      note: attentionStatementContent,
      ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
        ? {
            signet: emptySignet,
          }
        : {
            signet: attentionUserSignet,
          }),
      time: formatDatetime({
        data: getNow(),
        format: datetimeFormat.yearMonthDayHourMinuteSecond,
      }),
    },
  ];

  return {
    showAttention: attentionSignSwitch === whetherNumber.yes,
    listAttention,
  };
}
