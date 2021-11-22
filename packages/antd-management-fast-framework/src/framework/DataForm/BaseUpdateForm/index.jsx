import { message } from 'antd';

import {
  isFunction,
  isUndefined,
  showRuntimeError,
  recordObject,
} from '../../../utils/tools';
import { pretreatmentRequestParams } from '../../../utils/requestAssistor';
import DataSingleView from '../../DataSingleView/DataLoad';

class BaseUpdateForm extends DataSingleView {
  goToUpdateWhenProcessed = false;

  handleFormReset = () => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    form.resetFields();

    this.reloadData();
  };

  supplementSubmitRequestParams = (o) => o;

  afterCheckSubmitRequestParams = (o) => o;

  execSubmitApi = (values = {}, afterSubmitCallback) => {
    const { dispatch } = this.props;

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
      this.setState({ processing: true }, () => {
        this.setState(
          {
            dispatchComplete: false,
          },
          () => {
            dispatch({
              type: submitApiPath,
              payload: submitData,
            })
              .then(() => {
                if (this.mounted) {
                  const remoteData = this.getApiData(this.props);

                  const { dataSuccess } = remoteData;

                  if (dataSuccess) {
                    const {
                      list: metaListData,
                      data: metaData,
                      extra: metaExtra,
                    } = remoteData;

                    this.afterSubmitSuccess({
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

                  this.setState({
                    processing: false,
                    dispatchComplete: true,
                  });
                }
              })
              .catch((res) => {
                recordObject(res);

                this.setState({
                  processing: false,
                  dispatchComplete: true,
                });
              });
          },
        );
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate = (e) => {
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
}

export default BaseUpdateForm;
