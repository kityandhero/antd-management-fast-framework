import { message } from 'antd';

import { messageTypeCollection } from 'easy-soft-utility';

function showMessage({
  type,
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.success:
        message.success(messageText, duration, onClose);

        break;

      case messageTypeCollection.error:
        message.error(messageText, duration, onClose);

        break;

      case messageTypeCollection.info:
        message.info(messageText, duration, onClose);

        break;

      case messageTypeCollection.warning:
        message.warning(messageText, duration, onClose);

        break;

      case messageTypeCollection.warn:
        message.warning(messageText, duration, onClose);

        break;

      case messageTypeCollection.loading:
        message.loading(messageText, duration, onClose);

        break;

      default:
        message.open(messageText, duration, onClose);

        break;
    }
  });
}

export function showSuccessMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration,
    onClose,
  });
}

export function showErrorMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration,
    onClose,
  });
}

export function showWarnMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warn,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * 显示警告信息框
 */
export function showWarningMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * 显示消息信息
 */
export function showInfoMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration,
    onClose,
  });
}

export function showLoadingMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.loading,
    message: messageText,
    duration,
    onClose,
  });
}

export function showOpenMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.open,
    message: messageText,
    duration,
    onClose,
  });
}
