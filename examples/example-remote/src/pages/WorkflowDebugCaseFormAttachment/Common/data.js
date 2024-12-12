import { fieldDataFlowCaseFormAttachment } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...fieldDataFlowCaseFormAttachment,
  workflowDebugCaseFormAttachmentId: {
    label: '数据标识',
    name: 'workflowDebugCaseFormAttachmentId',
    helper: '',
  },
  ...fieldExtraData,
};
