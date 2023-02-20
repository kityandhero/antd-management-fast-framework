import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  logObject,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import { Base } from '../Base';

class BaseWindow extends Base {
  reloadWhenShow = false;

  loadDataAfterMount = false;

  formRef = React.createRef();

  submitWithForm = true;

  goToUpdateWhenProcessed = false;

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

  fillData = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
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

  execSubmitApi = (values = {}, afterSubmitCallback) => {
    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      const text = `缺少 submitApiPath 配置！`;

      showSimpleRuntimeError(text);

      return;
    }

    let submitData = pretreatmentRequestParameters(values || {});

    submitData = this.supplementSubmitRequestParams(submitData);

    const checkResult = this.checkSubmitData(submitData);

    submitData = this.afterCheckSubmitRequestParams(submitData);

    if (checkResult) {
      const that = this;

      that.setState({ processing: true }, () => {
        that.setState(
          {
            dispatchComplete: false,
          },
          () => {
            that
              .dispatchApi({
                type: submitApiPath,
                payload: submitData,
              })
              .then((remoteData) => {
                if (that.mounted) {
                  const { dataSuccess } = remoteData;

                  if (dataSuccess) {
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
                  }

                  if (isFunction(afterSubmitCallback)) {
                    afterSubmitCallback(remoteData);
                  }
                }

                that.setState({
                  processing: false,
                  dispatchComplete: true,
                });

                return remoteData;
              })
              .catch((error) => {
                logObject(error);

                that.setState({
                  processing: false,
                  dispatchComplete: true,
                });
              });
          },
        );
      });
    }
  };

  handleOkWithForm = (successCallback) => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        this.execSubmitApi(values, (remoteData) => {
          if (isFunction(successCallback)) {
            successCallback(remoteData);
          }

          if (this.goToUpdateWhenProcessed) {
            this.reloadByUrl();
          }
        });

        return values;
      })
      .catch((error) => {
        const { errorFields } = error;

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
      });
  };

  handleOk = (event, successCallback = null) => {
    if (this.submitWithForm) {
      this.handleOkWithForm(event, successCallback);
    } else {
      this.execSubmitApi({}, successCallback);
    }
  };

  afterSubmitSuccess = ({
    singleData = null,

    listData = [],

    extraData = null,

    responseOriginalData = null,

    submitData = null,
  }) => {
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

  getSaveButtonDisabled = () => {
    const { loadApiPath, dataLoading, processing, loadSuccess } = this.state;

    return (
      dataLoading ||
      processing ||
      (!checkStringIsNullOrWhiteSpace(loadApiPath || '') && !loadSuccess)
    );
  };
}

export { BaseWindow };
