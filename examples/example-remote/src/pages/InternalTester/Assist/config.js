export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { internalTesterId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { internalTesterId } = currentState;

  const { internalTesterId: internalTesterIdPre } = preState;

  return internalTesterIdPre !== internalTesterId;
}
