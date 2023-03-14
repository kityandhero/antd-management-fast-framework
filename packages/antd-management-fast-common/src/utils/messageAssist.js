import React from 'react';
import { Flip, toast } from 'react-toastify';

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
      position: 'top-center',
      autoClose: duration * 1000,
      hideProgressBar: true,
      transition: Flip,
      closeButton: false,
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
      onClose,
    };

    const content = (
      <div
        style={{
          paddingTop: '4px',
          paddingBottom: '4px',
        }}
      >
        {text}
      </div>
    );

    switch (type) {
      case messageTypeCollection.open: {
        toast(content, options);

        break;
      }

      case messageTypeCollection.loading: {
        toast.loading(content, options);

        break;
      }

      case messageTypeCollection.info: {
        toast.info(content, options);

        break;
      }

      case messageTypeCollection.warn: {
        toast.warn(content, options);

        break;
      }

      case messageTypeCollection.warning: {
        toast.warning(content, options);

        break;
      }

      case messageTypeCollection.success: {
        toast.success(content, options);

        break;
      }

      case messageTypeCollection.error: {
        toast.error(content, options);

        break;
      }

      default: {
        toast(content, options);

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
