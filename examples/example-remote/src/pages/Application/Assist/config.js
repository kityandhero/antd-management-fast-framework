export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { applicationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { applicationId } = currentState;

  const { applicationId: applicationIdPre } = preState;

  return applicationIdPre !== applicationId;
}
