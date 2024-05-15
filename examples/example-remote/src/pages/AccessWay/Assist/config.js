export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { accessWayId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { accessWayId } = currentState;

  const { accessWayId: accessWayIdPre } = preState;

  return accessWayIdPre !== accessWayId;
}
