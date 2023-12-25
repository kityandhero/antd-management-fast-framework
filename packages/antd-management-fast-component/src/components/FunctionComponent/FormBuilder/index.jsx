import React from 'react';

import { ElasticityButton } from '../../ElasticityButton';
import { FormExtra } from '../../FormExtra';
import { HiddenWrapper } from '../../HiddenWrapper';
import { iconBuilder } from '../../Icon';

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
  TextItem,
  PasswordItem,
  NowTimeItem,
  OnlyShowDatetimeItem,
  ActionItem,
  Item,
} = FormExtra;

export function buildFormOnlyShowInput({
  label,
  value,
  helper = null,
  icon = iconBuilder.form(),
  innerProps: innerProperties = { disabled: true },
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <OnlyShowInputItem
      label={label}
      value={value}
      helper={helper}
      icon={icon}
      innerProps={innerProperties}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
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
  innerProps: innerProperties = {},
  canOperate = true,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <InputNumberItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}
export function buildFormTextArea({
  label,
  name,
  required = false,
  helper = null,
  innerProps: innerProperties = {},
  canOperate = true,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <TextAreaItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormDatePicker({
  label,
  name,
  required = false,
  helper = null,
  innerProps: innerProperties = {},
  canOperate = true,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <DatePickerItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormTimePicker({
  label,
  name,
  required = false,
  helper = null,
  innerProps: innerProperties = {},
  canOperate = true,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <TimePickerItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormText({
  label,
  value,
  helper = null,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <TextItem
      label={label}
      value={value}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormOnlyShowTextarea({
  label,
  value,
  helper = null,
  innerProps: innerProperties = {},
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <TextAreaItem
      label={label}
      value={value}
      helper={helper}
      canOperate={false}
      innerProps={innerProperties}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormInnerComponent({
  label,
  innerComponent,
  helper = null,
  formItemLayout = {},
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  requiredForShow = false,
}) {
  return (
    <ComponentItem
      label={label}
      innerComponent={innerComponent}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
      requiredForShow={requiredForShow}
    />
  );
}

export function buildFormActionItem({
  component,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  if ((component || null) == null) {
    return null;
  }

  return (
    <ActionItem
      action={component}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    >
      {component}
    </ActionItem>
  );
}

export function buildFormButton({
  config,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <Item
      {...{ ...formItemLayout, colon: false }}
      label={<div />}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
    >
      <ElasticityButton {...config} />
    </Item>
  );
}

export function buildFormOnlyShowSyntaxHighlighter({
  language,
  label,
  value,
  helper = null,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
  requiredForShow = false,
  innerProps: innerProperties = {},
}) {
  return (
    <SyntaxHighlighterItem
      language={language}
      label={label}
      value={value}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
      requiredForShow={requiredForShow}
      innerProps={innerProperties}
    />
  );
}

export function buildFormSwitch({
  label,
  name,
  required = false,
  helper = null,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  innerProps: innerProperties = {},
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
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
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
  innerProps: innerProperties = {},
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <PasswordItem
      label={label}
      name={name}
      helper={helper}
      required={required}
      icon={icon}
      innerProps={innerProperties}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
      hidden={hidden}
    />
  );
}

export function buildFormOnlyShowText({
  label,
  value,
  helper = null,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = {},
}) {
  return (
    <TextItem
      label={label}
      value={value}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
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
  innerProps: innerProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  return (
    <InputItem
      label={label}
      name={name}
      required={required}
      helper={helper}
      icon={icon}
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
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
  innerProps: innerProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
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
      innerProps={innerProperties}
      canOperate={canOperate}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
      reminderPrefix={reminderPrefix}
      hidden={hidden}
    />
  );
}

export function buildFormCreateTimeField({
  name = 'createTime',
  helper = '数据的添加时间',
  label = '添加时间',
  formItemLayout = null,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  return (
    <OnlyShowDatetimeItem
      label={label}
      name={name}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormUpdateTimeField({
  name = 'updateTime',
  helper = '数据的最后修改时间',
  label = '最后修改时间',
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = null,
}) {
  return (
    <OnlyShowDatetimeItem
      label={label}
      name={name}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormNowTimeField({
  label = '当前时间',
  helper = '操作的当前时间',
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  formItemLayout = null,
}) {
  return (
    <NowTimeItem
      label={label}
      helper={helper}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildFormSelect({
  label,
  name,
  helper = null,
  list = [],
  dataConvert = null,
  renderItem = null,
  onChange: onChangeCallback = null,
  formItemLayout = null,
  required = false,
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  return (
    <SelectItem
      label={label}
      name={name}
      list={list}
      dataConvert={dataConvert}
      renderItem={renderItem}
      helper={helper}
      onChange={onChangeCallback}
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
      required={required}
      innerProps={innerProperties}
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
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
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
      addonBefore={addonBefore}
      addonBeforeStyle={addonBeforeStyle}
      addonAfter={addonAfter}
      addonAfterStyle={addonAfterStyle}
      formItemLayout={formItemLayout}
      required={required}
      innerProps={innerProperties}
      hidden={hidden}
    />
  );
}
