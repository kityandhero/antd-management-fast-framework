import { Avatar, BackTop, Form, message } from 'antd';
import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  datetimeFormat,
  formNameCollection,
} from 'antd-management-fast-common/es/utils/constants';
import { pretreatmentRequestParams } from 'antd-management-fast-common/es/utils/requestAssistor';
import {
  defaultFormState,
  formatDatetime,
  getDerivedStateFromPropsForUrlParams,
  isUndefined,
  recordObject,
  showRuntimeError,
} from 'antd-management-fast-common/es/utils/tools';
import { decorateAvatar } from 'antd-management-fast-component/es/customComponents/DecorateAvatar';
import {
  buildPageHeaderTagWrapper,
  buildPageHeaderTitle,
  pageHeaderExtraContent,
} from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import DataCore from '../../DataSingleView/DataCore';

import styles from './index.less';

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

    if (!form) {
      return;
    }

    form.resetFields();

    this.reloadData();
  };

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate = (e) => {
    const form = this.getTargetForm();

    const { validateFields } = form;

    const that = this;

    const { submitApiPath } = that.state;

    validateFields()
      .then((values) => {
        let submitData = pretreatmentRequestParams(values);

        submitData = that.supplementSubmitRequestParams(submitData);

        const checkResult = that.checkSubmitData(submitData);

        if (checkResult) {
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
                  .then(() => {
                    if (that.mounted) {
                      const remoteData = that.apiDataConvert(that.props);

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
                    }

                    that.setState({
                      processing: false,
                      dispatchComplete: true,
                    });
                  })
                  .catch((res) => {
                    recordObject(res);

                    that.setState({
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

  renderFurther() {
    const {
      defaultAvatarIcon,
      showPageHeaderAvatar,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    const avatarProps = showPageHeaderAvatar
      ? decorateAvatar(
          this.establishPageHeaderAvatarConfig(),
          defaultAvatarIcon,
          showPageHeaderAvatar,
          dataLoading,
          reloading,
          avatarImageLoadResult,
          () => {
            this.onPageHeaderAvatarLoadErrorCallback();
          },
        )
      : null;

    return (
      <PageHeaderWrapper
        className={styles.customContainor}
        avatar={avatarProps}
        title={buildPageHeaderTitle(
          this.getPageName(),
          this.establishPageHeaderTitlePrefix(),
        )}
        subTitle={this.buildPageHeaderSubTitle()}
        tags={buildPageHeaderTagWrapper(this.establishPageHeaderTagConfig())}
        extra={this.buildExtraAction()}
        content={this.renderPageHeaderContent()}
        extraContent={pageHeaderExtraContent(
          this.establishPageHeaderExtraContentConfig(),
        )}
        // onBack={() => {
        //   this.backToList();
        // }}
      >
        <div className={styles.containorBox} style={{ overflowX: 'hidden' }}>
          {this.renderFormWrapper()}
          {this.renderOther()}
        </div>
        <BackTop />
      </PageHeaderWrapper>
    );
  }
}

export default BaseAddForm;
