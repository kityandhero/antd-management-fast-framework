export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { keyValueWorkflowId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { keyValueWorkflowId } = currentState;

  const { keyValueWorkflowId: keyValueWorkflowIdPre } = preState;

  return keyValueWorkflowIdPre !== keyValueWorkflowId;
}
