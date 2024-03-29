import {
  messageTypeCollection,
  setDurationConversionRatio,
  setErrorMessageDisplayMonitor,
  setInfoMessageDisplayMonitor,
  setLoadingMessageDisplayMonitor,
  setOpenMessageDisplayMonitor,
  setSuccessMessageDisplayMonitor,
  setWarningMessageDisplayMonitor,
  setWarnMessageDisplayMonitor,
} from 'easy-soft-utility';

import { message } from '../components';

function showMessage({ type, duration = 3, text, onClose = () => {} }) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.open: {
        message.open({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      case messageTypeCollection.loading: {
        message.loading({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      case messageTypeCollection.info: {
        message.info({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      case messageTypeCollection.warn: {
        message.warning({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      case messageTypeCollection.warning: {
        message.warning({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      case messageTypeCollection.success: {
        message.success({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      case messageTypeCollection.error: {
        message.error({
          duration,
          content: text,
          onClose,
        });

        break;
      }

      default: {
        message.open({
          duration,
          content: text,
          onClose,
        });

        break;
      }
    }
  });
}

function showOpenMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.open,
    text: text,
    duration,
    onClose,
  });
}

function showLoadingMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.loading,
    text: text,
    duration,
    onClose,
  });
}

/**
 * 显示消息信息
 */
function showInfoMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.info,
    text: text,
    duration,
    onClose,
  });
}

function showSuccessMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.success,
    text: text,
    duration,
    onClose,
  });
}

function showErrorMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.error,
    text: text,
    duration,
    onClose,
  });
}

function showWarnMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.warn,
    text: text,
    duration,
    onClose,
  });
}

/**
 * 显示警告信息框
 */
function showWarningMessage({ duration = 3, text, onClose = () => {} }) {
  showMessage({
    type: messageTypeCollection.warning,
    text: text,
    duration,
    onClose,
  });
}

/**
 * 设置 MessageDisplayMonitor 显示处理
 */
export function setMessageDisplayMonitor() {
  setDurationConversionRatio(1000);

  setInfoMessageDisplayMonitor(showInfoMessage);
  setOpenMessageDisplayMonitor(showOpenMessage);
  setLoadingMessageDisplayMonitor(showLoadingMessage);
  setWarnMessageDisplayMonitor(showWarnMessage);
  setWarningMessageDisplayMonitor(showWarningMessage);
  setSuccessMessageDisplayMonitor(showSuccessMessage);
  setErrorMessageDisplayMonitor(showErrorMessage);
}
