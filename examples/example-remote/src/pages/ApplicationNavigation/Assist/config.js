export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { optionPoolId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { optionPoolId } = currentState;

  const { optionPoolId: optionPoolIdPre } = preState;

  return optionPoolIdPre !== optionPoolId;
}
