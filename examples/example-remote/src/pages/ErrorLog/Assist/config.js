export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { errorLogId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { errorLogId } = currentState;

  const { errorLogId: errorLogIdPre } = preState;

  return errorLogIdPre !== errorLogId;
}

export function getErrorLogIdFromExternalData(state) {
  const { externalData } = state;

  let errorLogId = '';

  if ((externalData || null) != null) {
    errorLogId = externalData.simpleId || '';
  }

  return errorLogId;
}
