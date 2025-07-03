export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { customerLoginLogId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { customerLoginLogId } = currentState;

  const { customerLoginLogId: customerLoginLogIdPre } = preState;

  return customerLoginLogIdPre !== customerLoginLogId;
}
