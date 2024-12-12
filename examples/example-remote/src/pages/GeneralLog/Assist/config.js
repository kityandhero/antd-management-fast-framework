export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { generalLogId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { generalLogId } = currentState;

  const { generalLogId: generalLogIdPre } = preState;

  return generalLogIdPre !== generalLogId;
}

export function getGeneralLogIdFromExternalData(state) {
  const { externalData } = state;

  let generalLogId = '';

  if ((externalData || null) != null) {
    generalLogId = externalData.generalLogId || '';
  }

  return generalLogId;
}
