export function execBasicLayoutRemoteRequest(dispatch) {
  dispatch({
    type: 'global/getMetaData',
    payload: { force: false },
  });

  dispatch({
    type: 'currentOperator/getCurrentOperator',
    payload: { force: false },
  });
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
