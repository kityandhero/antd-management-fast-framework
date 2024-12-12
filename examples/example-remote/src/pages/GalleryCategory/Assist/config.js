export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { galleryCategoryId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { galleryCategoryId } = currentState;

  const { galleryCategoryId: galleryCategoryIdPre } = preState;

  return galleryCategoryIdPre !== galleryCategoryId;
}
