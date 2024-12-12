export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseLatestApproveId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseLatestApproveId } = currentState;

  const { workflowCaseLatestApproveId: workflowCaseLatestApproveIdPre } =
    preState;

  return workflowCaseLatestApproveIdPre !== workflowCaseLatestApproveId;
}
