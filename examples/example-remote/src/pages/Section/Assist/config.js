export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { sectionId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { sectionId } = currentState;

  const { sectionId: sectionIdPre } = preState;

  return sectionIdPre !== sectionId;
}
