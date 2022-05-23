import { message } from 'antd';
import React from 'react';
import { pretreatmentRequestParams } from '../../../utils/requestAssistor';
import {
  isFunction,
  isUndefined,
  recordObject,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from '../../../utils/tools';
import Base from '../Base';

class BaseWindow extends Base {
  reloadWhenShow = false;

  loadDataAfterMount = false;

  formRef = React.createRef();

  submitWithForm = true;

  goToUpdateWhenProcessed = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible, externalData };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre !== visible) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot, visible);
    }
  };

  /**
   * 当可见性发生变化时执行
   */
  doOtherWhenChangeVisible = (preProps, preState, snapshot, currentVisible) => {
    if (currentVisible) {
      this.doOtherWhenChangeVisibleToShow(preProps, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToShow(
        preProps,
        preState,
        snapshot,
      );
    } else {
      this.doOtherWhenChangeVisibleToHide(preProps, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToHide(
        preProps,
        preState,
        snapshot,
      );
    }

    this.executeOtherAfterDoOtherWhenChangeVisible(
      preProps,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProps, preState, snapshot) => {};

  /**
   * 当可见性变为显示时附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToShow = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变为隐藏时执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToHide = (preProps, preState, snapshot) => {};

  /**
   * 当可见性变为显示后附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToHide = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变更后的附加执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeOtherAfterDoOtherWhenChangeVisible = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetFieldsValue = (v) => {};

  afterCheckSubmitRequestParams = (o) => o;

  execSubmitApi = (values = {}, afterSubmitCallback) => {
    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      const text = `缺少 submitApiPath 配置！`;

      showRuntimeError({
        message: text,
      });

      return;
    }

    let submitData = pretreatmentRequestParams(values || {});

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
              .then(() => {
                if (that.mounted) {
                  const remoteData = that.apiDataConvert(that.props);

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
                    afterSubmitCallback();
                  }
                }

                that.setState({
                  processing: false,
                  dispatchComplete: true,
                });
              })
              .catch((res) => {
                recordObject(res);

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

  handleOkWithForm = () => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        this.execSubmitApi(values, () => {
          if (this.goToUpdateWhenProcessed) {
            this.reloadByUrl();
          }
        });
      })
      .catch((error) => {
        const { errorFields } = error;

        if (!isUndefined(errorFields)) {
          const m = [];

          Object.values(errorFields).forEach((o) => {
            m.push(o.errors[0]);
          });

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

          message.warn(errorMessage);
        } else {
          showRuntimeError({
            message: error,
          });
        }
      });
  };

  handleOk = (e) => {
    if (this.submitWithForm) {
      this.handleOkWithForm(e);
    } else {
      this.execSubmitApi();
    }
  };

  afterSubmitSuccess = ({
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
      (!stringIsNullOrWhiteSpace(loadApiPath || '') && !loadSuccess)
    );
  };
}

export default BaseWindow;
