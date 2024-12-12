export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseNextProcessProgressId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseNextProcessProgressId } = currentState;

  const {
    workflowDebugCaseNextProcessProgressId:
      workflowDebugCaseNextProcessProgressIdPre,
  } = preState;

  return (
    workflowDebugCaseNextProcessProgressIdPre !==
    workflowDebugCaseNextProcessProgressId
  );
}
