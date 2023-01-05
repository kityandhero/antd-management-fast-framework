import { message, Modal } from 'antd';

import {
  getGuid,
  isFunction,
  notifySuccess,
  recordDebug,
  recordError,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from './tools';

const { confirm } = Modal;

/**
 * 处理 actionCore 的异步请求结果
 * @param {*} target 目标调用对象
 * @param {*} target 数据标记
 * @param {*} compareDataIdHandler 对比函数
 * @param {*} handler 处理函数
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

/**
 * remote assess wrapper core
 * @param {*} api [string] remote api path.
 * @param {*} params [object] remote api params.
 * @param {*} target [object] target.
 * @param {*} failureCallback [function] remote access logic fail handler, eg. failureCallback(remoteData,whetherCauseByAuthorizeFail).
 * @param {*} successCallback [function] remote access logic success handler.
 * @param {*} successMessage [string] the message when remote access logic success. if successMessage not null or empty, will trigger toast notification.
 * @param {*} successMessageBuilder [function] remote access logic success message builder, priority over successMessage.
 * @param {*} showProcessing [bool] whether show processing toast.
 * @param {*} textProcessing [string] processing toast text.
 */
export async function actionCore({
  api,
  params,
  target,
  failureCallback,
  successCallback,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
  showProcessing = true,
  textProcessing = '处理中，请稍后',
  delay = 400,
  setProgressingFirst = true,
  beforeProcess = null,
  completeProcess = null,
}) {
  if ((target || null) == null) {
    throw new Error('actionCore: target not allow null');
  }

  if ((target.props || null) == null) {
    throw new Error('actionCore: target.props not allow null');
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

  if (isFunction(beforeProcess)) {
    beforeProcess({ target, params });
  }

  if (setProgressingFirst) {
    target.setState({ processing: true }, () => {
      recordDebug('state dispatchComplete will set to false');

      target.setState(
        {
          dispatchComplete: false,
        },
        () => {
          delay <= 0
            ? remoteAction({
                api,
                params,
                target,
                failureCallback,
                successMessage,
                successMessageBuilder,
                showProcessing,
                loadingKey: key,
                successCallback,
                completeProcess,
              })
            : setTimeout(() => {
                // 延迟一定时间，优化界面呈现
                remoteAction({
                  api,
                  params,
                  target,
                  failureCallback,
                  successMessage,
                  successMessageBuilder,
                  showProcessing,
                  loadingKey: key,
                  successCallback,
                  completeProcess,
                });
              }, delay);
        },
      );
    });
  } else {
    target.setState({ processing: true, dispatchComplete: false }, () => {
      delay <= 0
        ? remoteAction({
            api,
            params,
            target,
            failureCallback,
            successMessage,
            successMessageBuilder,
            showProcessing,
            loadingKey: key,
            successCallback,
            completeProcess,
          })
        : setTimeout(() => {
            // 延迟一定时间，优化界面呈现
            remoteAction({
              api,
              params,
              target,
              failureCallback,
              successMessage,
              successMessageBuilder,
              showProcessing,
              loadingKey: key,
              successCallback,
              completeProcess,
            });
          }, delay);
    });
  }
}

function remoteAction({
  api,
  params,
  target,
  failureCallback,
  successMessage,
  successMessageBuilder,
  showProcessing = false,
  loadingKey = '',
  successCallback,
  completeProcess = null,
}) {
  recordDebug(`model access: ${api}`);

  const { dispatch } = target.props;

  if ((dispatch || null) == null) {
    throw new Error('remoteAction: dispatch in target.props not allow null');
  }

  dispatch({
    type: api,
    payload: params,
  })
    .then((data) => {
      if (showProcessing) {
        setTimeout(() => {
          message.destroy(loadingKey);
        }, 200);
      }

      const { dataSuccess } = data;

      if (dataSuccess) {
        const {
          list: remoteListData,
          data: remoteData,
          extra: remoteExtraData,
        } = {
          ...{
            list: [],
            data: null,
            extra: null,
          },
          ...data,
        };

        let messageText = successMessage;

        if (isFunction(successMessageBuilder)) {
          messageText = successMessageBuilder({
            remoteListData: remoteListData || [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }

        if (!stringIsNullOrWhiteSpace(messageText)) {
          notifySuccess(messageText);
        }

        if (isFunction(successCallback)) {
          successCallback({
            target,
            params,
            remoteListData: remoteListData || [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }
      } else {
        if (isFunction(failureCallback)) {
          failureCallback({
            target,
            params,
            remoteOriginal: data,
            error: null,
          });
        }
      }

      target.setState({
        processing: false,
        dispatchComplete: true,
      });
    })
    .catch((res) => {
      recordError(res);

      if (showProcessing) {
        setTimeout(() => {
          message.destroy(key);
        }, 200);
      }

      target.setState({
        processing: false,
        dispatchComplete: true,
      });

      if (isFunction(completeProcess)) {
        completeProcess({ target, params });
      }
    });
}

/**
 * confirmActionCore
 * @param {*} param0
 */
export async function confirmActionCore({
  target,
  params,
  title,
  content,
  okText = '确定',
  okType = 'danger',
  cancelText = '取消',
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
        params,
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
