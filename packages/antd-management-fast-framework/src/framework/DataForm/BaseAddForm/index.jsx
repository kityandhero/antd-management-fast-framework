import { Avatar, Form } from 'antd';
import React from 'react';

import {
  datetimeFormat,
  formatDatetime,
  isFunction,
  isUndefined,
  logException,
  logObject,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import {
  defaultFormState,
  emptyLogic,
  formNameCollection,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { DataCore } from '../../DataSingleView/DataCore';

const primaryCallName = 'DataForm::BaseAddForm';

class BaseAddForm extends DataCore {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  showReloadButton = false;

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
    this.logCallTrack({}, primaryCallName, 'fillData');

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
    this.logCallTrack({}, primaryCallName, 'setFormFieldsValue');

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = (values) => {};

  handleFormReset = () => {
    this.logCallTrack({}, primaryCallName, 'handleFormReset');

    const form = this.getTargetForm();

    if (!form) {
      return;
    }

    form.resetFields();

    this.reloadData({});
  };

  supplementSubmitRequestParams = (o) => o;

  afterCheckSubmitRequestParams = (o) => o;

  execSubmitApi = ({
    values = {},
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack(
      {
        parameter: { values },
      },
      primaryCallName,
      'execSubmitApi',
    );

    const that = this;

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
      that.startProcessing();
      that.openPreventRender();

      that
        .dispatchApi({
          type: submitApiPath,
          payload: submitData,
        })
        .then((remoteData) => {
          that.stopProcessing('on dispatch api success');

          const { dataSuccess } = remoteData;

          if (dataSuccess) {
            const {
              list: metaListData,
              data: metaData,
              extra: metaExtra,
            } = remoteData;

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
            }

            that.closePreventRender();

            that.afterSubmitSuccess({
              singleData: metaData || null,
              listData: metaListData || [],
              extraData: metaExtra || null,
              responseOriginalData: remoteData || null,
              submitData: submitData || null,
            });
          } else {
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

              failCallback(remoteData);
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
            }

            that.closePreventRender();
          }

          return remoteData;
        })
        .catch((error) => {
          const { message } = error;

          if (!isUndefined()) {
            logException(message);
          }

          that.stopProcessing('on dispatch api fail');

          logObject(error);

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

  validate = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'validate');

    const form = this.getTargetForm();

    const { validateFields } = form;

    const that = this;

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
        const { message } = error;

        if (!isUndefined()) {
          logException(message);
        }

        that.logCallTrace({}, primaryCallName, 'validate', 'validate fail');

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
            primaryCallName,
            'validate',
            'trigger',
            'failCallback',
          );

          failCallback(error);
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'validate',
            'trigger',
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
    this.logCallTrack({}, primaryCallName, 'renderPresetModalInner');

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
