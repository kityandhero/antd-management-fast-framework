import { Card, Divider, Rate, Slider } from 'antd';
import React, { Component } from 'react';
import {
  ArrayCards,
  ArrayTable,
  Cascader,
  Checkbox,
  DatePicker,
  Editable,
  Form,
  FormButtonGroup,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField, Field } from '@formily/react';

import {
  buildPromptModuleInfo,
  checkInCollection,
  isArray,
  isEmptyArray,
  isFunction,
  isNull,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  toMd5,
  toString,
} from 'easy-soft-utility';

import { emptyLogic } from 'antd-management-fast-common';
import {
  CenterBox,
  HelpBox,
  iconBuilder,
} from 'antd-management-fast-component';

import { modulePackageName } from '../../../utils/definition';

const Text = ({ value, mode, content, ...properties }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, properties, value || content);
};

const SchemaField = createSchemaField({
  components: {
    ArrayCards,
    ArrayTable,
    Card,
    Cascader,
    Checkbox,
    DatePicker,
    Editable,
    FormCollapse,
    FormGrid,
    FormItem,
    FormLayout,
    FormTab,
    Input,
    NumberPicker,
    Password,
    PreviewText,
    Radio,
    Rate,
    Reset,
    Select,
    Slider,
    Space,
    Submit,
    Switch,
    Text,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
  },
});

/**
 * Module Name.
 * @private
 */
const moduleName = 'SchemaDisplayer';

function buildPromptModuleInfoText(text, ...messages) {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, mergeArrowText(...messages)),
    moduleName,
  );
}

function buildTag(o) {
  return toMd5(JSON.stringify(o || {}));
}

const remarkName = '2ff73e227d264c06b951c037ce0f51ef';

const descriptionTypeCollection = ['field', 'box'];

class SchemaDisplayer extends Component {
  fromTarget = null;

  submitDataTemporary = {};

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      documentTempUrl: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  shouldComponentUpdate(nextProperties, nextState) {
    const { schema } = this.props;

    const { schema: schemaNext } = nextProperties;

    if (buildTag({ schema }) != buildTag({ schema: schemaNext })) {
      this.fromTarget = null;
    }

    return true;
  }

  getDescriptionType = (type) => {
    const v = checkInCollection(descriptionTypeCollection, type);

    return v ? type : 'field';
  };

  submitForm = (o) => {
    const { onSubmit } = this.props;

    if (!isFunction(onSubmit)) {
      logTrace(
        {
          submitData: o,
        },
        buildPromptModuleInfoText(
          'submitForm',
          'trigger',
          'onSubmit',
          emptyLogic,
        ),
      );

      return;
    }

    logTrace(o, buildPromptModuleInfoText('submitForm', 'trigger', 'onSubmit'));

    onSubmit(o);

    this.submitDataTemporary = o;
  };

  onSubmitSuccess = () => {
    const { afterSubmitSuccess } = this.props;

    const submitData = this.submitDataTemporary || null;

    if (!isFunction(afterSubmitSuccess)) {
      logTrace(
        submitData,
        buildPromptModuleInfoText(
          'onSubmitSuccess',
          'trigger',
          'afterSubmitSuccess',
          emptyLogic,
        ),
      );

      return;
    }

    logTrace(
      submitData,
      buildPromptModuleInfoText(
        'onSubmitSuccess',
        'trigger',
        'afterSubmitSuccess',
      ),
    );

    afterSubmitSuccess(submitData);
  };

  onSubmitFailed = (o) => {
    const { afterSubmitFailed } = this.props;

    if (!isFunction(afterSubmitFailed)) {
      logTrace(
        o,
        buildPromptModuleInfoText(
          'onSubmitFailed',
          'trigger',
          'afterSubmitFailed',
          emptyLogic,
        ),
      );

      return;
    }

    logTrace(
      o,
      buildPromptModuleInfoText(
        'onSubmitFailed',
        'trigger',
        'afterSubmitFailed',
      ),
    );

    afterSubmitFailed(o);
  };

