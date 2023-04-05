import { Avatar, Form } from 'antd';
import React from 'react';

import {
  datetimeFormat,
  formatDatetime,
  isFunction,
  isUndefined,
  logObject,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import {
  defaultFormState,
  formNameCollection,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { DataCore } from '../../DataSingleView/DataCore';

class BaseAddForm extends DataCore {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  formRef = React.createRef();

  constructor(properties) {
    super(properties);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,

      dataLoading: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  adjustWhenDidMount = () => {
    this.fillData();
  };

  getTargetForm = () => {
    return this.formRef.current;
  };

  fillData = () => {
    const initialValues = this.buildInitialValues();

    if (initialValues == null) {
      const form = this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(initialValues);

        this.afterSetFieldsValue(initialValues);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterFillForm = (initialValues) => {};

  setFormFieldsValue = (v) => {
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = (values) => {};

  handleFormReset = () => {
    this.logCallTrack({}, 'DataForm::BaseAddForm', 'handleFormReset');

    const form = this.getTargetForm();

    if (!form) {
      return;
    }

    form.resetFields();

    this.reloadData({});
  };

  supplementSubmitRequestParams = (o) => o;

  validate = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, 'DataForm::BaseAddForm', 'validate');

    const form = this.getTargetForm();

    const { validateFields } = form;

    const that = this;

    const { submitApiPath } = that.state;

    validateFields()
      .then((values) => {
        let submitData = pretreatmentRequestParameters(values);

        submitData = that.supplementSubmitRequestParams(submitData);

        const checkResult = that.checkSubmitData(submitData);

        if (checkResult) {
          that
            .dispatchApi({
              type: submitApiPath,
              payload: submitData,
            })
            .then((remoteData) => {
              that.stopProcessing();

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

                if (isFunction(successCallback)) {
                  this.logCallTrace(
                    {},
                    'DataForm::BaseAddForm',
                    'validate',
                    'successCallback',
                  );

                  successCallback(remoteData);
                }
              }

              if (isFunction(completeCallback)) {
                this.logCallTrace(
                  {},
                  'DataForm::BaseAddForm',
                  'validate',
                  'completeCallback',
                );

                completeCallback();
              }

              that.closePreventRender();

              return remoteData;
            })
            // eslint-disable-next-line promise/no-nesting
            .catch((error) => {
              that.stopProcessing();

              logObject(error);

              if (isFunction(failCallback)) {
                this.logCallTrace(
                  {},
                  'DataForm::BaseAddForm',
                  'validate',
                  'failCallback',
                );

                failCallback(error);
              }

              if (isFunction(completeCallback)) {
                this.logCallTrace(
                  {},
                  'DataForm::BaseAddForm',
                  'validate',
                  'completeCallback',
                );

                completeCallback();
              }

              that.closePreventRender();

              return;
            });
        } else {
          this.logCallTrace(
            {},
            'DataForm::BaseAddForm',
            'validate',
            'check submit data fail',
          );

          if (isFunction(completeCallback)) {
            this.logCallTrace(
              {},
              'DataForm::BaseAddForm',
              'validate',
              'completeCallback',
            );

            completeCallback();
          }

          that.closePreventRender();
        }

        return values;
      })
      .catch((error) => {
        that.logCallTrace(
          {},
          'DataForm::BaseAddForm',
          'validate',
          'validate fail',
        );

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

        if (isFunction(failCallback)) {
          this.logCallTrace(
            {},
            'DataForm::BaseAddForm',
            'validate',
            'failCallback',
          );

          failCallback(error);
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            'DataForm::BaseAddForm',
            'validate',
            'completeCallback',
          );

          completeCallback();
        }

        that.closePreventRender();

        return;
      });
  };

  pageHeaderLogo = () => <Avatar shape="square" icon={iconBuilder.plus()} />;

  buildInitialValues = () => {
    return this.fillDefaultInitialValues();
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[formNameCollection.createTime.name] = formatDatetime({
      data: new Date(),
      format: datetimeFormat.yearMonthDayHourMinute,
    });

    return initialValues;
  };

  renderPresetModalInner = () => {
    this.logCallTrack({}, 'DataForm::BaseAddForm', 'renderPresetModalInner');

    const initialValues = this.buildInitialValues();

    const formLayout = this.buildFormLayout();
    const otherFormProperties = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        layout={formLayout}
        initialValues={initialValues}
        className={this.getFormClassName()}
        {...otherFormProperties}
      >
        {this.renderPresetFormContent()}
      </Form>
    );
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
    return `数据已经保存成功，请进行下一步操作。`;
  };
}

export { BaseAddForm };
