export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseLatestApproveId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseLatestApproveId } = currentState;

  const {
    workflowDebugCaseLatestApproveId: workflowDebugCaseLatestApproveIdPre,
  } = preState;

  return (
    workflowDebugCaseLatestApproveIdPre !== workflowDebugCaseLatestApproveId
  );
}
