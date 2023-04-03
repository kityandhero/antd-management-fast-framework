import { DatePicker } from 'antd';
import React, { PureComponent } from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { Item } from '../Item';

class DatePickerItem extends PureComponent {
  render() {
    const {
      label,
      name,
      required = false,
      helper = null,
      datePickerProps: datePickerProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherDatePickerProperties = {
      style: { width: '100%' },
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      inputReadOnly: true,
      placeholder: buildFieldDescription(title, '选择'),
      ...datePickerProperties,
    };

    const resultCheck = checkFromConfig({
      label: title,
      name,
      helper,
    });

    if (!canOperate) {
      return (
        <Item
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            checkStringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          hidden={hidden}
        >
          <DatePicker {...otherDatePickerProperties} />
        </Item>
      );
    }

    return (
      <Item
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
        hidden={hidden}
      >
        <DatePicker {...otherDatePickerProperties} />
      </Item>
    );
  }
}

DatePickerItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  datePickerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { DatePickerItem };
