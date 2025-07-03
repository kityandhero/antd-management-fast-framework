export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { subsidiaryFeedbackMessageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { subsidiaryFeedbackMessageId } = currentState;

  const { subsidiaryFeedbackMessageId: subsidiaryFeedbackMessageIdPre } =
    preState;

  return subsidiaryFeedbackMessageIdPre !== subsidiaryFeedbackMessageId;
}
