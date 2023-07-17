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
      innerProps: innerProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherInnerProperties = {
      style: { width: '100%' },
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
      inputReadOnly: true,
      placeholder: buildFieldDescription(title, '选择'),
      ...innerProperties,
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
          <DatePicker {...otherInnerProperties} />
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
        <DatePicker {...otherInnerProperties} />
      </Item>
    );
  }
}

DatePickerItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  innerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { DatePickerItem };
