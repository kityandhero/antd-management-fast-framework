export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { keyValueApplicationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { keyValueApplicationId } = currentState;

  const { keyValueApplicationId: keyValueApplicationIdPre } = preState;

  return keyValueApplicationIdPre !== keyValueApplicationId;
}
