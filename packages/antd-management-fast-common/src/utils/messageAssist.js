import { toast } from 'react-toastify';

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

function showMessage({ type, duration = 3, text, onClose = () => {} }) {
  requestAnimationFrame(() => {
    const options = {
      position: 'top-right',
      autoClose: duration * 1000,
      hideProgressBar: true,
      transition: 'flip',
      closeButton: false,
      onClose,
    };

    switch (type) {
      case messageTypeCollection.open: {
        toast(text, options);

        break;
      }

      case messageTypeCollection.loading: {
        toast.loading(text, options);

        break;
      }

      case messageTypeCollection.info: {
        toast.info(text, options);

        break;
      }

      case messageTypeCollection.warn: {
        toast.warn(text, options);

        break;
      }

      case messageTypeCollection.warning: {
        toast.warning(text, options);

        break;
      }

      case messageTypeCollection.success: {
        toast.success(text, options);

        break;
      }

      case messageTypeCollection.error: {
        toast.error(text, options);

        break;
      }

      default: {
        toast(text, options);

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