  renderDescription = () => {
    const { descriptions } = this.props;

    if (!isArray(descriptions) || isEmptyArray(descriptions)) {
      return null;
    }

    return (
      <Space direction="vertical">
        {descriptions.map((o, index) => {
          const { text } = o;
          const key = `index_${index}`;

          return <div key={key}>{text}</div>;
        })}
      </Space>
    );
  };

  render() {
    const {
      form: formProperties,
      schema,
      showSubmit,
      submitButtonIcon,
      submitButtonText,
      buttonBeforeSubmitBuilder,
      buttonAfterSubmitBuilder,
      showSubmitDivider,
      initialValues,
      helpBoxProps,
      descriptionUpperType,
      descriptionUpperLabel,
      descriptionUpperComponent,
      descriptionUpperComponentBuilder,
      descriptionNetherType,
      descriptionNetherLabel,
      descriptionNetherComponent,
      descriptionNetherComponentBuilder,
      descriptions,
      descriptionType,
      descriptionTitleText,
      descriptionTitleColor,
      descriptionLabelColor,
      descriptionTextColor,
      header,
      showFooterDivider,
      footer,
      children,
    } = this.props;

    const formPropertiesAdjust = {
      labelCol: 6,
      wrapperCol: 12,
      ...formProperties,
    };

    const helpBoxPropertiesAdjust = {
      labelColor: descriptionLabelColor,
      textColor: descriptionTextColor,
      ...helpBoxProps,
    };

    // const formInstance = createForm({ initialValues });

    if (isNull(this.fromTarget)) {
      this.fromTarget = createForm({ initialValues });
    } else {
      this.fromTarget.setInitialValues(initialValues);
    }

    const buttonBefore = isFunction(buttonBeforeSubmitBuilder)
      ? buttonBeforeSubmitBuilder({
          form: this.fromTarget,
          getFormValue: () =>
            JSON.parse(JSON.stringify(this.fromTarget.values)),
        })
      : null;

    const buttonAfter = isFunction(buttonAfterSubmitBuilder)
      ? buttonAfterSubmitBuilder({
          form: this.fromTarget,
          getFormValue: () =>
            JSON.parse(JSON.stringify(this.fromTarget.values)),
        })
      : null;

    const buttonGroup =
      showSubmit || buttonBefore || buttonAfter ? (
        <FormButtonGroup.FormItem>
          <CenterBox>
            <Space>
              {buttonBefore}

              {showSubmit ? (
                <Submit
                  form={this.fromTarget}
                  icon={submitButtonIcon}
                  onSubmit={this.submitForm}
                  onSubmitSuccess={this.onSubmitSuccess}
                  onSubmitFailed={this.onSubmitFailed}
                >
                  {submitButtonText}
                </Submit>
              ) : null}

              {buttonAfter}
            </Space>
          </CenterBox>
        </FormButtonGroup.FormItem>
      ) : null;

    const descriptionComponent =
      isArray(descriptions) && !isEmptyArray(descriptions) ? (
        descriptionType === 'field' ? (
          <Field
            name={remarkName}
            title={
              <span style={{ color: descriptionTitleColor || '#999999' }}>
                {descriptionTitleText}
              </span>
            }
            decorator={[FormItem]}
            component={[
              () => {
                return (
                  <HelpBox
                    style={{
                      paddingTop: '4px',
                    }}
                    {...helpBoxPropertiesAdjust}
                    showTitle={false}
                    list={descriptions.map((o) => {
                      return {
                        text: toString(o),
                      };
                    })}
                  />
                );
              },
            ]}
          />
        ) : (
          <FormItem label={<div></div>} colon={false}>
            <Divider orientation="left" plain>
              {descriptionTitleText}
            </Divider>

            <HelpBox
              style={{
                paddingTop: '4px',
              }}
              {...helpBoxProps}
              showTitle={false}
              list={descriptions}
            />
          </FormItem>
        )
      ) : null;

    const descriptionUpperComponentResult = isFunction(
      descriptionUpperComponentBuilder,
    )
      ? descriptionUpperComponentBuilder({
          form: this.fromTarget,
          getFormValue: () =>
            JSON.parse(JSON.stringify(this.fromTarget.values)),
        })
      : descriptionUpperComponent;

    const descriptionUpperComponentAdjust =
      !isFunction(descriptionUpperComponentBuilder) &&
      (descriptionUpperComponent || null) ==
        null ? null : descriptionUpperType === 'field' ? (
        <Field
          name="descriptionUpper"
          title={
            <span style={{ color: '#000000e0' }}>{descriptionUpperLabel}</span>
          }
          decorator={[FormItem]}
        >
          {descriptionUpperComponentResult}
        </Field>
      ) : (
        <FormItem label={<div></div>} colon={false}>
          <Divider orientation="left" plain>
            {descriptionUpperLabel}
          </Divider>

          {descriptionUpperComponentResult}
        </FormItem>
      );

    const descriptionNetherComponentResult = isFunction(
      descriptionNetherComponentBuilder,
    )
      ? descriptionNetherComponentBuilder({
          form: this.fromTarget,
          getFormValue: () =>
            JSON.parse(JSON.stringify(this.fromTarget.values)),
        })
      : descriptionNetherComponent;

    const descriptionNetherComponentAdjust =
      !isFunction(descriptionNetherComponentBuilder) &&
      (descriptionNetherComponent || null) ==
        null ? null : descriptionNetherType === 'field' ? (
        <Field
          name="descriptionNether"
          title={
            <span style={{ color: '#000000e0' }}>{descriptionNetherLabel}</span>
          }
          decorator={[FormItem]}
        >
          {descriptionNetherComponentResult}
        </Field>
      ) : (
        <FormItem label={<div></div>} colon={false}>
          <Divider orientation="left" plain>
            {descriptionNetherLabel}
          </Divider>

          {descriptionNetherComponentResult}
        </FormItem>
      );

    return (
      <div>
        <Form {...formPropertiesAdjust} form={this.fromTarget}>
          {header ? (
            <FormItem label={<div></div>} colon={false}>
              {header}
            </FormItem>
          ) : null}

          <SchemaField schema={{ ...schema }} />

          {children}

          {descriptionUpperComponentAdjust}

          {descriptionComponent}

          {descriptionNetherComponentAdjust}

          {showSubmitDivider ? <Divider /> : null}

          {buttonGroup}

          {showFooterDivider && footer ? <Divider /> : null}

          {footer ? (
            <FormItem label={<div></div>} colon={false}>
              {footer}
            </FormItem>
          ) : null}
        </Form>
      </div>
    );
  }
}

