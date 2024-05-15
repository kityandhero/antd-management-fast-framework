export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseProcessHistoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseProcessHistoryId } = currentState;

  const { workflowCaseProcessHistoryId: workflowCaseProcessHistoryIdPre } =
    preState;

  return workflowCaseProcessHistoryIdPre !== workflowCaseProcessHistoryId;
}
