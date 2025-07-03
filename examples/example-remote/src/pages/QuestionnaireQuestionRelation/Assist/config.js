export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { questionnaireQuestionRelationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { questionnaireQuestionRelationId } = currentState;

  const {
    questionnaireQuestionRelationId: questionnaireQuestionRelationIdPre,
  } = preState;

  return questionnaireQuestionRelationIdPre !== questionnaireQuestionRelationId;
}
