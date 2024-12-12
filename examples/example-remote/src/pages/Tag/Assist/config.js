export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { tagId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { tagId } = currentState;

  const { tagId: tagIdPre } = preState;

  return tagIdPre !== tagId;
}
