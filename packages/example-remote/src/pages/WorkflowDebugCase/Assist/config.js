export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseId } = currentState;

  const { workflowDebugCaseId: workflowDebugCaseIdPre } = preState;

  return workflowDebugCaseIdPre !== workflowDebugCaseId;
}
