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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
