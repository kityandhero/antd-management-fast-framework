import { Input } from 'antd';
import React from 'react';

import {
  buildFieldDescription,
  buildFieldHelper,
  checkFromConfig,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { iconBuilder } from '../../Icon';
import { Item } from '../Item';

class InputItem extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['icon'];

  renderFurther() {
    const {
      label,
      name,
      required,
      helper,
      icon,
      inputProps: inputProperties,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden = false,
    } = this.props;

    const title = label;

    const otherInputProperties = {
      addonBefore: icon,
      placeholder: canOperate
        ? buildFieldDescription(title, reminderPrefix)
        : '暂无数据',
      disabled: !canOperate,
      ...inputProperties,
    };

    const resultCheck = checkFromConfig({
      label: title,
      name,
      helper,
    });

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
        <Input {...otherInputProperties} />
      </Item>
    );
  }
}

InputItem.defaultProps = {
  label: '',
  name: '',
  required: false,
  helper: null,
  icon: iconBuilder.form(),
  inputProps: {},
  canOperate: true,
  formItemLayout: {},
  reminderPrefix: '输入',
  hidden: false,
};

export { InputItem };
