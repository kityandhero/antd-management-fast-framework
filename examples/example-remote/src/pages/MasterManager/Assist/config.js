export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { masterManagerId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { masterManagerId } = currentState;

  const { masterManagerId: masterManagerIdPre } = preState;

  return masterManagerIdPre !== masterManagerId;
}
