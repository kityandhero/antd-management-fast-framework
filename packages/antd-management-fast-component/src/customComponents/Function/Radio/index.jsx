import { Radio } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  showSimpleWarnMessage,
  toBoolean,
} from 'easy-soft-utility';

import { FlexText } from '../../FlexText';

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
        value={value}
        disabled={toBoolean(disabled)}
      >
        <FlexText text={alias || label} subText={description} />
      </Radio.Button>
    );
  }

  return (
    <Radio key={`radio_${index}`} value={value} disabled={toBoolean(disabled)}>
      <FlexText text={alias || label} subText={description} />
    </Radio>
  );
}
