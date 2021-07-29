import { message, notification } from 'antd';

import {
  stringIsNullOrWhiteSpace,
  isFunction,
  showRuntimeErrorMessage,
} from '../../../utils/tools';

import AuthorizationWrapper from '../../AuthorizationWrapper';

class Base extends AuthorizationWrapper {
  supplementLoadRequestParams = o => o;

  // eslint-disable-next-line no-unused-vars
  checkSubmitData = o => {
    if ((o || null) == null) {
      showRuntimeErrorMessage('提交的数据不能为空');

      return false;
    }

    return this.checkSubmitRequestParams(o);
  };

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = o => true;

  doAfterSubmitSuccess = (
    singleData,
    listData,
    extraData,
    responseOriginalData,
    submitData,
  ) => {
    const { afterOK } = this.props;

    this.doOtherAfterSubmitSuccess(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    );

    this.sendSubmitSuccessMessage(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    );

    this.sendSubmitSuccessNotification(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    );

    if (isFunction(afterOK)) {
      afterOK(
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      );
    }
  };

  doOtherAfterSubmitSuccess = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {};

  sendSubmitSuccessMessage = (
    singleData,
    listData,
    extraData,
    responseOriginalData,
    submitData,
  ) => {
    const { type, text } = {
      ...{
        type: 'success',
        text: '',
      },
      ...this.buildMessage(
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      ),
    };

    if (!stringIsNullOrWhiteSpace(text)) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (type === 'success') {
            message.success(text);
          }

          if (type === 'warn') {
            message.warn(text);
          }
        });
      }, 700);
    }
  };

  buildMessage = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    return {
      type: this.buildMessageType(),
      text: this.buildMessageText(
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      ),
    };
  };

  buildMessageType = () => {
    return 'success';
  };

  buildMessageText = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    return '';
  };

  sendSubmitSuccessNotification = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    const { type, placement, message: messageText, description } = {
      ...{
        type: 'success',
        placement: 'bottomRight',
        message: '操作执行通知',
        description: '',
      },
      ...{
        type: this.buildNotificationType(),
        placement: this.buildNotificationPlacement(),
        message: this.buildNotificationMessage(),
        description: this.buildNotificationDescription(
          singleData,
          listData,
          extraData,
          responseOriginalData,
          submitData,
        ),
      },
    };

    if (!stringIsNullOrWhiteSpace(description)) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (type === 'info') {
            notification.info({
              placement,
              message: messageText,
              description,
            });
          }

          if (type === 'success') {
            notification.success({
              placement,
              message: messageText,
              description,
            });
          }

          if (type === 'warning') {
            notification.warning({
              placement,
              message: messageText,
              description,
            });
          }

          if (type === 'error') {
            notification.error({
              placement,
              message: messageText,
              description,
            });
          }
        });
      }, 700);
    }
  };

  buildNotificationType = () => {
    return `success`;
  };

  buildNotificationPlacement = () => {
    return `bottomRight`;
  };

  buildNotificationMessage = () => {
    return `操作执行通知`;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    return `已成功更新信息，请继续其他操作。`;
  };
}

export default Base;
