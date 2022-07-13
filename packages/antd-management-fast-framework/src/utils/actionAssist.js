import { message, Modal } from 'antd';

import {
  getGuid,
  getPathValue,
  isFunction,
  isString,
  isUndefined,
  notifySuccess,
  recordDebug,
  recordError,
  recordObject,
  showErrorMessage,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from './tools';

const { confirm } = Modal;

/**
 * apiDataConvertCore
 */
export function apiDataConvertCore({ props, modelName }) {
  if (isUndefined(props)) {
    throw new Error('props is undefined, please check params.');
  }

  if (stringIsNullOrWhiteSpace(modelName) || !isString(modelName)) {
    throw new Error(
      'apiDataConvertCore params: modelName must be a string, please check.',
    );
  }

  const m = getPathValue(props, modelName);

  if ((m || null) == null) {
    recordObject(props);

    recordError(
      `apiDataConvertCore error: model ${modelName} is null or undefined`,
    );
  }

  const { data } = m;

  if ((data || null) == null) {
    recordError(
      `apiDataConvertCore error: key “data” in model ${modelName} is null or undefined`,
    );
  }

  return data;
}

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

/**
 * remote assess core
 */
export async function actionCore({
  api,
  params,
  apiDataConvert = null,
  target,
  handleData,
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

  if (isFunction(beforeProcess)) {
    beforeProcess({ target, handleData });
  }

  if (setProgressingFirst) {
    target.setState({ processing: true }, () => {
      target.setState(
        {
          dispatchComplete: false,
        },
        () => {
          delay <= 0
            ? remoteAction({
                target,
                dispatch,
                api,
                params,
                handleData,
                apiDataConvert,
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
                  target,
                  dispatch,
                  api,
                  params,
                  handleData,
                  apiDataConvert,
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
            target,
            dispatch,
            api,
            params,
            handleData,
            apiDataConvert,
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
              target,
              dispatch,
              api,
              params,
              handleData,
              apiDataConvert,
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
  target,
  dispatch,
  api,
  params,
  handleData,
  apiDataConvert,
  successMessage,
  successMessageBuilder,
  showProcessing = false,
  loadingKey = '',
  successCallback,
  completeProcess = null,
}) {
  recordDebug(`modal access: ${api}`);

  dispatch({
    type: api,
    payload: params,
  })
    .then(() => {
      if (showProcessing) {
        setTimeout(() => {
          message.destroy(loadingKey);
        }, 200);
      }

      if (!isFunction(apiDataConvert)) {
        throw new Error('actionCore params: apiDataConvert must be function');
      }

      const data = apiDataConvert(target.props);

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
            handleData,
            remoteListData: remoteListData || [],
            remoteData: remoteData || null,
            remoteExtraData: remoteExtraData || null,
            remoteOriginal: data,
          });
        }
      }

      target.setState({
        processing: false,
        dispatchComplete: true,
      });
    })
    .catch((res) => {
      recordObject(res);

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
        completeProcess({ target, handleData });
      }
    });
}

/**
 * confirmActionCore
 * @param {*} param0
 */
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
