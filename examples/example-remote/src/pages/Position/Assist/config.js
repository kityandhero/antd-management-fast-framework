export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { positionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { positionId } = currentState;

  const { positionId: positionIdPre } = preState;

  return positionIdPre !== positionId;
}
