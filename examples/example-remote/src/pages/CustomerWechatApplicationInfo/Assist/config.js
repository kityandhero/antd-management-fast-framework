export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { customerWechatApplicationInfoId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { customerWechatApplicationInfoId } = currentState;

  const {
    customerWechatApplicationInfoId: customerWechatApplicationInfoIdPre,
  } = preState;

  return customerWechatApplicationInfoIdPre !== customerWechatApplicationInfoId;
}
