import { Modal } from 'antd';
import React from 'react';
import { Flip, toast } from 'react-toastify';

import { getDispatch } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  isUndefined,
  logDebug,
  logException,
  showSimpleSuccessNotification,
} from 'easy-soft-utility';

const { confirm } = Modal;

const toastOptions = {
  position: 'top-center',
  hideProgressBar: true,
  transition: Flip,
  closeButton: false,
  autoClose: false,
  style: {
    paddingTop: 0,
    paddingBottom: 0,
    '--toastify-toast-min-height': '40px',
    '--toastify-toast-width': 'auto',
    minWidth: '200px',
    maxWidth: '600px',
    fontSize: '14px',
    borderRadius: '8px',
  },
  bodyStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
};

function ToastContent({ text }) {
  return (
    <div
      style={{
        paddingTop: '4px',
        paddingBottom: '4px',
      }}
    >
      {text}
    </div>
  );
}

function remoteAction({
  api,
  params,
  target,
  failCallback,
  successMessage,
  successMessageBuilder,
  showProcessing = false,
  loadingKey = '',
  successCallback,
  completeProcess = null,
}) {
  logDebug(`model access: ${api}`);

  const dispatch = getDispatch();

  if ((dispatch || null) == null) {
    throw new Error('remoteAction: dispatch not allow null');
  }

  dispatch({
    type: api,
    payload: params,
  })
    .then((data) => {
      if (showProcessing) {
        setTimeout(() => {
          toast.dismiss(loadingKey);
        }, 200);
      }

      const { dataSuccess } = data;

      if (dataSuccess) {
        const {
          list: remoteListData,
          data: remoteData,
          extra: remoteExtraData,
        } = {
          list: [],
          data: null,
          extra: null,
          ...data,
        };

        let messageText = successMessage;

        if (isFunction(successMessageBuilder)) {
          messageText = successMessageBuilder({
            remoteListData: isArray(remoteListData) ? remoteListData : [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }

        if (!checkStringIsNullOrWhiteSpace(messageText)) {
          showSimpleSuccessNotification(messageText);
        }

        if (isFunction(successCallback)) {
          successCallback({
            target,
            params,
            remoteListData: isArray(remoteListData) ? remoteListData : [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }
      } else {
        if (isFunction(failCallback)) {
          failCallback({
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

      return data;
    })
    .catch((error) => {
      const { message } = error;

      if (!isUndefined()) {
        logException(message);
      }

      if (showProcessing) {
        setTimeout(() => {
          toast.dismiss(loadingKey);
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
 * remote assess wrapper core
 * @param {Object} option option
 * @param {string} option.api dva model effect like "modelName/effect"
 * @param {Object} option.params request params.
 * @param {Object} option.target the passed appendage object，eg "component".
 * @param {Function} option.failCallback  if it is function, it will exec when request fail.
 * @param {Function} option.successCallback if it is function, it will exec when request success.
 * @param {String} option.successMessage when request success. if successMessage not null or empty, will notify with this this message.
 * @param {Function} option.successMessageBuilder success message builder, priority over successMessage, must return string.
 * @param {Boolean} option.showProcessing whether show processing prompt.
 * @param {String} option.processingPrompt prompt text when show processing.
 * @param {Number} option.delay  delay millisecond before request.
 * @param {String} option.completeProcess request complete callback.
 * @param {Boolean} option.setProgressingFirst set state.processing to true before request
 * @param {Function} option.beforeProcess preprocessing of requests.
 */
export async function actionCore({
  api,
  params,
  target,
  failCallback,
  successCallback,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
  showProcessing = true,
  processingPrompt = '处理中，请稍后',
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
    // key = getGuid();

    key = toast.loading(
      <ToastContent
        text={
          checkStringIsNullOrWhiteSpace(processingPrompt)
            ? '处理中，请稍后'
            : processingPrompt
        }
      />,
      {
        ...toastOptions,
      },
    );

    // toast.loading({
    //   key,
    //   content: processingPrompt || '处理中，请稍后',
    //   duration: 0,
    // });
  }

  if (isFunction(beforeProcess)) {
    beforeProcess({ target, params });
  }

  if (setProgressingFirst) {
    target.setState({ processing: true }, () => {
      logDebug('state dispatchComplete will set to false');

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
                failCallback,
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
                  failCallback,
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
            failCallback,
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
              failCallback,
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

/**
 *
 * @param {Object} option request option
 * @param {string} option.api dva model effect like "modelName/effect"
 * @param {Object} option.params request params.
 * @param {Function} option.beforeProcess preprocessing of requests.
 * @param {Function} option.failCallback  if it is function, it will exec when request fail.
 * @param {Function} option.successCallback if it is function, it will exec when request success.
 * @param {String} option.successMessage when request success. if successMessage not null or empty, will notify with this this message.
 * @param {Function} option.successMessageBuilder success message builder, priority over successMessage, must return string.
 * @param {Boolean} option.showProcessing whether show processing prompt.
 * @param {String} option.processingPrompt prompt text when show processing.
 * @param {Object} option.completeProcess request complete callback.
 */
export function apiRequest({
  api,
  params,
  beforeProcess = null,
  failCallback = null,
  successCallback = null,
  successMessage = '',
  successMessageBuilder = null,
  showProcessing = false,
  processingPrompt = '',
  completeProcess = null,
}) {
  logDebug(`model access: ${api}`);

  const dispatch = getDispatch();

  let parametersAdjust = {};

  if (isFunction(beforeProcess)) {
    parametersAdjust = beforeProcess({ api, dispatch, params }) || params;
  }

  let key = '';

  if (showProcessing) {
    // key = getGuid();

    key = toast.loading(
      <ToastContent
        text={
          checkStringIsNullOrWhiteSpace(processingPrompt)
            ? '处理中，请稍后'
            : processingPrompt
        }
      />,
      {
        ...toastOptions,
      },
    );

    // message.loading({
    //   key,
    //   content: checkStringIsNullOrWhiteSpace(processingPrompt)
    //     ? '处理中，请稍后'
    //     : processingPrompt,
    //   duration: 0,
    // });
  }

  dispatch({
    type: api,
    payload: parametersAdjust,
  })
    .then((data) => {
      if (showProcessing) {
        setTimeout(() => {
          toast.dismiss(key);
        }, 200);
      }

      const { dataSuccess } = {
        dataSuccess: false,
        ...data,
      };

      if (dataSuccess) {
        const {
          list: remoteListData,
          data: remoteData,
          extra: remoteExtraData,
        } = {
          list: [],
          data: null,
          extra: null,
          ...data,
        };

        let messageText = successMessage;

        if (isFunction(successMessageBuilder)) {
          messageText = successMessageBuilder({
            remoteListData: isArray(remoteListData) ? remoteListData : [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }

        if (!checkStringIsNullOrWhiteSpace(messageText)) {
          showSimpleSuccessNotification(messageText);
        }

        if (isFunction(successCallback)) {
          successCallback({
            api,
            params,
            dispatch,
            remoteListData: isArray(remoteListData) ? remoteListData : [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }
      } else {
        if (isFunction(failCallback)) {
          failCallback({
            api,
            params,
            dispatch,
            remoteOriginal: data,
            error: null,
          });
        }
      }

      if (isFunction(completeProcess)) {
        completeProcess({ api, params, dispatch, remoteOriginal: data });
      }

      return data;
    })
    .catch((error) => {
      const { message } = error;

      if (!isUndefined()) {
        logException(message);
      }

      if (showProcessing) {
        setTimeout(() => {
          toast.dismiss(key);
        }, 200);
      }

      if (isFunction(completeProcess)) {
        completeProcess({ api, params, dispatch });
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
