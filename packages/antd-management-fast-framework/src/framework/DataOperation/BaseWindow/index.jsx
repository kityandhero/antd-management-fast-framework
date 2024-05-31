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

/**
 * 弹窗类操作基类
 * @namespace DataOperation
 * @class BaseWindow
 * @extends Base
 */
class BaseWindow extends Base {
  /**
   * 可见性标记，通过构造函数赋值，请务必不要使用其他渠道赋值。
   * @member {string}
   */
  visibleFlag = '';

  /**
   * 当切换为显示的时候，是否重载数据, 默认 false。
   * @member {boolean}
   */
  reloadWhenShow = false;

  /**
   * 渲染后是否立即载入数据, 默认 false。
   * @member {boolean}
   */
  loadRemoteRequestAfterMount = false;

  /**
   * 表单应用，请务必不要更改赋值。
   * @member {Object}
   */
  formRef = React.createRef();

  /**
   * 是否通过表单提交数据, 默认 true
   * @member {boolean}
   */
  submitWithForm = true;

  /**
   * 提交成功后是否重新载入Header部分数据, 默认 false
   * @member {boolean}
   */
  reloadHeaderOnSubmitSuccess = false;

  /**
   * 关闭后是否立即销毁, 默认 false
   * @member {boolean}
   */
  destroyOnClose = false;

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
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

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData };
  }

  /**
   * 调整关闭时传递的参数。
   * @function
   * @returns {Object} 调整后的参数
   * @example
   * adjustAfterCloseParameter = () => null
   */
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
   * 切换为显示状态后的额外执行逻辑
   * @function
   * @example
   * doOtherWhenChangeVisibleToShow = () => {}
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
   * 切换为显示状态后，doOtherWhenChangeVisibleToShow 执行后的附加逻辑, 默认为空逻辑，可根据需要重载。
   * @function
   * @example
   * executeAfterDoOtherWhenChangeVisibleToShow = () => {}
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
   * 切换为隐藏状态后的额外执行逻辑, 在 doOtherWhenChangeVisible 中根据可见状态自动触发，当前为空逻辑，可根据需要重载。
   * @function
   * @example
   * doOtherWhenChangeVisibleToHide = () => {}
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
   * 切换为隐藏状态后的额外附加执行逻辑, 在 doOtherWhenChangeVisible 中根据可见状态自动触发，排在 doOtherWhenChangeVisibleToHide 之后触发，当前为空逻辑，可根据需要重载。
   * @function
   * @example
   * executeAfterDoOtherWhenChangeVisibleToHide = () => {}
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
   * 可见性变更后，doOtherWhenChangeVisible 执行后的附加逻辑
   * @function
   * @param {boolean} currentVisible 当前显示状态
   * @example
   * executeOtherAfterDoOtherWhenChangeVisible = (currentVisible) => {}
   */
  executeOtherAfterDoOtherWhenChangeVisible = (currentVisible) => {
    this.logCallTrack(
      {
        parameters: {
          currentVisible,
        },
      },
      primaryCallName,
      'executeOtherAfterDoOtherWhenChangeVisible',
      emptyLogic,
    );
  };

  /**
   * 可见性变更后执行的逻辑。
   * @function
   * @param {boolean} currentVisible 当前显示状态。
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
      const { afterOK, afterClose } = this.props;

      const data = {
        ...this.adjustAfterCloseParameter(),
        ...this.submitSuccessTransferData,
      };

      const { flag } = data;

      if (flag) {
        if (isFunction(afterOK)) {
          this.logCallTrace(
            {
              parameter: data,
            },
            primaryCallName,
            'doOtherWhenChangeVisible',
            'trigger',
            'afterOK',
          );

          afterOK(data);
        } else {
          this.logCallTrace(
            {},
            primaryCallName,
            'doOtherWhenChangeVisible',
            'trigger',
            'afterOK',
            emptyLogic,
          );
        }
      }

      if (isFunction(afterClose)) {
        this.logCallTrace(
          {
            parameter: data,
          },
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
        );

        afterClose(data);
      } else {
        this.logCallTrace(
          {
            parameter: data,
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

  /**
   * 获取表单。
   * @function
   * @returns {Object} 表单。
   */
  getTargetForm = () => {
    this.logCallTrack({}, primaryCallName, 'getTargetForm');

    return this.formRef.current;
  };

  /**
   * 当重置表单时的额外逻辑。
   * @function
   * @example
   * handleOtherOnResetTargetForm = () => {}
   */
  handleOtherOnResetTargetForm = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'handleOtherOnResetTargetForm',
      emptyLogic,
    );
  };

  /**
   * 重置表单。
   * @function
   */
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

  /**
   * 补全提交表单时的数据。
   * @function
   * @param {Object} o 将要提交的数据
   * @returns {Object} 补全后的将要提交的数据
   */
  supplementSubmitRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'supplementSubmitRequestParams',
      emptyLogic,
    );

    return o;
  };

  /**
   * 加载数据成功后执行。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   */
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

  /**
   * 加载数据成功后的额外执行逻辑，在 afterLoadSuccess 调用后触发。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   * @example
   * doOtherAfterLoadSuccess = () => {}
   */
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

  /**
   * 填充数据。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   */
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

  /**
   * 设置表单项值。
   * @function
   * @param {*} v 值。
   */
  setFormFieldsValue = (v) => {
    this.logCallTrack({}, primaryCallName, 'setFormFieldsValue');

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

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
        parameters: { values },
      },
      primaryCallName,
      'afterSetFieldsValue',
      emptyLogic,
    );
  };

  /**
   * 检测表单提交数据之后的触发逻辑。
   * @function
   * @example
   * afterCheckSubmitRequestParams = (o) => o
   */
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

    this.logCallTrace(
      {},
      primaryCallName,
      'afterSubmitSuccess',
      'trigger',
      'doAfterSubmitSuccess',
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
