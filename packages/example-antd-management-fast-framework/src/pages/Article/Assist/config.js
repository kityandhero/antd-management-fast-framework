export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { articleId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { articleId } = currentState;

  const { articleId: articleIdPre } = preState;

  return articleIdPre !== articleId;
}

export function getArticleIdFromExternalData(state) {
  const { externalData } = state;

  let articleId = '';

  if ((externalData || null) != null) {
    articleId = externalData.articleId || '';
  }

  return articleId;
}
