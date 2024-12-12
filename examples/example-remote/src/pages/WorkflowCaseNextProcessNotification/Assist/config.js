export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseNextProcessNotificationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseNextProcessNotificationId } = currentState;

  const {
    workflowCaseNextProcessNotificationId:
      workflowCaseNextProcessNotificationIdPre,
  } = preState;

  return (
    workflowCaseNextProcessNotificationIdPre !==
    workflowCaseNextProcessNotificationId
  );
}
