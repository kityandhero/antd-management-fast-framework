export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowBranchConditionItemId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowBranchConditionItemId } = currentState;

  const { workflowBranchConditionItemId: workflowBranchConditionItemIdPre } =
    preState;

  return workflowBranchConditionItemIdPre !== workflowBranchConditionItemId;
}
