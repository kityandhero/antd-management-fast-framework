export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { keyValueInfrastructureId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { keyValueInfrastructureId } = currentState;

  const { keyValueInfrastructureId: keyValueInfrastructureIdPre } = preState;

  return keyValueInfrastructureIdPre !== keyValueInfrastructureId;
}
