import React from 'react';
import { Form, Avatar, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  defaultFormState,
  formatDatetime,
  isUndefined,
  showRuntimeError,
  recordObject,
} from '../../../utils/tools';
import { pretreatmentRequestParams } from '../../../utils/requestAssistor';
import { formNameCollection, datetimeFormat } from '../../../utils/constants';

import DataCore from '../../DataSingleView/DataCore';

class BaseAddForm extends DataCore {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  formRef = React.createRef();

  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        dataLoading: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterFillForm = (initialValues) => {};

  setFormFieldsValue = (v) => {
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetFieldsValue = (v) => {};

  handleFormReset = () => {
    const form = this.getTargetForm();

    if (form == null) {
      return;
    }

    form.resetFields();

    this.reloadData();
  };

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate = (e) => {
    const { dispatch } = this.props;

    const form = this.getTargetForm();

    const { validateFields } = form;

    const { submitApiPath } = this.state;

    validateFields()
      .then((values) => {
        let submitData = pretreatmentRequestParams(values);

        submitData = this.supplementSubmitRequestParams(submitData);

        const checkResult = this.checkSubmitData(submitData);

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
                    }

                    this.setState({
                      processing: false,
                      dispatchComplete: true,
                    });
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

  pageHeaderLogo = () => <Avatar shape="square" icon={<PlusOutlined />} />;

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

  renderModalInner = () => {
    const initialValues = this.buildInitialValues();

    const formLayout = this.buildFormLayout();
    const otherFormProps = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        layout={formLayout}
        initialValues={initialValues}
        className={this.getFormClassName()}
        {...otherFormProps}
      >
        {this.formContent()}
      </Form>
    );
  };

  buildNotificationDescription = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    return `数据已经保存成功，请进行下一步操作。`;
  };
}

export default BaseAddForm;
