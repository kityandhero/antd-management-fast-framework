export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowFormDesignId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowFormDesignId } = currentState;

  const { workflowFormDesignId: workflowFormDesignIdPre } = preState;

  return workflowFormDesignIdPre !== workflowFormDesignId;
}
