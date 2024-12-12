export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseProcessHistoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseProcessHistoryId } = currentState;

  const {
    workflowDebugCaseProcessHistoryId: workflowDebugCaseProcessHistoryIdPre,
  } = preState;

  return (
    workflowDebugCaseProcessHistoryIdPre !== workflowDebugCaseProcessHistoryId
  );
}
