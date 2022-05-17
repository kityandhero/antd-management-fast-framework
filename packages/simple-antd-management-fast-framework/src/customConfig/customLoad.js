import { recordDebug } from 'antd-management-fast-framework/es/utils/tools';

export function execBasicLayoutRemoteRequest(dispatch) {
  const metaDataType = 'global/getMetaData';

  recordDebug(`modal access: ${metaDataType}`);

  dispatch({
    type: metaDataType,
    payload: { force: false },
  });

  const currentOperatorType = 'currentOperator/getCurrentOperator';

  recordDebug(`modal access: ${currentOperatorType}`);

  dispatch({
    type: currentOperatorType,
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
