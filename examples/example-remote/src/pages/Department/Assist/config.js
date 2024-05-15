export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { departmentId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { departmentId } = currentState;

  const { departmentId: departmentIdPre } = preState;

  return departmentIdPre !== departmentId;
}
