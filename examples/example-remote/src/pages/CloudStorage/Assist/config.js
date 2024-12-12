export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { cloudStorageId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { cloudStorageId } = currentState;

  const { cloudStorageId: cloudStorageIdPre } = preState;

  return cloudStorageIdPre !== cloudStorageId;
}
