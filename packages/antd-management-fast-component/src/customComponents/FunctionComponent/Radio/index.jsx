import { Radio } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  showSimpleWarnMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

export function buildRadioItem(item, index) {
  const { label, value, alias, description, availability, button } = {
    label: '',
    value: '',
    description: '',
    alias: '',
    availability: whetherNumber.yes,
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
        disabled={toNumber(availability) !== whetherNumber.yes}
      >
        {label}
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
      disabled={toNumber(availability) !== whetherNumber.yes}
    >
      {label}
    </Radio>
  );
}
