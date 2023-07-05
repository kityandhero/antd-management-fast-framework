export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userId } = currentState;

  const { userId: userIdPre } = preState;

  return userIdPre !== userId;
}
