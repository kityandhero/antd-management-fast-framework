import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  logException,
  mergeArrowText,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';

import { switchControlAssist } from '../../../utils/switchControlAssist';
import { Base } from '../Base';

const primaryCallName = 'DataOperation::BaseWindow';

class BaseWindow extends Base {
  visibleFlag = '';

  reloadWhenShow = false;

  loadRemoteRequestAfterMount = false;

  formRef = React.createRef();

  submitWithForm = true;

  reloadHeaderOnSubmitSuccess = false;

  destroyOnClose = false;

  constructor(properties, visibleFlag = '') {
    super(properties);

    if (checkStringIsNullOrWhiteSpace(visibleFlag || '')) {
      throw new Error(
        mergeArrowText(
          this.componentName,
          'constructor(properties, visibleFlag)',
          `visibleFlag disallow empty`,
        ),
      );
    }

    this.visibleFlag = visibleFlag;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData };
  }

  adjustAfterCloseParameter = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'adjustAfterCloseParameter',
      emptyLogic,
    );

    return null;
  };

  /**
   * 当可见性变为显示时执行
   */
  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToShow',
      emptyLogic,
    );
  };

  /**
   * 当可见性变为显示时附加的执行
   */
  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
      emptyLogic,
    );
  };

  /**
   * 当可见性变为隐藏时执行
   */
  doOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 当可见性变为隐藏后附加的执行
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 当可见性变更后的附加执行
   */
  executeOtherAfterDoOtherWhenChangeVisible = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeOtherAfterDoOtherWhenChangeVisible',
      emptyLogic,
    );
  };

  /**
   * 当可见性发生变化时执行
   */
  doOtherWhenChangeVisible = (currentVisible) => {
    this.logCallTrack(
      {
        parameter: { currentVisible },
      },
      primaryCallName,
      'doOtherWhenChangeVisible',
    );

    if (currentVisible) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'doOtherWhenChangeVisibleToShow',
      );

      this.doOtherWhenChangeVisibleToShow();

      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'executeAfterDoOtherWhenChangeVisibleToShow',
      );

      this.executeAfterDoOtherWhenChangeVisibleToShow();
    } else {
      const { afterClose } = this.props;

      if (isFunction(afterClose)) {
        this.logCallTrace(
          {
            parameter: {
              ...this.adjustAfterCloseParameter(),
              ...this.submitSuccessTransferData,
            },
          },
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
        );

        afterClose({
          ...this.adjustAfterCloseParameter(),
          ...this.submitSuccessTransferData,
        });
      } else {
        this.logCallTrace(
          {
            parameter: {
              ...this.adjustAfterCloseParameter(),
              ...this.submitSuccessTransferData,
            },
          },
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
          emptyLogic,
        );
      }

      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'doOtherWhenChangeVisibleToHide',
      );

      this.doOtherWhenChangeVisibleToHide();

      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisible',
        'trigger',
        'executeAfterDoOtherWhenChangeVisibleToHide',
      );

      this.executeAfterDoOtherWhenChangeVisibleToHide();
    }

    this.logCallTrace(
      {
        parameter: {
          currentVisible,
        },
      },
      primaryCallName,
      'doOtherWhenChangeVisible',
      'trigger',
      'executeOtherAfterDoOtherWhenChangeVisible',
    );

    this.executeOtherAfterDoOtherWhenChangeVisible(currentVisible);

    this.logCallTrace(
      {},
      primaryCallName,
      'doOtherWhenChangeVisible',
      'trigger',
      'resetSubmitSuccessTransferData',
    );

    this.submitSuccessTransferData = {
      ...this.resetSubmitSuccessTransferData(),
    };
  };

  getTargetForm = () => {
    this.logCallTrack({}, primaryCallName, 'getTargetForm');

    return this.formRef.current;
  };

  handleOtherOnResetTargetForm = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'handleOtherOnResetTargetForm',
      emptyLogic,
    );
  };

  resetTargetForm = () => {
    this.logCallTrack({}, primaryCallName, 'resetTargetForm');

    const form = this.getTargetForm();

    if (!form) {
      this.logCallTrace(
        {},
        primaryCallName,
        'resetTargetForm',
        'trigger',
        'handleOtherOnResetTargetForm',
      );

      this.handleOtherOnResetTargetForm();

      return;
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'resetTargetForm',
      'trigger',
      'form.resetFields()',
    );

    form.resetFields();

    this.logCallTrace(
      {},
      primaryCallName,
      'resetTargetForm',
      'trigger',
      'handleOtherOnResetTargetForm',
    );

    this.handleOtherOnResetTargetForm();
  };

  supplementSubmitRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'supplementSubmitRequestParams',
      emptyLogic,
    );

    return o;
  };

  afterLoadSuccess = ({
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      primaryCallName,
      'afterLoadSuccess',
    );

    this.logCallTrace(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      primaryCallName,
      'afterLoadSuccess',
      'trigger',
      'fillData',
    );

    this.fillData({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    this.logCallTrace(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      primaryCallName,
      'afterLoadSuccess',
      'trigger',
      'doOtherAfterLoadSuccess',
    );

    this.doOtherAfterLoadSuccess({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doOtherAfterLoadSuccess',
      emptyLogic,
    );
  };

  onClose = () => {
    const { onClose: triggerClose } = this.props;

    if (isFunction(triggerClose)) {
      this.logCallTrace({}, primaryCallName, 'trigger', 'onClose');

      triggerClose();
    } else {
      this.logCallTrace({}, primaryCallName, 'trigger', 'onClose', emptyLogic);
    }

    switchControlAssist.close(this.getVisibleFlag());
  };

  fillData = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      primaryCallName,
      'fillData',
    );

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    if (initialValues != null) {
      this.setFormFieldsValue(initialValues);
    }
  };

  setFormFieldsValue = (v) => {
    this.logCallTrack({}, primaryCallName, 'setFormFieldsValue');

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = (value) => {
    this.logCallTrack({}, primaryCallName, 'afterSetFieldsValue', emptyLogic);
  };

  afterCheckSubmitRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'afterCheckSubmitRequestParams',
      emptyLogic,
    );

    return o;
  };

  execSubmitApi = ({
    values = {},
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    const that = this;

    that.logCallTrack(
      {
        parameter: { values },
      },
      primaryCallName,
      'execSubmitApi',
    );

    const { submitApiPath } = that.state;

    if ((submitApiPath || '') === '') {
      const text = `缺少 submitApiPath 配置！`;

      showSimpleRuntimeError(text);

      return;
    }

    let submitData = pretreatmentRequestParameters(values || {});

    submitData = that.supplementSubmitRequestParams(submitData);

    const checkResult = that.checkSubmitData(submitData);

    submitData = that.afterCheckSubmitRequestParams(submitData);

    if (checkResult) {
      that.startProcessing();
      that.openPreventRender();

      that
        .dispatchApi({
          type: submitApiPath,
          payload: submitData,
        })
        .then((remoteData) => {
          that.stopProcessing();

          const { dataSuccess } = remoteData;

          if (dataSuccess) {
            switchControlAssist.close(this.getVisibleFlag());

            const {
              list: metaListData,
              data: metaData,
              extra: metaExtra,
            } = remoteData;

            that.afterSubmitSuccess({
              singleData: metaData || null,
              listData: metaListData || [],
              extraData: metaExtra || null,
              responseOriginalData: remoteData || null,
              submitData: submitData || null,
            });

            if (isFunction(successCallback)) {
              this.logCallTrace(
                {
                  parameter: { values },
                },
                primaryCallName,
                'execSubmitApi',
                'trigger',
                'successCallback',
              );

              successCallback(remoteData);
            } else {
              that.logCallTrace(
                {},
                primaryCallName,
                'execSubmitApi',
                'trigger',
                'successCallback',
                emptyLogic,
              );
            }
          }

          if (isFunction(completeCallback)) {
            this.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'execSubmitApi',
              'trigger',
              'completeCallback',
              emptyLogic,
            );
          }

          that.closePreventRender();

          return remoteData;
        })
        .catch((error) => {
          const { message } = error;

          if (!isUndefined(message)) {
            logException(message);
          }

          that.stopProcessing();

          if (isFunction(failCallback)) {
            this.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'trigger',
              'failCallback',
            );

            failCallback(error);
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'execSubmitApi',
              'trigger',
              'failCallback',
              emptyLogic,
            );
          }

          if (isFunction(completeCallback)) {
            this.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'trigger',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'execSubmitApi',
              'trigger',
              'completeCallback',
              emptyLogic,
            );
          }

          that.closePreventRender();

          return;
        });
    } else {
      that.logCallTrace(
        {},
        primaryCallName,
        'validate',
        'check submit data fail',
      );

      if (isFunction(completeCallback)) {
        that.logCallTrace(
          {},
          primaryCallName,
          'validate',
          'trigger',
          'completeCallback',
        );

        completeCallback();
      } else {
        that.logCallTrace(
          {},
          primaryCallName,
          'validate',
          'trigger',
          'completeCallback',
          emptyLogic,
        );
      }

      that.closePreventRender();
    }
  };

  handleOkWithForm = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'handleOkWithForm');

    const that = this;

    const form = that.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        that.execSubmitApi({
          values,
          successCallback,
          failCallback,
          completeCallback,
        });

        return values;
      })
      .catch((error) => {
        const { errorFields, message } = error;

        if (!isUndefined(message)) {
          logException(message);
        }

        that.stopProcessing();

        if (isUndefined(errorFields)) {
          showSimpleRuntimeError(error);
        } else {
          const m = [];

          for (const o of Object.values(errorFields)) {
            m.push(o.errors[0]);
          }

          const maxLength = 5;
          let beyondMax = false;

          if (m.length > maxLength) {
            m.length = maxLength;

            beyondMax = true;
          }

          let errorMessage = m.join(', ');

          if (beyondMax) {
            errorMessage += ' ...';
          }

          showSimpleWarningMessage(errorMessage);
        }

        if (isFunction(failCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'execSubmitApi',
            'trigger',
            'failCallback',
          );

          failCallback(error);
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'execSubmitApi',
            'trigger',
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'execSubmitApi',
            'trigger',
            'completeCallback',
          );

          completeCallback();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'execSubmitApi',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }
      });
  };

  handleOk = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'handleOk');

    if (this.submitWithForm) {
      this.handleOkWithForm({
        successCallback,
        failCallback,
        completeCallback,
      });
    } else {
      this.execSubmitApi({
        values: {},
        successCallback,
        failCallback,
        completeCallback,
      });
    }
  };

  afterSubmitSuccess = ({
    singleData = null,
    listData = [],
    extraData = null,
    responseOriginalData = null,
    submitData = null,
  }) => {
    this.logCallTrack(
      {
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      },
      primaryCallName,
      'afterSubmitSuccess',
    );

    this.doAfterSubmitSuccess({
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    });
  };

  handleCancel = () => {
    this.logCallTrack({}, primaryCallName, 'handleCancel');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterCancel } = this.props;

    if (isFunction(afterCancel)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'trigger',
        'afterCancel',
      );

      afterCancel();
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'trigger',
        'afterCancel',
        emptyLogic,
      );
    }
  };

  getFormClassName = () => {
    this.logCallTrack({}, primaryCallName, 'getFormClassName', emptyLogic);

    return null;
  };

  getVisibleFlag() {
    this.logCallTrack({}, primaryCallName, 'getVisibleFlag');

    const { flag } = this.props;

    return flag || this.visibleFlag;
  }

  getSaveButtonDisabled = () => {
    this.logCallTrack({}, primaryCallName, 'getSaveButtonDisabled');

    const { loadApiPath, dataLoading, processing, loadSuccess } = this.state;

    return (
      dataLoading ||
      processing ||
      (!checkStringIsNullOrWhiteSpace(loadApiPath || '') && !loadSuccess)
    );
  };
}

BaseWindow.defaultProps = {
  flag: '',
};

export { BaseWindow };
