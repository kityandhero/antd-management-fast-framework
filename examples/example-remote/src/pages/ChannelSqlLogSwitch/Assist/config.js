export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { channelSqlLogSwitchId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { channelSqlLogSwitchId } = currentState;

  const { channelSqlLogSwitchId: channelSqlLogSwitchIdPre } = preState;

  return channelSqlLogSwitchIdPre !== channelSqlLogSwitchId;
}
