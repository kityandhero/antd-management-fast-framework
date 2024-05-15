export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { weChatMessageRecordId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { weChatMessageRecordId } = currentState;

  const { weChatMessageRecordId: weChatMessageRecordIdPre } = preState;

  return weChatMessageRecordIdPre !== weChatMessageRecordId;
}
