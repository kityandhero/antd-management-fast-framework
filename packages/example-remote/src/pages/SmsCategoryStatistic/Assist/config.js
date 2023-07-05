export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { smsCategoryStatisticId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { smsCategoryStatisticId } = currentState;

  const { smsCategoryStatisticId: smsCategoryStatisticIdPre } = preState;

  return smsCategoryStatisticIdPre !== smsCategoryStatisticId;
}
