import {
  isFunction,
  isUndefined,
  logObject,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import { DataLoad } from '../../DataSingleView/DataLoad';

class BaseUpdateForm extends DataLoad {
  goToUpdateWhenProcessed = false;

  handleFormReset = () => {
    const form = this.getTargetForm();

    if (!form) {
      return;
    }

    form.resetFields();

    this.reloadData({});
  };

  supplementSubmitRequestParams = (o) => o;

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
                    afterSubmitCallback();
                  }

                  that.setState({
                    processing: false,
                    dispatchComplete: true,
                  });
                }

                return remoteData;
              })
              .catch((error_) => {
                logObject(error_);

                that.setState({
                  processing: false,
                  dispatchComplete: true,
                });

                return;
              });
          },
        );
      });
    }
  };

  // eslint-disable-next-line no-unused-vars
  validate = (event) => {
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
}

export { BaseUpdateForm };
