export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { hostServiceChangeRecordId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { hostServiceChangeRecordId } = currentState;

  const { hostServiceChangeRecordId: hostServiceChangeRecordIdPre } = preState;

  return hostServiceChangeRecordIdPre !== hostServiceChangeRecordId;
}
