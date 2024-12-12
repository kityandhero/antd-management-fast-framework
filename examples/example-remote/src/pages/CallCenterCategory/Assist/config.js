export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { callCenterCategoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { callCenterCategoryId } = currentState;

  const { callCenterCategoryId: callCenterCategoryIdPre } = preState;

  return callCenterCategoryIdPre !== callCenterCategoryId;
}
