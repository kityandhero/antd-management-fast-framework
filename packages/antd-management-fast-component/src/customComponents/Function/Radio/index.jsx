import { Radio } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  showSimpleWarnMessage,
  toBoolean,
} from 'easy-soft-utility';

export function buildRadioItem(item, index) {
  const { label, value, alias, description, disabled, button } = {
    label: '',
    value: '',
    description: '',
    alias: '',
    disabled: false,
    button: false,
    ...item,
  };

  if (checkStringIsNullOrWhiteSpace(toString(label))) {
    const text = 'label is empty, ';

    showSimpleWarnMessage(text);
  }

  if (button) {
    return (
      <Radio.Button
        key={`radio_${index}`}
        title={`${alias || label}${
          checkStringIsNullOrWhiteSpace(description || '')
            ? ''
            : `[${description}]`
        }`}
        value={value}
        disabled={toBoolean(disabled)}
      >
        {alias || label}
      </Radio.Button>
    );
  }

  return (
    <Radio
      key={`radio_${index}`}
      title={`${alias || label}${
        checkStringIsNullOrWhiteSpace(description || '')
          ? ''
          : `[${description}]`
      }`}
      value={value}
      disabled={toBoolean(disabled)}
    >
      {alias || label}
    </Radio>
  );
}
