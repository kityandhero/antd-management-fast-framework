export function parseUrlParamsForSetState({ urlParams }) {
  const { id } = urlParams;

  return { accessWayId: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProps,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { accessWayId } = currentState;

  const { accessWayId: accessWayIdPre } = preState;

  return accessWayIdPre !== accessWayId;
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
