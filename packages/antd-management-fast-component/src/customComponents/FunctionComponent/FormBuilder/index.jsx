import { Form, Input } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  isObject,
  logObject,
  showSimpleRuntimeError,
} from 'easy-soft-utility';

import { ElasticityButton } from '../../ElasticityButton';
import { FormExtra } from '../../FormExtra';
import { HiddenWrapper } from '../../HiddenWrapper';
import { iconBuilder } from '../../Icon';

import styles from './index.less';

const { Item: FormItem } = Form;

const { TextArea, Password } = Input;

const {
  DatePickerItem,
  ComponentItem,
  InputItem,
  InputNumberItem,
  OnlyShowInputItem,
  SyntaxHighlighterItem,
  SelectItem,
  TextAreaItem,
  TimePickerItem,
  SwitchItem,
  RadioItem,
} = FormExtra;

export function buildFormOnlyShowInput({
  label,
  value,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = { disabled: true },
  formItemLayout = {},
}) {
  return (
    <OnlyShowInputItem
      label={label}
      value={value}
      helper={helper}
      icon={icon}
      inputProps={inputProperties}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormInputNumber({
  label,
  name,
  required = false,
  helper = null,
  icon = iconBuilder.form(),
  inputNumberProps: inputNumberProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <InputNumberItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      inputNumberProps={inputNumberProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}
export function buildFormTextArea({
  label,
  name,
  required = false,
  helper = null,
  textAreaProps: textAreaProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <TextAreaItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      textAreaProps={textAreaProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormDatePicker({
  label,
  name,
  required = false,
  helper = null,
  datePickerProps: datePickerProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <DatePickerItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      datePickerProps={datePickerProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormTimePicker({
  label,
  name,
  required = false,
  helper = null,
  timePickerProps: timePickerProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <TimePickerItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      datePickerProps={timePickerProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormText({
  label,
  value,
  helper = null,
  formItemLayout = {},
}) {
  const title = label;

  const resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      {value}
    </FormItem>
  );
}

export function buildFormOnlyShowTextarea({
  label,
  value,
  helper = null,
  textAreaProps: textAreaProperties = { disabled: true },
  formItemLayout = {},
}) {
  const title = label;

  const otherTextAreaProperties = {
    placeholder: '暂无数据',
    value: checkStringIsNullOrWhiteSpace(value || '') ? '' : value,
    ...textAreaProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      <TextArea {...otherTextAreaProperties} />
    </FormItem>
  );
}

export function buildFormInnerComponent({
  label,
  innerComponent,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
}) {
  return (
    <ComponentItem
      label={label}
      innerComponent={innerComponent}
      helper={helper}
      formItemLayout={formItemLayout}
      requiredForShow={requiredForShow}
    />
  );
}

export function buildFormActionItem({ component, formItemLayout = {} }) {
  if ((component || null) == null) {
    return null;
  }

  return (
    <FormItem {...{ ...formItemLayout, colon: false }} label={<div />}>
      {component}
    </FormItem>
  );
}

export function buildFormButton({ config, formItemLayout = {} }) {
  return (
    <FormItem {...{ ...formItemLayout, colon: false }} label={<div />}>
      <ElasticityButton {...config} />
    </FormItem>
  );
}

export function buildFormOnlyShowSyntaxHighlighter({
  language,
  label,
  value,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
  otherProps: otherProperties = {},
}) {
  return (
    <SyntaxHighlighterItem
      language={language}
      label={label}
      value={value}
      helper={helper}
      formItemLayout={formItemLayout}
      requiredForShow={requiredForShow}
      otherProps={otherProperties}
    />
  );
}

export function buildFormSwitch({
  label,
  name,
  required = false,
  helper = null,
  otherProps: otherProperties = {},
  canOperate = true,
  formItemLayout = {},
  hidden = false,
}) {
  return (
    <SwitchItem
      label={label}
      name={name}
      helper={helper}
      required={required}
      otherProps={otherProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      hidden={hidden}
    />
  );
}

export function buildFormPassword({
  label,
  name,
  required = false,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  const title = label;

  const otherInputProperties = {
    addonBefore: icon,
    placeholder: buildFieldDescription(title, '输入'),
    ...inputProperties,
  };

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  if (!canOperate) {
    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Password {...otherInputProperties} />
      </FormItem>
    );
  }

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      <Password {...otherInputProperties} />
    </FormItem>
  );
}

export function buildFormOnlyShowText({
  label,
  value,
  helper = null,
  formItemLayout = {},
  requiredForShow = false,
}) {
  const title = label;

  const resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper,
  });

  return (
    <FormItem
      {...formItemLayout}
      label={resultCheck.label}
      className={requiredForShow ? styles.formItemOnlyShowText : null}
      // style={{ marginBottom: 0 }}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
      rules={[
        {
          required: false,
          message: buildFieldDescription(resultCheck.label),
        },
      ]}
    >
      {value}
    </FormItem>
  );
}

export function buildFormDisplay({
  label,
  content,
  formItemLayout = {},
  useDisplayBoxStyle = true,
}) {
  const title = label;

  let labelText = 'object';

  if (isObject(title)) {
    const text = 'label必须为文本';

    showSimpleRuntimeError(text);

    logObject(label);
  } else {
    labelText = title;
  }

  return (
    <FormItem {...formItemLayout} label={labelText}>
      <div style={useDisplayBoxStyle ? { padding: '4px 0 4px 0' } : {}}>
        {content}
      </div>
    </FormItem>
  );
}

export function buildFormHiddenWrapper({ children, hidden = true }) {
  return <HiddenWrapper hidden={hidden}>{children}</HiddenWrapper>;
}

export function buildFormInput({
  label,
  name,
  required = false,
  helper = null,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  return (
    <InputItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      inputProps={inputProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      reminderPrefix={reminderPrefix}
      hidden={hidden}
    />
  );
}

export function buildFormInputFieldData({
  fieldData,
  required = false,
  icon = iconBuilder.form(),
  inputProps: inputProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  const { label, name, helper } = {
    label: null,
    name: null,
    helper: null,
    ...fieldData,
  };

  return (
    <InputItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      inputProps={inputProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      reminderPrefix={reminderPrefix}
      hidden={hidden}
    />
  );
}

export function buildFormUpdateTimeField({
  name = 'updateTime',
  helper = '数据的最后修改时间',
  label = '最后修改时间',
  formItemLayout = null,
}) {
  const title = label || '最后修改时间';

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return (
    <FormItem
      {...(formItemLayout || {})}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        addonBefore={iconBuilder.form()}
        disabled
        placeholder={buildFieldDescription(resultCheck.label)}
      />
    </FormItem>
  );
}

export function buildFormCreateTimeField({
  name = 'createTime',
  helper = '数据的添加时间',
  label = '添加时间',
  formItemLayout = null,
}) {
  const title = label || '添加时间';

  const resultCheck = checkFromConfig({
    label: title,
    name,
    helper,
  });

  return (
    <FormItem
      {...(formItemLayout || {})}
      label={resultCheck.label}
      name={resultCheck.name}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        addonBefore={iconBuilder.form()}
        disabled
        placeholder={buildFieldDescription(resultCheck.label)}
      />
    </FormItem>
  );
}

export function buildFormNowTimeField({
  label = '添加时间',
  helper = '数据的添加时间',
  formItemLayout = null,
}) {
  const {
    label: labelChanged,
    helper: helperChanged,
    formItemLayout: formItemLayoutChanged,
  } = {
    helper: helper || '数据的添加时间',
    label: label || '添加时间',
    formItemLayout: formItemLayout || null,
  };

  const resultCheck = checkFromConfig({
    label: labelChanged || '添加时间',
    name: '',
    helper: helperChanged,
  });

  return (
    <FormItem
      {...(formItemLayoutChanged || {})}
      label={resultCheck.label}
      extra={
        checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
          ? null
          : buildFieldHelper(resultCheck.helper)
      }
    >
      <Input
        value={formatDatetime({
          data: new Date(),
          format: datetimeFormat.yearMonthDayHourMinute,
        })}
        addonBefore={iconBuilder.form()}
        disabled
        placeholder={buildFieldDescription(resultCheck.label)}
      />
    </FormItem>
  );
}

export function buildFormSelect({
  label,
  name,
  helper = null,
  list = [],
  dataConvert = null,
  renderItem = null,
  onChangeCallback = null,
  formItemLayout = null,
  required = false,
  otherProps: otherProperties = null,
  hidden = false,
}) {
  return (
    <SelectItem
      label={label}
      name={name}
      list={list}
      dataConvert={dataConvert}
      renderItem={renderItem}
      helper={helper}
      onChangeCallback={onChangeCallback}
      formItemLayout={formItemLayout}
      required={required}
      otherProps={otherProperties}
      hidden={hidden}
    />
  );
}

export function buildFormRadio({
  label,
  name,
  helper = null,
  list = [],
  dataConvert = null,
  renderItem = null,
  onChangeCallback = null,
  formItemLayout = null,
  required = false,
  otherProps: otherProperties = null,
  hidden = false,
}) {
  return (
    <RadioItem
      label={label}
      name={name}
      list={list}
      dataConvert={dataConvert}
      renderItem={renderItem}
      helper={helper}
      onChangeCallback={onChangeCallback}
      formItemLayout={formItemLayout}
      required={required}
      otherProps={otherProperties}
      hidden={hidden}
    />
  );
}
