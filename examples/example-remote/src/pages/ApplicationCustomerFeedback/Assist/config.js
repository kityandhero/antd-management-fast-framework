export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { applicationCustomerFeedbackId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { applicationCustomerFeedbackId } = currentState;

  const { applicationCustomerFeedbackId: applicationCustomerFeedbackIdPre } =
    preState;

  return applicationCustomerFeedbackIdPre !== applicationCustomerFeedbackId;
}
