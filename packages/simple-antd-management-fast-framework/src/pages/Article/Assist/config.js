export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { articleId: id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function checkNeedUpdateAssist(currentState, preProps, preState, snapshot) {
  const { articleId } = currentState;

  const { articleId: articleIdPre } = preState;

  return articleIdPre !== articleId;
}

export function getArticleIdFromExternalData(state) {
  const { externalData } = state;

  let productId = '';

  if ((externalData || null) != null) {
    productId = externalData.productId || '';
  }

  return productId;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
