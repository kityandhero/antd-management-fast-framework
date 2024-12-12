export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionItemId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionItemId } = currentState;

  const { questionItemId: questionItemIdPre } = preState;

  return questionItemIdPre !== questionItemId;
}
