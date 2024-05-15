export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { simpleId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { simpleId } = currentState;

  const { simpleId: simpleIdPre } = preState;

  return simpleIdPre !== simpleId;
}

export function getArticleIdFromExternalData(state) {
  const { externalData } = state;

  let simpleId = '';

  if ((externalData || null) != null) {
    simpleId = externalData.simpleId || '';
  }

  return simpleId;
}
