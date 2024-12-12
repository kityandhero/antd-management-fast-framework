export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { queueInfoId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { queueInfoId } = currentState;

  const { queueInfoId: queueInfoIdPre } = preState;

  return queueInfoIdPre !== queueInfoId;
}

export function getErrorLogIdFromExternalData(state) {
  const { externalData } = state;

  let queueInfoId = '';

  if ((externalData || null) != null) {
    queueInfoId = externalData.simpleId || '';
  }

  return queueInfoId;
}
