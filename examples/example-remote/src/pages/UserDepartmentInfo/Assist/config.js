export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userDepartmentInfoId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userDepartmentInfoId } = currentState;

  const { userDepartmentInfoId: userDepartmentInfoIdPre } = preState;

  return userDepartmentInfoIdPre !== userDepartmentInfoId;
}
