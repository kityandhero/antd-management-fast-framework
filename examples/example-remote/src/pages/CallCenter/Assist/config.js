export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { callCenterId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { callCenterId } = currentState;

  const { callCenterId: callCenterIdPre } = preState;

  return callCenterIdPre !== callCenterId;
}
