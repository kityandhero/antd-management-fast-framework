export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseId } = currentState;

  const { workflowCaseId: workflowCaseIdPre } = preState;

  return workflowCaseIdPre !== workflowCaseId;
}
