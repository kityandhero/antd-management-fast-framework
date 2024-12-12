export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userGeneralDiscourseId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userGeneralDiscourseId } = currentState;

  const { userGeneralDiscourseId: userGeneralDiscourseIdPre } = preState;

  return userGeneralDiscourseIdPre !== userGeneralDiscourseId;
}
