export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userYonYouCorrelationId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userYonYouCorrelationId } = currentState;

  const { userYonYouCorrelationId: userYonYouCorrelationIdPre } = preState;

  return userYonYouCorrelationIdPre !== userYonYouCorrelationId;
}
