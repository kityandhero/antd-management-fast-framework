import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  showErrorNotification,
  showInfoNotification,
  showSimpleRuntimeError,
  showSimpleSuccessMessage,
  showSimpleWarningMessage,
  showSuccessNotification,
  showWarnNotification,
} from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';

import { AuthorizationWrapper } from '../../AuthorizationWrapper';

const primaryCallName = 'DataOperation::Base';

class Base extends AuthorizationWrapper {
  resetDataAfterLoad = true;

  submitSuccessTransferData = {};

  resetSubmitSuccessTransferData = () => {
    return {
      flag: false,
      singleData: null,
      listData: [],
      extraData: null,
      responseOriginalData: null,
      submitData: null,
    };
  };

  supplementLoadRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'supplementLoadRequestParams',
      emptyLogic,
    );

    return o;
  };

  buildInitialValues = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    this.logCallTrack(
      {
        parameter: { metaData, metaListData, metaExtra, metaOriginalData },
      },
      primaryCallName,
      'buildInitialValues',
    );

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
    this.logCallTrack(
      {
        parameter: { o },
      },
      primaryCallName,
      'checkSubmitData',
    );

    if ((o || null) == null) {
      const text = '提交的数据不能为空';

      showSimpleRuntimeError(text);

      return false;
    }

    return this.checkSubmitRequestParams(o);
  };

  // eslint-disable-next-line no-unused-vars
  checkSubmitRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'checkSubmitRequestParams',
      emptyLogic,
    );

    return true;
  };

  subjoinDataOnAfterOK = () => {
    this.logCallTrack({}, primaryCallName, 'subjoinDataOnAfterOK', emptyLogic);

    return {};
  };

  doAfterSubmitSuccess = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'doAfterSubmitSuccess');

    this.submitSuccessTransferData = {
      ...this.resetSubmitSuccessTransferData(),
      flag: true,
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    };

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

      this.logCallTrace(
        {
          singleData,
          listData,
          extraData,
          responseOriginalData,
          submitData,
          subjoinData: subjoinData || {},
        },
        primaryCallName,
        'doAfterSubmitSuccess',
        'trigger',
        'afterOK',
      );

      afterOK({
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
        subjoinData: subjoinData || {},
      });
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'doAfterSubmitSuccess',
        'trigger',
        'afterOK',
        emptyLogic,
      );
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
  }) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doOtherAfterSubmitSuccess',
      emptyLogic,
    );
  };

  sendSubmitSuccessMessage = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'sendSubmitSuccessMessage');

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
    this.logCallTrack({}, primaryCallName, 'buildMessage');

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
    this.logCallTrack({}, primaryCallName, 'buildMessageType');

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
    this.logCallTrack({}, primaryCallName, 'buildMessageText', emptyLogic);

    return '';
  };

  sendSubmitSuccessNotification = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'sendSubmitSuccessNotification');

    const { type, placement, message, description } = {
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
            showInfoNotification({ title: message, description, placement });
          }

          if (type === 'success') {
            showSuccessNotification({ title: message, description, placement });
          }

          if (type === 'warning') {
            showWarnNotification({ title: message, description, placement });
          }

          if (type === 'error') {
            showErrorNotification({ title: message, description, placement });
          }
        });
      }, 700);
    }
  };

  buildNotificationType = () => {
    this.logCallTrack({}, primaryCallName, 'buildNotificationType');

    return `success`;
  };

  buildNotificationPlacement = () => {
    this.logCallTrack({}, primaryCallName, 'buildNotificationPlacement');

    return `bottomRight`;
  };

  buildNotificationMessage = () => {
    this.logCallTrack({}, primaryCallName, 'buildNotificationMessage');

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
    this.logCallTrack({}, primaryCallName, 'buildNotificationDescription');

    return `已成功更新信息，请继续其他操作。`;
  };
}

export { Base };
