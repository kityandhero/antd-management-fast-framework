export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { generalDiscourseId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { generalDiscourseId } = currentState;

  const { generalDiscourseId: generalDiscourseIdPre } = preState;

  return generalDiscourseIdPre !== generalDiscourseId;
}
