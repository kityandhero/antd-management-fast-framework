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

class Base extends AuthorizationWrapper {
  resetDataAfterLoad = true;

  supplementLoadRequestParams = (o) => {
    this.logCallTrack(
      {},
      'DataOperation::Base',
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
      'DataOperation::Base',
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
      'DataOperation::Base',
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
      'DataOperation::Base',
      'checkSubmitRequestParams',
      emptyLogic,
    );

    return true;
  };

  subjoinDataOnAfterOK = () => {
    this.logCallTrack(
      {},
      'DataOperation::Base',
      'doAfterSubmitSuccess',
      emptyLogic,
    );

    return {};
  };

  doAfterSubmitSuccess = ({
    singleData = null,

    listData = [],

    extraData = null,

    responseOriginalData = null,

    submitData = null,
  }) => {
    this.logCallTrack({}, 'DataOperation::Base', 'doAfterSubmitSuccess');

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
      this.logCallTrace(
        {},
        'DataOperation::Base',
        'doAfterSubmitSuccess',
        'trigger',
        'afterOK',
      );

      const subjoinData = this.subjoinDataOnAfterOK();

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
        'DataOperation::Base',
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
      'DataOperation::Base',
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
    this.logCallTrack({}, 'DataOperation::Base', 'sendSubmitSuccessMessage');

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
    this.logCallTrack({}, 'DataOperation::Base', 'buildMessage');

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
    this.logCallTrack({}, 'DataOperation::Base', 'buildMessageType');

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
    this.logCallTrack(
      {},
      'DataOperation::Base',
      'buildMessageText',
      emptyLogic,
    );

    return '';
  };

  sendSubmitSuccessNotification = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    this.logCallTrack(
      {},
      'DataOperation::Base',
      'sendSubmitSuccessNotification',
    );

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
    this.logCallTrack({}, 'DataOperation::Base', 'buildNotificationType');

    return `success`;
  };

  buildNotificationPlacement = () => {
    this.logCallTrack({}, 'DataOperation::Base', 'buildNotificationPlacement');

    return `bottomRight`;
  };

  buildNotificationMessage = () => {
    this.logCallTrack({}, 'DataOperation::Base', 'buildNotificationMessage');

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
    this.logCallTrack(
      {},
      'DataOperation::Base',
      'buildNotificationDescription',
    );

    return `已成功更新信息，请继续其他操作。`;
  };
}

export { Base };
