import { message, Modal } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  getGuid,
  isFunction,
  logDebug,
  logError,
  showSimpleSuccessNotification,
} from 'easy-soft-utility';

const { confirm } = Modal;

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
  logDebug(`model access: ${api}`);

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

        if (!checkStringIsNullOrWhiteSpace(messageText)) {
          showSimpleSuccessNotification(messageText);
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
      logError(res);

      if (showProcessing) {
        setTimeout(() => {
          message.destroy(loadingKey);
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

export function apiRequest({
  api,
  params,
  dispatch,
  beforeProcess = null,
  failureCallback,
  successCallback,
  successMessage,
  successMessageBuilder,
  showProcessing = false,
  textProcessing = '',
  completeProcess = null,
}) {
  logDebug(`model access: ${api}`);

  if ((dispatch || null) == null) {
    throw new Error('apiRequest: dispatch in params not allow null');
  }

  let paramsAdjust = {};

  if (isFunction(beforeProcess)) {
    paramsAdjust = beforeProcess({ api, dispatch, params }) || params;
  }

  let key = '';

  if (showProcessing) {
    key = getGuid();

    message.loading({
      key,
      content: checkStringIsNullOrWhiteSpace(textProcessing)
        ? '处理中，请稍后'
        : textProcessing,
      duration: 0,
    });
  }

  dispatch({
    type: api,
    payload: paramsAdjust,
  })
    .then((data) => {
      if (showProcessing) {
        setTimeout(() => {
          message.destroy(key);
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

        if (!checkStringIsNullOrWhiteSpace(messageText)) {
          showSimpleSuccessNotification(messageText);
        }

        if (isFunction(successCallback)) {
          successCallback({
            api,
            params,
            dispatch,
            remoteListData: remoteListData || [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }
      } else {
        if (isFunction(failureCallback)) {
          failureCallback({
            api,
            params,
            dispatch,
            remoteOriginal: data,
            error: null,
          });
        }
      }
    })
    .catch((res) => {
      logError(res);

      if (showProcessing) {
        setTimeout(() => {
          message.destroy(key);
        }, 200);
      }

      if (isFunction(completeProcess)) {
        completeProcess({ api, params, dispatch, params });
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
