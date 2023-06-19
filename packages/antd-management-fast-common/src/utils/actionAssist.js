import { getDispatch } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  checkStringIsNullOrWhiteSpace,
  getGuid,
  isArray,
  isFunction,
  isUndefined,
  logException,
  logExecute,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  showSimpleSuccessNotification,
} from 'easy-soft-utility';

import { destroyMessage, message, modal } from '../components';

import { emptyLogic } from './constants';
import { modulePackageName } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'actionAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * remoteAction
 */
function remoteAction({
  api,
  params,
  target,
  handleData,
  failCallback,
  successCallback,
  successMessage,
  successMessageBuilder,
  showProcessing = false,
  loadingKey = '',
  completeProcess = null,
}) {
  logExecute(buildPromptModuleInfoText('remoteAction', `model access: ${api}`));

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
          destroyMessage(loadingKey);
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
            handleData,
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
            handleData,
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
            handleData,
            remoteOriginal: data,
            error: null,
          });
        }
      }

      if (isFunction(target.stopProcessing)) {
        target.stopProcessing();
      }

      if (isFunction(target.closePreventRender)) {
        target.closePreventRender(true);
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
          destroyMessage(loadingKey);
        }, 200);
      }

      if (isFunction(completeProcess)) {
        completeProcess({ target, params });
      }

      if (isFunction(target.stopProcessing)) {
        target.stopProcessing();
      }
    });
}

/**
 * remote assess wrapper core
 * @param {Object} option option
 * @param {string} option.api dva model effect like "modelName/effect"
 * @param {Object} option.params request params.
 * @param {Object} option.target the passed appendage object，eg "component".
 * @param {Object} option.handleData the data will transmit to callback.
 * @param {Function} option.beforeProcess preprocessing of requests.
 * @param {Number} option.delay  delay millisecond before request.
 * @param {Boolean} option.showProcessing whether show processing prompt.
 * @param {String} option.processingPrompt prompt text when show processing.
 * @param {String} option.completeProcess request complete callback.
 * @param {Function} option.failCallback  if it is function, it will exec when request fail.
 * @param {Function} option.successCallback if it is function, it will exec when request success.
 * @param {String} option.successMessage when request success. if successMessage not null or empty, will notify with this this message.
 * @param {Function} option.successMessageBuilder success message builder, priority over successMessage, must return string.
 */
