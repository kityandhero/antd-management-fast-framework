import {
  actionCore,
  apiDataConvertCore,
} from 'antd-management-fast-framework/es/utils/actionAssist';

function apiDataConvert(props) {
  return apiDataConvertCore({ props, modelName: 'entrance' });
}

export async function signInAction({ target, handleData, successCallback }) {
  actionCore({
    api: 'entrance/signIn',
    params: handleData,
    apiDataConvert,
    target,
    handleData,
    successCallback,
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
