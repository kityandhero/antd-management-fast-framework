export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseUserMonitorConfigurationId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseUserMonitorConfigurationId } = currentState;

  const {
    workflowCaseUserMonitorConfigurationId:
      workflowCaseUserMonitorConfigurationIdPre,
  } = preState;

  return (
    workflowCaseUserMonitorConfigurationIdPre !==
    workflowCaseUserMonitorConfigurationId
  );
}
