export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { hostServiceId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { hostServiceId } = currentState;

  const { hostServiceId: hostServiceIdPre } = preState;

  return hostServiceIdPre !== hostServiceId;
}
