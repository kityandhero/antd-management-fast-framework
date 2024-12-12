export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { galleryId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { galleryId } = currentState;

  const { galleryId: galleryIdPre } = preState;

  return galleryIdPre !== galleryId;
}
