export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { smsCategoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { smsCategoryId } = currentState;

  const { smsCategoryId: smsCategoryIdPre } = preState;

  return smsCategoryIdPre !== smsCategoryId;
}
