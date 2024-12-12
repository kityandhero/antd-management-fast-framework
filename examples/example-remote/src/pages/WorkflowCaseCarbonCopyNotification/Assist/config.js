export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseCarbonCopyNotificationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseCarbonCopyNotificationId } = currentState;

  const {
    workflowCaseCarbonCopyNotificationId:
      workflowCaseCarbonCopyNotificationIdPre,
  } = preState;

  return (
    workflowCaseCarbonCopyNotificationIdPre !==
    workflowCaseCarbonCopyNotificationId
  );
}
