export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { uploadHistoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { uploadHistoryId } = currentState;

  const { uploadHistoryId: uploadHistoryIdPre } = preState;

  return uploadHistoryIdPre !== uploadHistoryId;
}
