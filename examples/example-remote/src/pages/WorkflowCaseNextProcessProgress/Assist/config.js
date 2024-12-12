export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseNextProcessProgressId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseNextProcessProgressId } = currentState;

  const {
    workflowCaseNextProcessProgressId: workflowCaseNextProcessProgressIdPre,
  } = preState;

  return (
    workflowCaseNextProcessProgressIdPre !== workflowCaseNextProcessProgressId
  );
}
