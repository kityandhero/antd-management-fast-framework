import {
  isFunction,
  isUndefined,
  logException,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';

import { DataLoad } from '../../DataSingleView/DataLoad';

const primaryCallName = 'DataForm::BaseUpdateForm';

class BaseUpdateForm extends DataLoad {
  resetDataAfterLoad = true;

  reloadHeaderOnSubmitSuccess = false;

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
      that.startProcessing();
      that.openPreventRender();

      that.logCallTrace(
        {},
        primaryCallName,
        'execSubmitApi',
        'trigger',
        'dispatchApi',
      );

      that
        .dispatchApi({
          type: submitApiPath,
          payload: submitData,
          pretreatmentSuccessCallback: () => {
            if (that.reloadHeaderOnSubmitSuccess) {
              that.logCallTrace(
                {},
                primaryCallName,
                'execSubmitApi',
                'trigger',
                'reloadByUrl',
              );

              that.reloadByUrl();
            }
          },
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
              this.logCallTrack(
                {
                  parameter: { values },
                },
                primaryCallName,
                'execSubmitApi',
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
          } else {
            that.logCallTrace(
              {},
              primaryCallName,
              'execSubmitApi',
              'dataSuccess',
              false,
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

          return remoteData;
        })
        .catch((error) => {
          const { message } = error;

          if (!isUndefined(message)) {
            logException(message);
          }

          that.stopProcessing();

          if (isFunction(failCallback)) {
            this.logCallTrack(
              {
                parameter: { values },
              },
              primaryCallName,
              'execSubmitApi',
              'failCallback',
            );

            failCallback(error);
          }

          if (isFunction(completeCallback)) {
            this.logCallTrack(
              {
                parameter: { values },
              },
              primaryCallName,
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
        primaryCallName,
        'validate',
        'check submit data fail',
      );

      if (isFunction(completeCallback)) {
        that.logCallTrace({}, primaryCallName, 'validate', 'completeCallback');

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

    const that = this;

    const form = that.getTargetForm();

    if (form == null) {
      return;
    }

    const { validateFields } = form;

    validateFields()
      .then((values) => {
        that.logCallTrace(
          {},
          primaryCallName,
          'validate',
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
          this.logCallTrace({}, primaryCallName, 'validate', 'failCallback');

          failCallback(error);
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'validate',
            'trigger',
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            primaryCallName,
            'validate',
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

        return;
      });
  };
}

export { BaseUpdateForm };
