import { Card, Divider, Rate, Slider } from 'antd';
import React, { PureComponent } from 'react';
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
  checkInCollection,
  isArray,
  isEmptyArray,
  isFunction,
  toString,
} from 'easy-soft-utility';

import {
  CenterBox,
  HelpBox,
  iconBuilder,
} from 'antd-management-fast-component';

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
    // FormButtonGroup,
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

const remarkName = '2ff73e227d264c06b951c037ce0f51ef';

const descriptionTypeCollection = ['field', 'box'];

class SchemaDisplayer extends PureComponent {
  getDescriptionType = (type) => {
    const v = checkInCollection(descriptionTypeCollection, type);

    return v ? type : 'field';
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
      descriptionNetherType,
      descriptionNetherLabel,
      descriptionNetherComponent,
      descriptions,
      descriptionType,
      descriptionTitleText,
      descriptionTitleColor,
      descriptionLabelColor,
      descriptionTextColor,
      header,
      showFooterDivider,
      footer,
      onSubmit,
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

    const formInstance = createForm({ initialValues });

    const buttonBefore = isFunction(buttonBeforeSubmitBuilder)
      ? buttonBeforeSubmitBuilder()
      : null;

    const buttonAfter = isFunction(buttonAfterSubmitBuilder)
      ? buttonAfterSubmitBuilder()
      : null;

    const buttonGroup =
      showSubmit || buttonBefore || buttonAfter ? (
        <FormButtonGroup.FormItem>
          <CenterBox>
            <Space>
              {buttonBefore}

              {showSubmit ? (
                <Submit
                  form={formInstance}
                  icon={submitButtonIcon}
                  onSubmit={(o) => {
                    if (isFunction(onSubmit)) {
                      onSubmit(o);
                    }
                  }}
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

    const descriptionUpperComponentAdjust =
      descriptionUpperComponent == null ? null : descriptionUpperType ===
        'field' ? (
        <Field
          name="descriptionUpper"
          title={
            <span style={{ color: '#000000e0' }}>{descriptionUpperLabel}</span>
          }
          decorator={[FormItem]}
          component={[
            () => {
              return descriptionUpperComponent;
            },
          ]}
        />
      ) : (
        <FormItem label={<div></div>} colon={false}>
          <Divider orientation="left" plain>
            {descriptionUpperLabel}
          </Divider>

          {descriptionUpperComponent}
        </FormItem>
      );

    const descriptionNetherComponentAdjust =
      descriptionNetherComponent == null ? null : descriptionNetherType ===
        'field' ? (
        <Field
          name="descriptionNether"
          title={
            <span style={{ color: '#000000e0' }}>{descriptionNetherLabel}</span>
          }
          decorator={[FormItem]}
          component={[
            () => {
              return descriptionNetherComponent;
            },
          ]}
        />
      ) : (
        <FormItem label={<div></div>} colon={false}>
          <Divider orientation="left" plain>
            {descriptionNetherLabel}
          </Divider>

          {descriptionNetherComponent}
        </FormItem>
      );

    return (
      <div>
        <Form {...formPropertiesAdjust} form={formInstance}>
          {header ? (
            <FormItem label={<div></div>} colon={false}>
              {header}
            </FormItem>
          ) : null}

          <SchemaField schema={schema} />

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
  descriptionNetherType: 'field',
  descriptionNetherLabel: '',
  descriptionNetherComponent: null,
  onSubmit: () => {},
  header: null,
  footer: null,
  showFooterDivider: false,
};

export { SchemaDisplayer };
