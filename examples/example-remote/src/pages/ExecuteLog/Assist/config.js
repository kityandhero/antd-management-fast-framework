export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { executeLogId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { executeLogId } = currentState;

  const { executeLogId: executeLogIdPre } = preState;

  return executeLogIdPre !== executeLogId;
}

export function getGeneralLogIdFromExternalData(state) {
  const { externalData } = state;

  let executeLogId = '';

  if ((externalData || null) != null) {
    executeLogId = externalData.simpleId || '';
  }

  return executeLogId;
}
