import { actionCore } from 'antd-management-fast-common/es/utils/actionAssist';

export async function signInAction({ target, handleData, successCallback }) {
  actionCore({
    api: 'entrance/signIn',
    params: handleData,
    target,
    handleData,
    successCallback,
    showProcessing: false,
  });
}
