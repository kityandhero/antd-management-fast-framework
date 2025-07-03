export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { applicationUserFeedbackId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { applicationUserFeedbackId } = currentState;

  const { applicationUserFeedbackId: applicationUserFeedbackIdPre } = preState;

  return applicationUserFeedbackIdPre !== applicationUserFeedbackId;
}
