export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { presetRoleId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { presetRoleId } = currentState;

  const { presetRoleId: presetRoleIdPre } = preState;

  return presetRoleIdPre !== presetRoleId;
}
