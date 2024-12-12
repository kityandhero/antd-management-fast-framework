export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionnaireId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionnaireId } = currentState;

  const { questionnaireId: questionnaireIdPre } = preState;

  return questionnaireIdPre !== questionnaireId;
}
