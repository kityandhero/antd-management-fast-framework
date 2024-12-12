export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userQuestionnaireId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userQuestionnaireId } = currentState;

  const { userQuestionnaireId: userQuestionnaireIdPre } = preState;

  return userQuestionnaireIdPre !== userQuestionnaireId;
}
