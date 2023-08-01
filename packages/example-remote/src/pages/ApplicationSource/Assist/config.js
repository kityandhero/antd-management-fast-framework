export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { applicationSourceId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { applicationSourceId } = currentState;

  const { applicationSourceId: applicationSourceIdPre } = preState;

  return applicationSourceIdPre !== applicationSourceId;
}
