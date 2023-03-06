import React from 'react';

import { FormExtra } from '../../FormExtra';
import { iconBuilder } from '../../Icon';

const { InputItem, InputNumberItem, SelectItem } = FormExtra;

export function buildSearchInput({
  label,
  name,
  helper = null,
  icon = iconBuilder.form(),
  innerProps: innerProperties = {},
  canOperate = true,
  formItemLayout = {},
  reminderPrefix = '输入',
  hidden = false,
}) {
  return (
    <InputItem
      label={label}
      name={name}
      helper={helper}
      icon={icon}
      innerProps={innerProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
      reminderPrefix={reminderPrefix}
      hidden={hidden}
    />
  );
}

export function buildSearchInputNumber({
  label,
  name,
  helper = null,
  icon = iconBuilder.form(),
  innerProps: innerProperties = {},
  canOperate = true,
  formItemLayout = {},
}) {
  return (
    <InputNumberItem
      label={label}
      name={name}
      helper={helper}
      icon={icon}
      innerProps={innerProperties}
      canOperate={canOperate}
      formItemLayout={formItemLayout}
    />
  );
}

export function buildSearchFormSelect({
  label,
  name,
  helper = null,
  list = [],
  dataConvert = null,
  renderItem = null,
  onChange: onChangeCallback = null,
  innerProps: innerProperties = null,
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
      onChange={onChangeCallback}
      innerProps={innerProperties}
      hidden={hidden}
    />
  );
}
