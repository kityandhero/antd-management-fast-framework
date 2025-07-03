export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { subsidiaryComplaintMessageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { subsidiaryComplaintMessageId } = currentState;

  const { subsidiaryComplaintMessageId: subsidiaryComplaintMessageIdPre } =
    preState;

  return subsidiaryComplaintMessageIdPre !== subsidiaryComplaintMessageId;
}
