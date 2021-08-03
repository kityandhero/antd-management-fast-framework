import React from 'react';
import { message } from 'antd';

import {
  pretreatmentRequestParams,
  isFunction,
  showRuntimeErrorMessage,
  isUndefined,
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

    if (visible && !visiblePre) {
      const form = this.getTargetForm();

      if (form != null) {
        form.resetFields();
      }

      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.executeAfterDoOtherWhenChangeVisible();
  };

  executeAfterDoOtherWhenChangeVisible = () => {};

  getTargetForm = () => {
    return this.formRef.current;
  };

  supplementSubmitRequestParams = (o) => o;

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.fillForm(metaData);

    this.doOtherAfterLoadSuccess(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );
  };

  doOtherAfterLoadSuccess = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData,
  ) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fillForm = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

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
    const { dispatch } = this.props;

    const { submitApiPath } = this.state;

    if ((submitApiPath || '') === '') {
      showRuntimeErrorMessage(`缺少 submitApiPath 配置！`);
      return;
    }

    let submitData = pretreatmentRequestParams(values || {});

    submitData = this.supplementSubmitRequestParams(submitData);

    const checkResult = this.checkSubmitData(submitData);

    submitData = this.afterCheckSubmitRequestParams(submitData);

    if (checkResult) {
      this.setState({ processing: true });

      dispatch({
        type: submitApiPath,
        payload: submitData,
      }).then(() => {
        if (this.mounted) {
          const remoteData = this.getApiData(this.props);

          const { dataSuccess } = remoteData;

          if (dataSuccess) {
            const {
              list: metaListData,
              data: metaData,
              extra: metaExtra,
            } = remoteData;

            this.afterSubmitSuccess(
              metaData || null,
              metaListData || [],
              metaExtra || null,
              remoteData,
              submitData,
            );
          }

          // eslint-disable-next-line react/no-unused-state
          this.setState({ processing: false }, () => {
            if (isFunction(afterSubmitCallback)) {
              afterSubmitCallback();
            }
          });
        }
      });
    }
  };

  handleOkWithForm = (e) => {
    e.preventDefault();

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
          showRuntimeErrorMessage(error);
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

  afterSubmitSuccess = (
    singleData,
    listData,
    extraData,
    responseOriginalData,
    submitData,
  ) => {
    this.doAfterSubmitSuccess(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildInitialValues = (metaData, metaListData, metaExtra, metaOriginalData) =>
    null;

  handleCancel = () => {
    const { afterCancel } = this.props;

    if (isFunction(afterCancel)) {
      afterCancel();
    }
  };

  getFormClassName = () => {
    return null;
  };
}

export default BaseWindow;
