export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { businessSetId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { businessSetId } = currentState;

  const { businessSetId: businessSetIdPre } = preState;

  return businessSetIdPre !== businessSetId;
}
