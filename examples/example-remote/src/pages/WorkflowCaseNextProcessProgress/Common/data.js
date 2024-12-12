import { fieldDataFlowCaseNextProcessProgress } from '../../../customConfig';

const fieldExtraData = {
  workflowCaseId: {
    label: '实例标识',
    name: 'workflowCaseId',
    helper: '',
  },
};

export const fieldData = {
  ...fieldDataFlowCaseNextProcessProgress,
  workflowCaseNextProcessProgressId: {
    label: '数据标识',
    name: 'workflowCaseNextProcessProgressId',
    helper: '',
  },
  ...fieldExtraData,
};
