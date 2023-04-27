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

class BaseUpdateForm extends DataLoad {
  goToUpdateWhenProcessed = false;

  handleFormReset = () => {
    this.logCallTrack({}, 'DataForm::BaseUpdateForm', 'handleFormReset');

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
      'DataForm::BaseUpdateForm',
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
                'DataForm::BaseUpdateForm',
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
              'DataForm::BaseUpdateForm',
              'execSubmitApi',
              'trigger',
              'completeCallback',
            );

            completeCallback();
          } else {
            that.logCallTrace(
              {},
              'DataForm::BaseUpdateForm',
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

          if (!isUndefined()) {
            logException(message);
          }

          that.stopProcessing();

          if (isFunction(failCallback)) {
            this.logCallTrack(
              {
                parameter: { values },
              },
              'DataForm::BaseUpdateForm',
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
              'DataForm::BaseUpdateForm',
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
        'DataForm::BaseUpdateForm',
        'validate',
        'check submit data fail',
      );

      if (isFunction(completeCallback)) {
        that.logCallTrace(
          {},
          'DataForm::BaseUpdateForm',
          'validate',
          'completeCallback',
        );

        completeCallback();
      } else {
        that.logCallTrace(
          {},
          'DataForm::BaseUpdateForm',
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
    this.logCallTrack({}, 'DataForm::BaseUpdateForm', 'validate');

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
        const { message } = error;

        if (!isUndefined()) {
          logException(message);
        }

        that.logCallTrace(
          {},
          'DataForm::BaseUpdateForm',
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
            'DataForm::BaseUpdateForm',
            'validate',
            'failCallback',
          );

          failCallback(error);
        } else {
          that.logCallTrace(
            {},
            'DataForm::BaseUpdateForm',
            'validate',
            'trigger',
            'failCallback',
            emptyLogic,
          );
        }

        if (isFunction(completeCallback)) {
          this.logCallTrace(
            {},
            'DataForm::BaseUpdateForm',
            'validate',
            'completeCallback',
          );

          completeCallback();
        } else {
          that.logCallTrace(
            {},
            'DataForm::BaseUpdateForm',
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
