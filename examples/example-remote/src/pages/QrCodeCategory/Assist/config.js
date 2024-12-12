export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { qrCodeCategoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { qrCodeCategoryId } = currentState;

  const { qrCodeCategoryId: qrCodeCategoryIdPre } = preState;

  return qrCodeCategoryIdPre !== qrCodeCategoryId;
}
