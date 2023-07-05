export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { smsLogId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { smsLogId } = currentState;

  const { smsLogId: smsLogIdPre } = preState;

  return smsLogIdPre !== smsLogId;
}
