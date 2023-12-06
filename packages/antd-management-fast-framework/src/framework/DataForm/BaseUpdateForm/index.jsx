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

  handleFormReset = () => {
    this.logCallTrack({}, primaryCallName, 'handleFormReset');

    this.resetTargetForm();

    this.reloadData({});
  };

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
