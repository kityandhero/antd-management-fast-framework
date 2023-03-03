import { Avatar, FloatButton, Form } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import {
  datetimeFormat,
  formatDatetime,
  isUndefined,
  logObject,
  pretreatmentRequestParameters,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
} from 'easy-soft-utility';

import {
  defaultFormState,
  formNameCollection,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  decorateAvatar,
  iconBuilder,
  PageExtra,
} from 'antd-management-fast-component';

import { DataCore } from '../../DataSingleView/DataCore';

const { BackTop } = FloatButton;
const { HeaderTitle, HeaderTagWrapper, HeaderExtraContent } = PageExtra;

class BaseAddForm extends DataCore {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

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
    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetFieldsValue(v);
    }
  };

  // eslint-disable-next-line no-unused-vars
  afterSetFieldsValue = (values) => {};

  handleFormReset = () => {
    const form = this.getTargetForm();

    if (!form) {
      return;
    }

    form.resetFields();

    this.reloadData();
  };

  supplementSubmitRequestParams = (o) => o;

  // eslint-disable-next-line no-unused-vars
  validate = (event) => {
    const form = this.getTargetForm();

    const { validateFields } = form;

    const that = this;

    const { submitApiPath } = that.state;

    validateFields()
      .then((values) => {
        let submitData = pretreatmentRequestParameters(values);

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
                    }

                    that.setState({
                      processing: false,
                      dispatchComplete: true,
                    });

                    return remoteData;
                  })
                  // eslint-disable-next-line promise/no-nesting
                  .catch((error) => {
                    logObject(error);

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

  renderFurther() {
    const {
      defaultAvatarIcon,
      showPageHeaderAvatar,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    const avatarProperties = showPageHeaderAvatar
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
      <div
        style={{
          background: '#f0f2f5',
        }}
      >
        <PageContainer
          header={{
            ghost: false,
            style: {
              backgroundColor: '#fff',
              paddingBottom: '24px',
              paddingLeft: '24px',
              paddingRight: '24px',
            },
          }}
          childrenContentStyle={{
            padding: '0px',
          }}
          avatar={avatarProperties}
          title={
            <HeaderTitle
              title={this.getPresetPageName()}
              titlePrefix={this.establishPageHeaderTitlePrefix()}
            />
          }
          subTitle={this.buildPageHeaderSubTitle()}
          tags={
            <HeaderTagWrapper
              list={this.establishPageHeaderTagCollectionConfig()}
            />
          }
          extra={this.buildExtraAction()}
          content={this.renderPresetPageHeaderContent()}
          extraContent={
            <HeaderExtraContent
              {...this.establishPageHeaderExtraContentConfig()}
            />
          }
          // onBack={() => {
          //   this.backToList();
          // }}
        >
          {this.renderPresetPageBody()}

          <BackTop />
        </PageContainer>
      </div>
    );
  }
}

export { BaseAddForm };
