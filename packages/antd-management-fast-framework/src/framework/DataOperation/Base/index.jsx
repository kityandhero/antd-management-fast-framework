import { message, notification } from 'antd';

import {
  stringIsNullOrWhiteSpace,
  isFunction,
  showRuntimeError,
} from '../../../utils/tools';

import AuthorizationWrapper from '../../AuthorizationWrapper';

class Base extends AuthorizationWrapper {
  needSetFormValueAfterLoad = true;

  supplementLoadRequestParams = (o) => o;

  buildInitialValues = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    if (this.loadDataAfterMount) {
      if (this.needSetFormValueAfterLoad) {
        return this.fillFormInitialValuesAfterLoad({
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        });
      }

      return {};
    }

    return {};
  };

  fillFormInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    const text =
      "if property “needSetFormValueAfterLoad” is true, fillFormInitialValuesAfterLoad need overload,if you don't want to do this,need set “needSetFormValueAfterLoad” to false 。";

    showRuntimeError({
      message: text,
    });

    return {};
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkSubmitData = (o) => {
    if ((o || null) == null) {
      const text = '提交的数据不能为空';

      showRuntimeError({
        message: text,
      });

      return false;
    }

    return this.checkSubmitRequestParams(o);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkSubmitRequestParams = (o) => true;

  doAfterSubmitSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      afterOK({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      });
    }
  };

  doOtherAfterSubmitSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {};

  sendSubmitSuccessMessage = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    const { type, text } = {
      ...{
        type: 'success',
        text: '',
      },
      ...this.buildMessage({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      }),
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

  buildMessage = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    return '';
  };

  sendSubmitSuccessNotification = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    const {
      type,
      placement,
      message: messageText,
      description,
    } = {
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
        description: this.buildNotificationDescription({
          singleData,
          listData,
          extraData,
          responseOriginalData,
          submitData,
        }),
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

  buildNotificationDescription = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    return `已成功更新信息，请继续其他操作。`;
  };
}

export default Base;
