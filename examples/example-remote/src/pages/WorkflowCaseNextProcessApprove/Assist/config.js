export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseNextProcessApproveId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseNextProcessApproveId } = currentState;

  const {
    workflowCaseNextProcessApproveId: workflowCaseNextProcessApproveIdPre,
  } = preState;

  return (
    workflowCaseNextProcessApproveIdPre !== workflowCaseNextProcessApproveId
  );
}
