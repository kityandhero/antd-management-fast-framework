export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { emailSenderAgentId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { emailSenderAgentId } = currentState;

  const { emailSenderAgentId: emailSenderAgentIdPre } = preState;

  return emailSenderAgentIdPre !== emailSenderAgentId;
}
