export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { administrativeDivisionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { administrativeDivisionId } = currentState;

  const { administrativeDivisionId: administrativeDivisionIdPre } = preState;

  return administrativeDivisionIdPre !== administrativeDivisionId;
}
