export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionnaireQuestionId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionnaireQuestionId } = currentState;

  const { questionnaireQuestionId: questionnaireQuestionIdPre } = preState;

  return questionnaireQuestionIdPre !== questionnaireQuestionId;
}
