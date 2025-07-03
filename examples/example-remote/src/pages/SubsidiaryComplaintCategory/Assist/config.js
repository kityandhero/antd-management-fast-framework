export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { subsidiaryComplaintCategoryId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { subsidiaryComplaintCategoryId } = currentState;

  const { subsidiaryComplaintCategoryId: subsidiaryComplaintCategoryIdPre } =
    preState;

  return subsidiaryComplaintCategoryIdPre !== subsidiaryComplaintCategoryId;
}
