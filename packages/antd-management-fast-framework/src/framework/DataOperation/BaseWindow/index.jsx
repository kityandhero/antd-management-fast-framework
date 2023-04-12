import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  logException,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import { switchControlAssist } from '../../../utils/switchControlAssist';
import { Base } from '../Base';

class BaseWindow extends Base {
  visibleFlag = '';

  reloadWhenShow = false;

  loadRemoteRequestAfterMount = false;

  formRef = React.createRef();

  submitWithForm = true;

  goToUpdateWhenProcessed = false;

  constructor(properties, visibleFlag) {
    super(properties);

    this.visibleFlag = visibleFlag;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { visible, externalData } = nextProperties;

    return { visible, externalData };
  }

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre !== visible) {
      this.doOtherWhenChangeVisible(preProperties, preState, snapshot, visible);
    }
  };

  /**
   * 当可见性发生变化时执行
   */
  doOtherWhenChangeVisible = (
    preProperties,
    preState,
    snapshot,
    currentVisible,
  ) => {
    if (currentVisible) {
      this.doOtherWhenChangeVisibleToShow(preProperties, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToShow(
        preProperties,
        preState,
        snapshot,
      );
    } else {
      this.doOtherWhenChangeVisibleToHide(preProperties, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToHide(
        preProperties,
        preState,
        snapshot,
      );
    }

    this.executeOtherAfterDoOtherWhenChangeVisible(
      preProperties,
      preState,
      snapshot,
    );
  };

  /**
   * 当可见性变为显示时执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {};

  /**
   * 当可见性变为显示时附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToShow = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变为隐藏时执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToHide = (preProperties, preState, snapshot) => {};

  /**
   * 当可见性变为显示后附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToHide = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变更后的附加执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeOtherAfterDoOtherWhenChangeVisible = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
    snapshot,
  ) => {};

  getTargetForm = () => {
    return this.formRef.current;
  };

  supplementSubmitRequestParams = (o) => o;

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
      'DataOperation::BaseWindow',
      'afterLoadSuccess',
    );

    this.fillData({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

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
  }) => {};

  onClose = () => {
    this.logCallTrack({}, 'DataOperation::BaseWindow', 'onClose');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      this.logCallTrace({}, 'DataOperation::BaseWindow', 'afterClose');

      afterClose();
    }
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
      'DataOperation::BaseWindow',
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
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = (value) => {};

  afterCheckSubmitRequestParams = (o) => o;

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
      'DataOperation::BaseWindow',
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
                'DataOperation::BaseWindow',
                'execSubmitApi',
                'successCallback',
              );

              successCallback(remoteData);
            }
          }

          if (isFunction(completeCallback)) {
            this.logCallTrace(
              {
                parameter: { values },
              },
              'DataOperation::BaseWindow',
              'execSubmitApi',
              'completeCallback',
            );

            completeCallback();
          }

          that.closePreventRender();

          return remoteData;
        })
        .catch((error) => {
          const { message } = error;

          if (!isUndefined()) {
            logException(message);
          }

          that.stopProcessing();

          if (isFunction(failCallback)) {
            this.logCallTrace(
              {
                parameter: { values },
              },
              'DataOperation::BaseWindow',
              'execSubmitApi',
              'failCallback',
            );

            failCallback(error);
          }

          if (isFunction(completeCallback)) {
            this.logCallTrace(
              {
                parameter: { values },
              },
              'DataOperation::BaseWindow',
              'execSubmitApi',
              'completeCallback',
            );

            completeCallback();
          }

          that.closePreventRender();

          return;
        });
    } else {
      that.logCallTrace(
        {},
        'DataOperation::BaseWindow',
        'validate',
        'check submit data fail',
      );

      if (isFunction(completeCallback)) {
        that.logCallTrace(
          {},
          'DataOperation::BaseWindow',
          'validate',
          'completeCallback',
        );

        completeCallback();
      }

      that.closePreventRender();
    }
  };

  handleOkWithForm = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, 'DataOperation::BaseWindow', 'handleOkWithForm');

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

        if (!isUndefined()) {
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
            'DataOperation::BaseWindow',
            'execSubmitApi',
            'failCallback',
          );

          failCallback(error);
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            'DataOperation::BaseWindow',
            'execSubmitApi',
            'completeCallback',
          );

          completeCallback();
        }
      });
  };

  handleOk = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, 'DataOperation::BaseWindow', 'handleOk');

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
      'DataOperation::BaseWindow',
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
    const { afterCancel } = this.props;

    if (isFunction(afterCancel)) {
      afterCancel();
    }
  };

  getFormClassName = () => {
    return null;
  };

  getVisibleFlag() {
    const { flag } = this.props;

    return flag || this.visibleFlag;
  }

  getSaveButtonDisabled = () => {
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
