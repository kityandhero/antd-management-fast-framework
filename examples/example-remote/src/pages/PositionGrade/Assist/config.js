export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { positionGradeId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { positionGradeId } = currentState;

  const { positionGradeId: positionGradeIdPre } = preState;

  return positionGradeIdPre !== positionGradeId;
}
