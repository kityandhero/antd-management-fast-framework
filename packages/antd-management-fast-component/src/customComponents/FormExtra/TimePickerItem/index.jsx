import { TimePicker } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { Item } from '../Item';

class TimePickerItem extends BaseComponent {
  renderFurther() {
    const {
      label,
      name,
      required = false,
      helper = null,
      timePickerProps: timePickerProperties = {},
      canOperate = true,
      formItemLayout = {},
      hidden = false,
    } = this.props;

    const title = label;

    const otherTimePickerProperties = {
      style: { width: '100%' },
      inputReadOnly: true,
      placeholder: buildFieldDescription(title, '选择'),
      ...timePickerProperties,
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
          <TimePicker {...otherTimePickerProperties} />
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
        <TimePicker {...otherTimePickerProperties} />
      </Item>
    );
  }
}

TimePickerItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  timePickerProps: {},
  canOperate: true,
  formItemLayout: {},
  hidden: false,
};

export { TimePickerItem };
