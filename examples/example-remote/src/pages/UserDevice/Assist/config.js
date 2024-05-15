export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userDeviceId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userDeviceId } = currentState;

  const { userDeviceId: userDeviceIdPre } = preState;

  return userDeviceIdPre !== userDeviceId;
}
