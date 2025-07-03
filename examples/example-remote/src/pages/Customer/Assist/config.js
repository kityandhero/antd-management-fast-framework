export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { customerId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { customerId } = currentState;

  const { customerId: customerIdPre } = preState;

  return customerIdPre !== customerId;
}
