export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { yonYouImportHistoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { yonYouImportHistoryId } = currentState;

  const { yonYouImportHistoryId: yonYouImportHistoryIdPre } = preState;

  return yonYouImportHistoryIdPre !== yonYouImportHistoryId;
}
