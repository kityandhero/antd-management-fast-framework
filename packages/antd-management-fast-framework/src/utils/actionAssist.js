import { Modal, message } from 'antd';

import {
  isFunction,
  notifySuccess,
  showErrorMessage,
  showRuntimeError,
  getGuid,
} from './tools';

const { confirm } = Modal;

/**
 * 处理 actionCore 的异步请求结果
 * @param {*} param0
 * @returns
 */
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
  handleData,
  successCallback,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中，请稍后',
}) {
  if ((handleData || null) == null) {
    const text = 'actionCore : handleData not allow null';

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

  let key = '';

  if (showProcessing) {
    key = getGuid();

    message.loading({
      key,
      content: textProcessing || '处理中，请稍后',
      duration: 0,
    });
  }

  target.setState({ processing: true });

  dispatch({
    type: api,
    payload: params,
  })
    .then(() => {
      if (showProcessing) {
        setTimeout(() => {
          message.destroy(key);
        }, 200);
      }

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

        let messageText = successMessage;

        if (isFunction(successMessageBuilder)) {
          messageText = successMessageBuilder(remoteData);
        }

        notifySuccess(messageText);

        if (isFunction(successCallback)) {
          successCallback({
            target,
            handleData,
            remoteData: remoteData || null,
          });
        }
      }

      target.setState({ processing: false });
    })
    .catch(() => {
      if (showProcessing) {
        message.destroy(key);
      }
    });
}

export async function confirmActionCore({
  title,
  content,
  okText = '确定',
  okType = 'danger',
  cancelText = '取消',
  target,
  handleData,
  successCallback,
  okAction = null,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
  showProcessing = true,
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
      okAction({
        target,
        handleData,
        successCallback,
        successMessage,
        successMessageBuilder,
        showProcessing,
      });
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
