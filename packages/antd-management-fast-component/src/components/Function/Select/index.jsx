import { Select } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  showSimpleWarnMessage,
  toBoolean,
} from 'easy-soft-utility';

import { FlexText } from '../../FlexText';

const { Option } = Select;

export function buildOptionItem(item, index) {
  const { label, value, alias, description, disabled } = {
    label: '',
    value: '',
    description: '',
    alias: '',
    disabled: false,
    ...item,
  };

  if (checkStringIsNullOrWhiteSpace(toString(label))) {
    const text = 'label is empty, ';

    showSimpleWarnMessage(text);
  }

  const text = alias || label;

  const descriptionAdjust = text === description ? '' : description;

  return (
    <Option
      key={`option_${index}`}
      value={value}
      disabled={toBoolean(disabled)}
    >
      <FlexText text={text} subText={descriptionAdjust} />
    </Option>
  );
}
