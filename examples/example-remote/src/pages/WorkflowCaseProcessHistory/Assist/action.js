import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData as fieldDataWorkflowCase } from '../../WorkflowCase/Common/data';
import { fieldData } from '../Common/data';

export async function passAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCaseProcessHistory/pass',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refuseAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCaseProcessHistory/refuse',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function cancelApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCaseProcessHistory/cancelApprove',
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function resetAllApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  console.log(handleData);

  actionCore({
    api: 'workflowCaseProcessHistory/resetAllApprove',
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldDataWorkflowCase.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
