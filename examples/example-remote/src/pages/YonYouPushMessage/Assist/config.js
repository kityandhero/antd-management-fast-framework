export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { yonYouPushMessageId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { yonYouPushMessageId } = currentState;

  const { yonYouPushMessageId: yonYouPushMessageIdPre } = preState;

  return yonYouPushMessageIdPre !== yonYouPushMessageId;
}
