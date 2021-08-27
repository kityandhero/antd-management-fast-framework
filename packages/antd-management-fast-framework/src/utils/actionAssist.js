import { Modal } from 'antd';

import {
  isFunction,
  notifySuccess,
  showErrorMessage,
  showRuntimeError,
} from './tools';

const { confirm } = Modal;

export function handleItem({ target, dataId, compareDataIdHandler, handler }) {
  if ((target || null) == null) {
    throw new Error('actionCore: target not allow null');
  }

  if ((target.state || null) == null) {
    throw new Error('actionCore: target.state not allow null');
  }

  const { metaOriginalData } = target.state;

  if ((metaOriginalData || null) == null) {
    throw new Error('actionCore: target.state.metaOriginalData not allow null');
  }

  let indexData = -1;

  if (!isFunction(compareDataIdHandler)) {
    const text = `compareDataIdHandler mast be function`;

    showRuntimeError({
      message: text,
    });

    return;
  }

  if (!isFunction(handler)) {
    const text = `handler mast be function`;

    showRuntimeError({
      message: text,
    });

    return;
  }

  if ((metaOriginalData.list || null) == null) {
    throw new Error(
      'actionCore: target.state.metaOriginalData.list must be array',
    );
  }

  metaOriginalData.list.forEach((o, index) => {
    const compareDataId = compareDataIdHandler(o);

    if (compareDataId === dataId) {
      indexData = index;
    }
  });

  if (indexData >= 0) {
    metaOriginalData.list[indexData] = handler(
      metaOriginalData.list[indexData],
    );

    target.setState({ metaOriginalData });
  }
}

export async function actionCore({
  api,
  params,
  getApiData = null,
  target,
  record,
  successCallback,
  successMessage = '数据已经操作成功，请进行后续操作。',
}) {
  if ((record || null) == null) {
    const text = 'actionCore : record not allow null';

    showErrorMessage({
      message: text,
    });
  }

  if ((target || null) == null) {
    throw new Error('actionCore: target not allow null');
  }

  if ((target.props || null) == null) {
    throw new Error('actionCore: target.props not allow null');
  }

  const { dispatch } = target.props;

  if ((dispatch || null) == null) {
    throw new Error('actionCore: dispatch not allow null');
  }

  if (!isFunction(target.setState)) {
    throw new Error('actionCore: target.setState must be function');
  }

  target.setState({ processing: true });

  dispatch({
    type: api,
    payload: params,
  }).then(() => {
    if (!isFunction(getApiData)) {
      throw new Error('actionCore: getApiData must be function');
    }

    const data = getApiData(target.props);

    if ((data || null) == null) {
      throw new Error('actionCore: getApiData result not allow null');
    }

    const { dataSuccess } = data;

    if (dataSuccess) {
      const { data: remoteData } = data;

      notifySuccess(successMessage);

      if (isFunction(successCallback)) {
        successCallback({
          target,
          record,
          remoteData: remoteData || null,
        });
      }
    }

    target.setState({ processing: false });
  });
}

export async function confirmActionCore({
  title,
  content,
  okText = '确定',
  okType = 'danger',
  cancelText = '取消',
  target,
  record,
  successCallback,
  okAction = null,
  successMessage = '数据已经操作成功，请进行后续操作。',
}) {
  if (!isFunction(okAction)) {
    throw new Error('actionCore: okAction must be function');
  }

  const { processing } = target.state;

  confirm({
    title: title || '',
    content: content || '',
    okText: okText || '确定',
    okType: okType || 'danger',
    cancelText: cancelText || '取消',
    confirmLoading: { processing },
    onOk() {
      okAction({ target, record, successCallback, successMessage });
    },
    onCancel() {},
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}