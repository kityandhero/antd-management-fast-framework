import React from 'react';
import { toast } from 'react-toastify';

import {
  checkStringIsNullOrWhiteSpace,
  isNumber,
  logWarn,
  notificationTypeCollection,
  setErrorNotificationDisplayMonitor,
  setInfoNotificationDisplayMonitor,
  setLoadingNotificationDisplayMonitor,
  setOpenNotificationDisplayMonitor,
  setSuccessNotificationDisplayMonitor,
  setWarningNotificationDisplayMonitor,
  setWarnNotificationDisplayMonitor,
} from 'easy-soft-utility';

function adjustPlacement(o) {
  const oAdjust = { ...o };

  const { placement = '' } = {
    placement: '',
    ...oAdjust,
  };

  if (checkStringIsNullOrWhiteSpace(placement)) {
    return toast.POSITION.BOTTOM_RIGHT;
  }

  return placement;
}

function adjustDuration(o) {
  const oAdjust = { ...o };

  const { duration = 3000 } = {
    duration: 3000,
    ...oAdjust,
  };

  if (!isNumber(duration) || duration <= 0) {
    return 3;
  }

  return duration / 1;
}

function NotifyContent({ title, description }) {
  if (
    checkStringIsNullOrWhiteSpace(title) &&
    checkStringIsNullOrWhiteSpace(description)
  ) {
    return null;
  }
  if (
    checkStringIsNullOrWhiteSpace(title) ||
    checkStringIsNullOrWhiteSpace(description)
  ) {
    if (checkStringIsNullOrWhiteSpace(title)) {
      return description;
    }

    if (checkStringIsNullOrWhiteSpace(description)) {
      return title;
    }
  }

  return (
    <div>
      <div style={{ fontSize: '16px' }}>{title}:</div>
      <div style={{ fontSize: '14px' }}>{description}</div>
    </div>
  );
}

/**
 * 发送通知
 */
export function notify({
  type,
  title = '',
  description = '',
  placement,
  duration = 3000,
  onClose = () => {},
}) {
  const placementAdjust = adjustPlacement({
    placement: placement,
  });

  const durationAdjust = adjustDuration({
    duration: duration,
  });

  if (
    checkStringIsNullOrWhiteSpace(title) &&
    checkStringIsNullOrWhiteSpace(description)
  ) {
    logWarn('ignore send notification, title and description are empty');

    return;
  }

  const content = <NotifyContent title={title} description={description} />;

  const options = {
    position: placementAdjust,
    autoClose: durationAdjust,
    onClose,
  };

  setTimeout(() => {
    switch (type) {
      case notificationTypeCollection.open: {
        toast(content, options);

        break;
      }

      case notificationTypeCollection.loading: {
        toast.loading(content, options);

        break;
      }

      case notificationTypeCollection.info: {
        toast(content, options);

        break;
      }

      case notificationTypeCollection.warn: {
        toast.warn(content, options);

        break;
      }

      case notificationTypeCollection.warning: {
        toast(content, options);

        break;
      }

      case notificationTypeCollection.success: {
        toast(content, options);

        break;
      }

      case notificationTypeCollection.error: {
        toast(content, options);

        break;
      }

      default: {
        toast(content, options);

        break;
      }
    }
  }, 600);
}

function showOpenNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.open,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showLoadingNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.loading,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showInfoNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.info,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showWarnNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.warn,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showWarningNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.warning,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

function showSuccessNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.success,
    title,
    description: checkStringIsNullOrWhiteSpace(description)
      ? '操作成功，请进行后续操作。'
      : description,
    placement,
    duration,
    onClose,
  });
}

function showErrorNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  notify({
    type: notificationTypeCollection.error,
    title,
    description,
    placement,
    duration,
    onClose,
  });
}

/**
 * 设置 NotificationDisplayMonitor 显示处理
 */
export function setNotificationDisplayMonitor() {
  setOpenNotificationDisplayMonitor(showOpenNotification);
  setLoadingNotificationDisplayMonitor(showLoadingNotification);
  setInfoNotificationDisplayMonitor(showInfoNotification);
  setWarnNotificationDisplayMonitor(showWarnNotification);
  setWarningNotificationDisplayMonitor(showWarningNotification);
  setSuccessNotificationDisplayMonitor(showSuccessNotification);
  setErrorNotificationDisplayMonitor(showErrorNotification);
}
