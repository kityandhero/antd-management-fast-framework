export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { subsidiaryReportMessageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { subsidiaryReportMessageId } = currentState;

  const { subsidiaryReportMessageId: subsidiaryReportMessageIdPre } = preState;

  return subsidiaryReportMessageIdPre !== subsidiaryReportMessageId;
}
