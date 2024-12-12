export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { qrCodeId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { qrCodeId } = currentState;

  const { qrCodeId: qrCodeIdPre } = preState;

  return qrCodeIdPre !== qrCodeId;
}
