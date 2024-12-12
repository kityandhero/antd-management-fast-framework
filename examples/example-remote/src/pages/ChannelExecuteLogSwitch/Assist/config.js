export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { channelExecuteLogSwitchId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { channelExecuteLogSwitchId } = currentState;

  const { channelExecuteLogSwitchId: channelExecuteLogSwitchIdPre } = preState;

  return channelExecuteLogSwitchIdPre !== channelExecuteLogSwitchId;
}
