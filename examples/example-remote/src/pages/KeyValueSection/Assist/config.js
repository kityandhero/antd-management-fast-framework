export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { keyValueSectionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { keyValueSectionId } = currentState;

  const { keyValueSectionId: keyValueSectionIdPre } = preState;

  return keyValueSectionIdPre !== keyValueSectionId;
}
