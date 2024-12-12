import { fieldDataFlowCaseNextProcessProgress } from '../../../customConfig';

const fieldExtraData = {
  workflowDebugCaseId: {
    label: '实例标识',
    name: 'workflowDebugCaseId',
    helper: '',
  },
};
export const fieldData = {
  ...fieldDataFlowCaseNextProcessProgress,
  workflowDebugCaseNextProcessProgressId: {
    label: '数据标识',
    name: 'workflowDebugCaseNextProcessProgressId',
    helper: '',
  },
  ...fieldExtraData,
};
