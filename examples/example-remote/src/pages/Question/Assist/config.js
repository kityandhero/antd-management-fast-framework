export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionId } = currentState;

  const { questionId: questionIdPre } = preState;

  return questionIdPre !== questionId;
}
