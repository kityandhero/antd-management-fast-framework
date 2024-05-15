export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { subsidiaryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { subsidiaryId } = currentState;

  const { subsidiaryId: subsidiaryIdPre } = preState;

  return subsidiaryIdPre !== subsidiaryId;
}