export async function actionCore({
  api,
  params,
  handleData,
  target,
  beforeProcess = null,
  delay = 400,
  showProcessing = true,
  processingPrompt = '处理中，请稍后',
  completeProcess = null,
  failCallback = null,
  successCallback = null,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
}) {
  logExecute(buildPromptModuleInfoText('actionCore', `api:"${api}"`));

  if ((target || null) == null) {
    throw new Error('actionCore: target not allow null');
  }

  if ((target.props || null) == null) {
    throw new Error('actionCore: target.props not allow null');
  }

  let key = '';

  if (showProcessing) {
    logTrace(
      buildPromptModuleInfoText(
        'actionCore',
        mergeArrowText(`api:"${api}"`, 'showProcessing', true),
      ),
    );

    key = getGuid();

    message.loading({
      key,
      content: checkStringIsNullOrWhiteSpace(processingPrompt)
        ? '处理中，请稍后'
        : processingPrompt,
      duration: 0,
    });
  }

  if (isFunction(beforeProcess)) {
    beforeProcess({ target, params });
  }

  if (isFunction(target.openPreventRender)) {
    target.openPreventRender();
  }

  if (isFunction(target.startProcessing)) {
    target.startProcessing();
  }

  if (delay <= 0) {
    remoteAction({
      api,
      params,
      handleData,
      target,
      failCallback,
      successCallback,
      successMessage,
      successMessageBuilder,
      showProcessing,
      loadingKey: key,
      completeProcess,
    });
  } else {
    setTimeout(() => {
      // 延迟一定时间，优化界面呈现
      remoteAction({
        api,
        params,
        handleData,
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
  logExecute(buildPromptModuleInfoText('apiRequest', `model access: ${api}`));

  const dispatch = getDispatch();

  let parametersAdjust = {};

  if (isFunction(beforeProcess)) {
    parametersAdjust = beforeProcess({ api, dispatch, params }) || params;
  }

  let key = '';

  if (showProcessing) {
    logTrace(
      buildPromptModuleInfoText(
        'apiRequest',
        mergeArrowText('showProcessing', true),
      ),
    );

    key = getGuid();

    message.loading({
      key,
      content: checkStringIsNullOrWhiteSpace(processingPrompt)
        ? '处理中，请稍后'
        : processingPrompt,
      duration: 0,
    });
  }

  dispatch({
    type: api,
    payload: parametersAdjust,
  })
    .then((data) => {
      if (showProcessing) {
        setTimeout(() => {
          destroyMessage(key);
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
          logTrace(
            {
              api,
              params,
              dispatch,
              remoteOriginal: data,
              error: null,
            },
            buildPromptModuleInfoText(
              'apiRequest',
              'trigger',
              'successMessageBuilder',
            ),
          );

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
          logTrace(
            {
              api,
              params,
              dispatch,
              remoteOriginal: data,
              error: null,
            },
            buildPromptModuleInfoText('apiRequest', 'trigger', 'failCallback'),
          );

          failCallback({
            api,
            params,
            dispatch,
            remoteOriginal: data,
            error: null,
          });
        } else {
          logTrace(
            {
              api,
              params,
              dispatch,
              remoteOriginal: data,
              error: null,
            },
            buildPromptModuleInfoText(
              'apiRequest',
              'trigger',
              'failCallback',
              emptyLogic,
            ),
          );
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
          destroyMessage(key);
        }, 200);
      }

      if (isFunction(completeProcess)) {
        completeProcess({ api, params, dispatch });
      }
    });
}

/**
 * confirmActionCore
 * @param {Object} option option
 * @param {string} option.api dva model effect like "modelName/effect"
 * @param {Object} option.params request params.
 * @param {Object} option.target the passed appendage object，eg "component".
 * @param {Object} option.title title.
 * @param {Object} option.content content.
 * @param {Object} option.okText ok button text, default value is '确定'.
 * @param {Object} option.okType ok button type, default value is 'danger'.
 * @param {Object} option.cancelText cancel button text, default value is '取消'.
 * @param {Boolean} option.showProcessing whether show processing prompt.
 * @param {String} option.processingPrompt prompt text when show processing.
 * @param {String} option.completeProcess request complete callback.
 * @param {Function} option.beforeProcess preprocessing of requests.
 * @param {Function} option.failCallback  if it is function, it will exec when request fail.
 * @param {Function} option.successCallback if it is function, it will exec when request success.
 * @param {String} option.successMessage when request success. if successMessage not null or empty, will notify with this this message.
 * @param {Function} option.successMessageBuilder success message builder, priority over successMessage, must return string.
 */
export async function confirmActionCore({
  api,
  params,
  handleData,
  target,
  title,
  content,
  okText = '确定',
  okType = 'primary',
  cancelText = '取消',
  showProcessing = true,
  processingPrompt = '处理中，请稍后',
  beforeProcess = null,
  completeProcess = null,
  failCallback = null,
  successCallback = null,
  successMessage = '数据已经操作成功，请进行后续操作。',
  successMessageBuilder = null,
}) {
  logExecute('confirmActionCore');

  modal.confirm({
    title: title || '',
    content: content || '',
    okText: okText || '确定',
    okType: okType || 'primary',
    cancelText: cancelText || '取消',
    onOk: () => {
      setTimeout(() => {
        actionCore({
          api,
          params,
          handleData,
          target,
          failCallback,
          successCallback,
          successMessage,
          successMessageBuilder,
          showProcessing,
          processingPrompt,
          delay: 0,
          beforeProcess,
          completeProcess,
        });
      }, 300);
    },
    onCancel() {},
  });
}
