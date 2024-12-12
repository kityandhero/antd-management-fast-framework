export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowId } = currentState;

  const { workflowId: workflowIdPre } = preState;

  return workflowIdPre !== workflowId;
}
