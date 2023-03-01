import { Select } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  showSimpleWarnMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

const { Option } = Select;

export function buildOptionItem(item, index) {
  const { label, value, alias, description, availability } = {
    label: '',
    value: '',
    description: '',
    alias: '',
    availability: whetherNumber.yes,
    ...item,
  };

  if (checkStringIsNullOrWhiteSpace(toString(label))) {
    const text = 'label is empty, ';

    showSimpleWarnMessage(text);
  }

  return (
    <Option
      key={`option_${index}`}
      title={`${alias || label}${
        checkStringIsNullOrWhiteSpace(description || '')
          ? ''
          : `[${description}]`
      }`}
      value={value}
      disabled={toNumber(availability) !== whetherNumber.yes}
    >
      {label}
    </Option>
  );
}
