export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { sqlLogId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { sqlLogId } = currentState;

  const { sqlLogId: sqlLogIdPre } = preState;

  return sqlLogIdPre !== sqlLogId;
}