SchemaDisplayer.defaultProps = {
  initialValues: {},
  form: {},
  schema: {},
  // eslint-disable-next-line no-unused-vars
  showSubmit: false,
  showSubmitDivider: false,
  submitButtonIcon: iconBuilder.save(),
  submitButtonText: 'submit',
  buttonBeforeSubmitBuilder: () => null,
  buttonAfterSubmitBuilder: () => null,
  helpBoxProps: {},
  descriptionType: 'field',
  descriptionTitleText: '备注',
  descriptionTitleColor: '#999',
  descriptionLabelColor: '#999',
  descriptionTextColor: '#999',
  descriptions: [],
  descriptionUpperType: 'field',
  descriptionUpperLabel: '',
  descriptionUpperComponent: null,
  descriptionUpperComponentBuilder: null,
  descriptionNetherType: 'field',
  descriptionNetherLabel: '',
  descriptionNetherComponent: null,
  descriptionNetherComponentBuilder: null,
  onSubmit: () => {},
  // eslint-disable-next-line no-unused-vars
  afterSubmitSuccess: (payload) => {},
  // eslint-disable-next-line no-unused-vars
  afterSubmitFailed: (feedbacks) => {},
  header: null,
  footer: null,
  showFooterDivider: false,
};

export { SchemaDisplayer };
