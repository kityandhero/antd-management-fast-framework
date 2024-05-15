export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { applicationVersionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { applicationVersionId } = currentState;

  const { applicationVersionId: applicationVersionIdPre } = preState;

  return applicationVersionIdPre !== applicationVersionId;
}
