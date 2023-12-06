export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userSubsidiaryInfoId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userSubsidiaryInfoId } = currentState;

  const { userSubsidiaryInfoId: userSubsidiaryInfoIdPre } = preState;

  return userSubsidiaryInfoIdPre !== userSubsidiaryInfoId;
}
