export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseCarbonCopyNotificationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseCarbonCopyNotificationId } = currentState;

  const {
    workflowDebugCaseCarbonCopyNotificationId:
      workflowDebugCaseCarbonCopyNotificationIdPre,
  } = preState;

  return (
    workflowDebugCaseCarbonCopyNotificationIdPre !==
    workflowDebugCaseCarbonCopyNotificationId
  );
}
