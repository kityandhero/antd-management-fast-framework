import { logDebug } from 'antd-management-fast-common/es/utils/tools';

export function execBasicLayoutRemoteRequest(dispatch) {
  const metaDataType = 'global/getMetaData';

  logDebug(`model access: ${metaDataType}`);

  dispatch({
    type: metaDataType,
    payload: { force: false },
  });

  const currentOperatorType = 'currentOperator/getCurrentOperator';

  logDebug(`model access: ${currentOperatorType}`);

  dispatch({
    type: currentOperatorType,
    payload: { force: false },
  });
}
