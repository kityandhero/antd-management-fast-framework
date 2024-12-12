export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowLineId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowLineId } = currentState;

  const { workflowLineId: workflowLineIdPre } = preState;

  return workflowLineIdPre !== workflowLineId;
}
