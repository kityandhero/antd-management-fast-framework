export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { userWechatApplicationInfoId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { userWechatApplicationInfoId } = currentState;

  const { userWechatApplicationInfoId: userWechatApplicationInfoIdPre } =
    preState;

  return userWechatApplicationInfoIdPre !== userWechatApplicationInfoId;
}
