import { notification } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  showSimpleRuntimeError,
  showSimpleSuccessMessage,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import { AuthorizationWrapper } from '../../AuthorizationWrapper';

class Base extends AuthorizationWrapper {
  resetDataAfterLoad = true;

  supplementLoadRequestParams = (o) => o;

  buildInitialValues = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    if (this.resetDataAfterLoad || false) {
      return this.fillInitialValuesAfterLoad({
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      });
    }

    return {};
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const text =
      "if property “resetDataAfterLoad” is true, fillInitialValuesAfterLoad need overload to fill from,if you don't want to do this,need set “resetDataAfterLoad” to false 。";

    showSimpleRuntimeError(text);

    return {};
  };

  checkSubmitData = (o) => {
    if ((o || null) == null) {
      const text = '提交的数据不能为空';

      showSimpleRuntimeError(text);

      return false;
    }

    return this.checkSubmitRequestParams(o);
  };

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = (o) => true;

  subjoinDataOnAfterOK = () => {
    return {};
  };

  doAfterSubmitSuccess = ({
    singleData = null,

    listData = [],

    extraData = null,

    responseOriginalData = null,

    submitData = null,
  }) => {
    const { afterOK } = this.props;

    this.doOtherAfterSubmitSuccess({
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    });

    this.sendSubmitSuccessMessage({
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    });

    this.sendSubmitSuccessNotification({
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    });

    if (isFunction(afterOK)) {
      const subjoinData = this.subjoinDataOnAfterOK();

      afterOK({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
        subjoinData: subjoinData || {},
      });
    }
  };

  doOtherAfterSubmitSuccess = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {};

  sendSubmitSuccessMessage = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    const { type, text } = {
      type: 'success',
      text: '',
      ...this.buildMessage({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      }),
    };

    if (!checkStringIsNullOrWhiteSpace(text)) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (type === 'success') {
            showSimpleSuccessMessage(text);
          }

          if (type === 'warn') {
            showSimpleWarningMessage(text);
          }
        });
      }, 700);
    }
  };

  buildMessage = ({
    singleData = null,

    listData = [],

    extraData = null,

    responseOriginalData = null,

    submitData = null,
  }) => {
    return {
      type: this.buildMessageType(),
      text: this.buildMessageText({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      }),
    };
  };

  buildMessageType = () => {
    return 'success';
  };

  buildMessageText = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    return '';
  };

  sendSubmitSuccessNotification = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    const {
      type,
      placement,
      message: messageText,
      description,
    } = {
      type: this.buildNotificationType(),
      placement: this.buildNotificationPlacement(),
      message: this.buildNotificationMessage(),
      description: this.buildNotificationDescription({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      }),
    };

    if (!checkStringIsNullOrWhiteSpace(description)) {
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

  buildNotificationDescription = ({
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    return `已成功更新信息，请继续其他操作。`;
  };
}

export { Base };
