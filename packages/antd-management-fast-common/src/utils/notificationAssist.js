import { notification } from 'antd';

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
  const oAdjust = { ...(o || {}) };

  const { placement = 'bottomRight' } = {
    ...{
      placement: 'bottomRight',
    },
    ...(oAdjust || {}),
  };

  if (checkStringIsNullOrWhiteSpace(placement)) {
    return 'bottomRight';
  }

  return placement;
}

function adjustDuration(o) {
  const oAdjust = { ...(o || {}) };

  const { duration = 3000 } = {
    ...{
      duration: 3000,
    },
    ...(oAdjust || {}),
  };

  if (!isNumber(duration) || duration <= 0) {
    return 3;
  }

  return duration / 1000;
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

  setTimeout(() => {
    switch (type) {
      case notificationTypeCollection.open: {
        notification.open({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;
      }

      case notificationTypeCollection.loading: {
        notification.open({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;
      }

      case notificationTypeCollection.info: {
        notification.info({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;
      }

      case notificationTypeCollection.warn: {
        notification.warning({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;
      }

      case notificationTypeCollection.warning:
        notification.warning({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;

      case notificationTypeCollection.success:
        notification.success({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;

      case notificationTypeCollection.error:
        notification.error({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;

      default:
        notification.open({
          message: title,
          description,
          placement: placementAdjust,
          duration: durationAdjust,
          onClose,
        });

        break;
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
