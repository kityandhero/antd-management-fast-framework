import { Avatar, Form } from 'antd';
import React from 'react';

import {
  datetimeFormat,
  formatDatetime,
  isFunction,
  isUndefined,
  logException,
  logObject,
  mergeArrowText,
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

/**
 * base add form
 * @namespace framework.DataForm
 * @class BaseAddForm
 * @extends DataCore
 */
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

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  adjustWhenDidMount = () => {
    this.logCallTrack({}, primaryCallName, 'adjustWhenDidMount');

    this.fillData();
  };

  fillData = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'fillData',
      this.useFormWrapper ? '' : 'current useFormWrapper set to false ignore',
    );

    if (!this.useFormWrapper) {
      return;
    }

    const initialValues = this.buildInitialValues();

    if (initialValues == null) {
      const form = this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(initialValues);

        this.afterSetFieldsValue(initialValues);
      }
    }
  };

  /**
   * 填充数据后触发逻辑。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   * @example
   * afterFillForm = () => {}
   */
  afterFillForm = (initialValues) => {
    this.logCallTrack(
      {
        parameter: initialValues,
      },
      primaryCallName,
      'afterFillForm',
      emptyLogic,
    );
  };

  /**
   * 设置表单项值。
   * @function
   * @param {*} v 值。
   */
  setFormFieldsValue = (v) => {
    this.logCallTrack(
      {
        parameter: v,
      },
      primaryCallName,
      'setFormFieldsValue',
      this.useFormWrapper ? '' : 'current useFormWrapper set to false ignore',
    );

    if (!this.useFormWrapper) {
      return;
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'setFormFieldsValue',
      'trigger',
      'getTargetForm',
    );

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.logCallTrace(
        {},
        primaryCallName,
        'setFormFieldsValue',
        'trigger',
        'afterSetFieldsValue',
      );

      this.afterSetFieldsValue(v);
    }
  };

  /**
   * 设置表单项值后的触发逻辑。
   * @function
   * @param {Object} values 值。
   * @example
   * afterSetFieldsValue = (values) => {}
   */
  afterSetFieldsValue = (values) => {
    this.logCallTrack(
      {
        parameter: values,
      },
      primaryCallName,
      'afterSetFieldsValue',
      emptyLogic,
    );
  };

  /**
   * 处理表单数据重置。
   * @function
   */
  handleFormReset = () => {
    this.logCallTrack({}, primaryCallName, 'handleFormReset');

    this.logCallTrace(
      {},
      primaryCallName,
      'handleFormReset',
      'trigger',
      'resetTargetForm',
    );

    this.resetTargetForm();

    this.logCallTrace(
      {},
      primaryCallName,
      'handleFormReset',
      'trigger',
      'reloadData',
    );

    this.reloadData({});
  };

  /**
   * 补全提交表单时的数据。
   * @function
   * @param {Object} o 将要提交的数据
   * @returns {Object} 补全后的将要提交的数据
   */
  supplementSubmitRequestParams = (o) => {
    this.logCallTrack(
      {
        parameter: o,
      },
      primaryCallName,
      'supplementSubmitRequestParams',
      emptyLogic,
    );

    return o;
  };

  /**
   * 检测表单提交数据之后的触发逻辑。
   * @function
   * @example
   * afterCheckSubmitRequestParams = (o) => o
   */
  afterCheckSubmitRequestParams = (o) => {
    this.logCallTrack(
      {
        parameter: o,
      },
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

    this.logCallTrace(
      {
        parameter: values || {},
      },
      primaryCallName,
      'execSubmitApi',
      'trigger',
      'pretreatmentRequestParameters',
    );

    let submitData = pretreatmentRequestParameters(values || {});

    this.logCallTrace(
      {
        parameter: submitData,
      },
      primaryCallName,
      'execSubmitApi',
      'trigger',
      'supplementSubmitRequestParams',
    );

    submitData = this.supplementSubmitRequestParams(submitData);

    this.logCallTrace(
      {
        parameter: submitData,
      },
      primaryCallName,
      'execSubmitApi',
      'trigger',
      'checkSubmitData',
    );

    const checkResult = this.checkSubmitData(submitData);

    this.logCallTrace(
      {
        parameter: submitData,
      },
      primaryCallName,
      'execSubmitApi',
      'trigger',
      'afterCheckSubmitRequestParams',
    );

    submitData = this.afterCheckSubmitRequestParams(submitData);

    if (checkResult) {
      this.logCallTrace(
        {
          parameter: submitData,
        },
        primaryCallName,
        'execSubmitApi',
        'checkSubmitData',
        'success',
        'trigger',
        'startProcessing',
      );

      that.startProcessing();

      this.logCallTrace(
        {
          parameter: submitData,
        },
        primaryCallName,
        'execSubmitApi',
        'checkSubmitData',
        'success',
        'trigger',
        'openPreventRender',
      );

      that.openPreventRender();

      that
        .dispatchApi({
          type: submitApiPath,
          payload: submitData,
        })
        .then((remoteData) => {
          this.logCallTrace(
            {
              parameter: submitData,
            },
            primaryCallName,
            'execSubmitApi',
            'checkSubmitData',
            'success',
            'dispatchApi',
            'then',
            'trigger',
            'stopProcessing',
          );

          that.stopProcessing('on dispatch api success');

          const { dataSuccess } = remoteData;

          if (dataSuccess) {
            const {
              list: metaListData,
              data: metaData,
              extra: metaExtra,
            } = remoteData;

            if (isFunction(successCallback)) {
              that.logCallTrace(
                {
                  parameter: { values },
                },
                primaryCallName,
                'execSubmitApi',
                'checkSubmitData',
                'success',
                'dispatchApi',
                'then',
                'trigger',
                'successCallback',
              );

              successCallback(remoteData);
            }

            if (isFunction(completeCallback)) {
              that.logCallTrace(
                {
                  parameter: { values },
                },
                primaryCallName,
                'execSubmitApi',
                'checkSubmitData',
                'success',
                'dispatchApi',
                'then',
                'trigger',
                'completeCallback',
              );

              completeCallback();
            }

            that.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'checkSubmitData',
              'success',
              'dispatchApi',
              'then',
              'trigger',
              'closePreventRender',
            );

            that.closePreventRender();

            that.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'checkSubmitData',
              'success',
              'dispatchApi',
              'then',
              'trigger',
              'afterSubmitSuccess',
            );

            that.afterSubmitSuccess({
              singleData: metaData || null,
              listData: metaListData || [],
              extraData: metaExtra || null,
              responseOriginalData: remoteData || null,
              submitData: submitData || null,
            });
          } else {
            if (isFunction(failCallback)) {
              that.logCallTrace(
                {
                  parameter: { values },
                },
                primaryCallName,
                'execSubmitApi',
                'checkSubmitData',
                'success',
                'dispatchApi',
                'then',
                'trigger',
                'failCallback',
              );

              failCallback(remoteData);
            }

            if (isFunction(completeCallback)) {
              that.logCallTrace(
                {
                  parameter: { values },
                },
                primaryCallName,
                'execSubmitApi',
                'checkSubmitData',
                'success',
                'dispatchApi',
                'then',
                'trigger',
                'completeCallback',
              );

              completeCallback();
            }

            that.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'checkSubmitData',
              'success',
              'dispatchApi',
              'then',
              'trigger',
              'closePreventRender',
            );

            that.closePreventRender();
          }

          return remoteData;
        })
        .catch((error) => {
          const { message } = error;

          if (!isUndefined(message)) {
            logException(message);
          }

          that.logCallTrace(
            {
              parameter: { values },
            },
            primaryCallName,
            'execSubmitApi',
            'checkSubmitData',
            'success',
            'dispatchApi',
            'catch',
            'trigger',
            'stopProcessing',
          );

          that.stopProcessing('on dispatch api fail');

          logObject(error);

          if (isFunction(failCallback)) {
            that.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'checkSubmitData',
              'success',
              'dispatchApi',
              'catch',
              'trigger',
              'failCallback',
            );

            failCallback(error);
          }

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'checkSubmitData',
              'success',
              'dispatchApi',
              'catch',
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
        'execSubmitApi',
        'check submit data fail',
      );

      if (isFunction(completeCallback)) {
        that.logCallTrace(
          {},
          primaryCallName,
          'execSubmitApi',
          'checkSubmitData',
          'fail',
          'trigger',
          'completeCallback',
        );

        completeCallback();
      } else {
        that.logCallTrace(
          {},
          primaryCallName,
          'execSubmitApi',
          'checkSubmitData',
          'fail',
          'trigger',
          'completeCallback',
          emptyLogic,
        );
      }

      that.logCallTrace(
        {},
        primaryCallName,
        'execSubmitApi',
        'checkSubmitData',
        'fail',
        'trigger',
        'closePreventRender',
        emptyLogic,
      );

      that.closePreventRender();
    }
  };

  /**
   * 校验数据。
   * @function
   * @param {*} option 配置项。
   * @param {Function} option.successCallback 成功后的回调。
   * @param {Function} option.failCallback 失败后的回调。
   * @param {Function} option.completeCallback 完成后的回调，成功或失败后都将触发。
   */
  validate = ({
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'validate');

    if (!this.useFormWrapper) {
      throw new Error(
        mergeArrowText(
          primaryCallName,
          'validate',
          'current useFormWrapper set to false, please change it to true',
        ),
      );
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'validate',
      'trigger',
      'getTargetForm',
    );

    const form = this.getTargetForm();

    const { validateFields } = form;

    const that = this;

    validateFields()
      .then((values) => {
        that.logCallTrace(
          {},
          primaryCallName,
          'validate',
          'success',
          'then',
          'trigger',
          'execSubmitApi',
        );

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

        if (!isUndefined(message)) {
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
          that.logCallTrace(
            {},
            primaryCallName,
            'validate',
            'fail',
            'catch',
            'trigger',
            'failCallback',
          );

          failCallback(error);
        }

        if (isFunction(completeCallback)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'validate',
            'fail',
            'catch',
            'trigger',
            'completeCallback',
          );

          completeCallback();
        }

        that.logCallTrace(
          {},
          primaryCallName,
          'validate',
          'fail',
          'catch',
          'trigger',
          'closePreventRender',
        );

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

  /**
   * 渲染 Modal 内部区域。
   * @function
   * @return {Object} 渲染结果。
   */
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
