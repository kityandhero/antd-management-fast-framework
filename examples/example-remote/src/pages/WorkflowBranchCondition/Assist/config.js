export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowBranchConditionId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowBranchConditionId } = currentState;

  const { workflowBranchConditionId: workflowBranchConditionIdPre } = preState;

  return workflowBranchConditionIdPre !== workflowBranchConditionId;
}
