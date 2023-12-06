export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowNodeApproverId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowNodeApproverId } = currentState;

  const { workflowNodeApproverId: workflowNodeApproverIdPre } = preState;

  return workflowNodeApproverIdPre !== workflowNodeApproverId;
}
